import Box from "./Box"
import { useEffect, useState} from 'react'
import { useBoardContext } from "../contexts/BoardContext"

interface Board {
}

const Board: React.FC<Board> = () => {

  const {board, setBoard, gameStatus} = useBoardContext()

  const [hasUncovered, setHasUncovered] = useState(false)

  useEffect(() => {
    if(gameStatus === 'Playing'){
      setHasUncovered(false)
    }
    if(gameStatus === 'Lost' && hasUncovered === false){
      console.log("El gameStatus es lost xd")
      const newBoard = board.map(row =>
        row.map(box => ({
          ...box,
          covered: false
        }))
      );
      setBoard(newBoard)
      setHasUncovered(true)
    }
  }, [gameStatus])
  

  return (
    <table className="bg-zinc-400 border-4 border-l-[#6e6e6e] border-t-[#6e6e6e] border-b-[#CCC] border-r-[#CCC]">
      <tbody>
        {board.map((row, i)=>(
          <tr key={i}>
            {row.map(({flag, bomb, bombsAround, covered}, j)=>(
              <Box
                key={j}
                covered={covered}
                bombsAround={bombsAround}
                boxIndex={j}
                rowIndex={i}
                flag={flag}
                bomb={bomb}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Board
