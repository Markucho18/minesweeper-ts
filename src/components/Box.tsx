import { useEffect, useState } from "react"
import { box } from "./types"
import { useBoardContext } from "../contexts/BoardContext"

const Box: React.FC<box> = (box) => {

  const {board, setBoard} = useBoardContext()

  const getBoxesAround = (rowPos: number, boxPos: number) => {
    let rows = board.filter((_, i) => i >= rowPos - 1 && i <= rowPos + 1)
    let boxes = rows.flatMap(row => row)
    return boxes.filter( box => box.boxIndex >= boxPos - 1 && box.boxIndex <= boxPos + 1)
  }

  const [bombsAround, setBombsAround] = useState<number>(0)

  const getBombsAround = () => {
    let bombs = 0
    let {rowIndex, boxIndex} = box
    let boxesAround = getBoxesAround(box.rowIndex, box.boxIndex)
    boxesAround.forEach(box =>{
      if(box.bomb) bombs++
    })
    let newBoard = [...board]
    newBoard[rowIndex][boxIndex].bombsAround = bombs
    setBoard(newBoard)
    setBombsAround(bombs)
  }

  const [isCovered, setIsCovered] = useState(true)
  
  const clearBoxes = (rowPos: number, boxPos: number) => {
    setIsCovered(!isCovered)
    let newBoard = [...board]
    newBoard[rowPos][boxPos].covered = false
    if(board[rowPos][boxPos].bombsAround == 0){
      let boxesAround = getBoxesAround(rowPos, boxPos)
    }
    setBoard(newBoard)
  }

  const [flag, setFlag] = useState(box.flag)

  useEffect(()=>{
    getBombsAround()
  },[])

  return (
    <td className="size-8">
      {isCovered ? (
        <button
          className="size-full bg-blue-600 border-2 border-black hover:bg-blue-400"
          onClick={() => clearBoxes(box.rowIndex, box.boxIndex)}
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
        <p>{bombsAround}</p>
      )}
    </td>
  )
}

export default Box