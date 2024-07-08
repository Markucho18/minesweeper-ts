import Box from "./Box"
import { useBoardContext } from "../contexts/BoardContext"

interface Board {
}

const Board: React.FC<Board> = () => {

  const {board} = useBoardContext()

  return (
    <table className="">
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
