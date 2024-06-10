import { useEffect, useState } from "react"
import { box } from "./types"
import { useBoardContext } from "../contexts/BoardContext"

const Box: React.FC<box> = (box) => {

  const {board, setBoard} = useBoardContext()

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

  //SUSPENDIDO POR MOMENTO
  const uncoverBox = (rowPos: number, boxPos: number) => {
    let newBoard = [...board]
    newBoard[rowPos][boxPos].covered = false
    setBoard(newBoard)
    if(board[rowPos][boxPos].bombsAround === 0){
      console.log("Esto esta vacio")
      clearEmptyBoxes(rowPos, boxPos)
    }
  }

  const [flag, setFlag] = useState(box.flag)

  useEffect(()=>{
    getBombsAround()
  },[])

  const bomb = "bg-red-600"

  const noBomb = "bg-blue-600 hover:bg-blue-400"

  const empty = "bg-green-500"

  return (
    <td className="size-8">
      {box.covered ? (
        <button
          className={`size-full border-black border-2  ${box.bomb ? bomb : box.bombsAround === 0 ? empty : noBomb}`}
          //className="size-full border-black bg-blue-600 hover:bg-blue-400"
          onClick={() => uncoverBox(box.rowIndex, box.boxIndex)}
          onContextMenu={(e) => {
            e.preventDefault();
            setFlag(!flag)
          }}
        >
          {flag && "F"}
        </button>
      ) : box.bomb ? (
        <p>B</p>
      ) : (
        <p>{bombsAround === 0 ? "X" : bombsAround}</p>
      )}
    </td>
  )
}

export default Box