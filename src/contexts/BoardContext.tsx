import { useState, createContext, useContext } from "react"
import { board } from "../components/types"

interface BoardContext {
  board: board
  setBoard: React.Dispatch<React.SetStateAction<board>>
}

interface BoardContextProviderProps {
  children: React.ReactNode
}

export const BoardContext = createContext< BoardContext | null >(null)

export function BoardContextProvider ({ children }: BoardContextProviderProps){

  const setBombs = (bombs: number, board: board) => {
    for(let i = 0; i < bombs; i++){
      let row = Math.floor(Math.random() * (board.length - 1))
      let box = Math.floor(Math.random() * (board.length - 1))
      board[row][box].bomb = true
    }
  }

  const createBoard = (rows: number, bombs: number) => {
    const board = []
    for(let i = 0; i < rows; i++){
      const row = []
      for(let j = 0; j < rows; j++){
        row.push({
          covered: true,
          bombsAround: 0,
          flag: false,
          bomb: false,
          boxIndex: j,
          rowIndex: i
        })
      }
      board.push(row)
    }
    setBombs(bombs, board)
    return board
  }

  const [board, setBoard] = useState(createBoard(9, 5))
  
  return (
    <BoardContext.Provider value={{
      board,
      setBoard
     }}>
      {children}
    </BoardContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBoardContext (){
  const context = useContext(BoardContext)
  if(!context){
    throw new Error(
      'useBoardContext must be used in BoardContextProvider'
    )
  }
  return context
}