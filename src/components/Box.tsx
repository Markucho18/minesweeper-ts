import { useEffect, useState} from "react"
import { box } from "./types"
import { useBoardContext } from "../contexts/BoardContext"
import { useTimerContext } from "../contexts/TimerContext"
import { PiFlagPennantFill } from "react-icons/pi";
import bomb from "../assets/bomb.png" 

const Box: React.FC<box> = (box) => {

  const {board, setBoard, gameStatus, setGameStatus, totalFlags, setTotalFlags} = useBoardContext()

  const {startTimer} = useTimerContext()

  const getBoxesAround = (rowPos: number, boxPos: number, diagonals: boolean) => {
    let rows = board.filter((_, i) => i >= rowPos - 1 && i <= rowPos + 1)
    let boxes = rows.flatMap(row => row)
    if(diagonals){
      return boxes.filter( box => box.boxIndex >= boxPos - 1 && box.boxIndex <= boxPos + 1)
    }
    else{
      return boxes.filter( box =>{
        let sameRow = box.rowIndex == rowPos && box.boxIndex == boxPos - 1 || box.boxIndex == boxPos + 1
        let nearRows = !(box.rowIndex == rowPos) && box.boxIndex == boxPos
        if(sameRow || nearRows) return box
      })
    }
  }

  const [bombsAround, setBombsAround] = useState<number>(0)

  const getBombsAround = () => {
    let bombs = 0
    let {rowIndex, boxIndex} = box
    let boxesAround = getBoxesAround(box.rowIndex, box.boxIndex, true)
    boxesAround.forEach(box =>{
      if(box.bomb) bombs++
    })
    let newBoard = [...board]
    newBoard[rowIndex][boxIndex].bombsAround = bombs
    setBoard(newBoard)
    setBombsAround(bombs)
  }

  const findEmptyBoxes = (rowPos: number, boxPos: number) => {
    let boxesAround = getBoxesAround(rowPos, boxPos, false)
    return boxesAround.filter(box =>{
      let isEmpty = board[box.rowIndex][box.boxIndex].bombsAround === 0
      let isCovered = board[box.rowIndex][box.boxIndex].covered === true
      if(isEmpty && isCovered){
        box.covered = false
        return box
      }
    })
  }

  const clearEmptyBoxes = (rowPos: number, boxPos: number) => {
    let newBoard = [...board]
    let emptyBoxes = findEmptyBoxes(rowPos, boxPos)
    emptyBoxes.forEach(box =>{
      newBoard[box.rowIndex][box.boxIndex].covered = false
    })
    setBoard(newBoard)
  }

  const uncoverBox = (rowPos: number, boxPos: number) => {
    if(gameStatus === 'notPlaying'){
      setGameStatus('Playing')
      startTimer()
    }
    let newBoard = [...board]
    newBoard[rowPos][boxPos].covered = false
    setBoard(newBoard)
    if(board[rowPos][boxPos].bombsAround === 0){
      console.log("Esto esta vacio")
      clearEmptyBoxes(rowPos, boxPos)
    }
  }

  const uncoverAround = (rowPos : number, boxPos: number) => {
    console.log("Se ejecuto uncover around")
    const newBoard = [...board]
    const boxesAround = getBoxesAround(rowPos, boxPos, true)
    const flagsAround = boxesAround.filter(box => box.flag)
    if(box.bombsAround === flagsAround.length){
      boxesAround.forEach(box =>{
        if(box.flag === false){
          newBoard[box.rowIndex][box.boxIndex].covered = false
        }
      })
      setBoard(newBoard)
    }
  }

  const placeFlag = (rowPos: number, boxPos: number) => {
    if(gameStatus === 'notPlaying'){
      setGameStatus('Playing')
      startTimer()
    }
    let newBoard = [...board]
    let hasFlag = newBoard[rowPos][boxPos].flag
    newBoard[rowPos][boxPos].flag = !hasFlag
    setBoard(newBoard)
    let flags = totalFlags
    !hasFlag ? flags++ : flags--
    setTotalFlags(flags)
  }

  useEffect(()=>{
    getBombsAround()
  },[])

  useEffect(()=>{
    if(box.bomb == true && box.covered == false){
      setGameStatus('Lost')
    }
  },[box])

  const numberColors = [
    '#0000FF', // Blue
    '#008000', // Green
    '#FF0000', // Red
    '#000080', // Dark blue
    '#800000', // Dark brown
    '#008080', // Turquoise
    '#000000', // Black
    '#808080'  // Gray
  ];

  const numberColor = numberColors[bombsAround - 1]
  
  return (
    <td
    className="size-8 select-none border-gray-500 border-[2px] p-0 m-0 text-center"
    onDoubleClick={() => uncoverAround(box.rowIndex, box.boxIndex)}
    >
      {box.covered ? (
        <button
          className={`size-full brick flex justify-center items-center`}
          onClick={() =>{
            console.log("Se hizo click 1 vez")
            uncoverBox(box.rowIndex, box.boxIndex)
          }}
          onContextMenu={(e) => {
            e.preventDefault()
            placeFlag(box.rowIndex, box.boxIndex)
          }}
        >
          {box.flag && (
            <PiFlagPennantFill className="text-red-500 size-[80%]"/>
          )}
        </button>
      ) : box.bomb ? (
          <img src={bomb} className="bg-red-500"/>
        ) : (
          <p 
          className="pixel"
          style={{color: numberColor}}
        >
          {bombsAround === 0 ? "" : bombsAround}
        </p>
      )}
    </td>
  )
}

export default Box
          {/* <span className="size-full flex justify-center items-center bg-red-600">
            
          </span> */}