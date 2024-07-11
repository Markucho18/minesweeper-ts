import { useState, createContext, useContext, useEffect } from "react"
import { board, Difficulty, GameStatus } from "../components/types"

interface BoardContext {
  board: board
  setBoard: React.Dispatch<React.SetStateAction<board>>
  gameStatus : GameStatus
  setGameStatus : React.Dispatch<React.SetStateAction<GameStatus>>
  totalFlags : number
  setTotalFlags : React.Dispatch<React.SetStateAction<number>>
  totalBombs : number
  difficulty : Difficulty
  setDifficulty : React.Dispatch<React.SetStateAction<Difficulty>>
}

interface BoardContextProviderProps {
  children: React.ReactNode
}

export const BoardContext = createContext< BoardContext | null >(null)

export function BoardContextProvider ({ children }: BoardContextProviderProps){

  const [gameStatus, setGameStatus] = useState<GameStatus>('notPlaying')

  const [difficulty, setDifficulty] = useState<Difficulty>('easy')

  const difficultyData = {
    "easy":{
      rows: 9,
      bombs: 10
    },
    "medium":{
      rows: 16,
      bombs: 40
    }
  }

  const rows = difficultyData[difficulty].rows
  const bombs = difficultyData[difficulty].bombs
  
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
  
  const [board, setBoard] = useState<board>(createBoard(rows, bombs))
  
  const getFlags = () => {
    const boxes = board.flatMap(row => row)
    const flagBoxes = boxes.filter(box => box.flag)
    return flagBoxes.length
  }

  const [totalFlags, setTotalFlags] = useState(getFlags)

  const [totalBombs, setTotalBombs] = useState(bombs)

  const calculateTotalBombs = () => {
    const substract = bombs - totalFlags
    if(substract < 0) setTotalBombs(0)
    else setTotalBombs(substract)
  }
  
  useEffect(() => {
    calculateTotalBombs()
  }, [totalFlags])
  
  useEffect(()=>{
    const newRows = difficultyData[difficulty].rows
    const newBombs = difficultyData[difficulty].bombs
    const newBoard = createBoard(newRows, newBombs)
    setBoard(newBoard)
    setGameStatus('notPlaying')
  },[difficulty])

  useEffect(()=>{
    console.log(`El gameStatus cambio a ${gameStatus}`)
  },[gameStatus])

  //FUNCION RESTARTGAME:
  // PARAR TEMPORIZADOR Y CAMBIAR BOMBAS, 

  return (
    <BoardContext.Provider value={{
      board,
      setBoard,
      gameStatus,
      setGameStatus,
      totalFlags,
      setTotalFlags,
      totalBombs,
      difficulty,
      setDifficulty
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