import Box from "./Box"
import { useBoardContext } from "../contexts/BoardContext"

interface Board {
}

const Board: React.FC<Board> = () => {

  const {board} = useBoardContext()

  /* LOGICA:
  - El mapa es un array(board) con arrays(row) con objetos(box)
  - No tiene sentido mandarle covered porque siempre es x default true y eso lo maneja el propio componente
  - El bombsAround se calcula con 4 parametros: board[row][box]
    - Las cajas con mismo indice pero anterior y posterior fila
    - Las cajas al lado de esa
    - Las cajas de la misma fila pero con posterior y anterior indice
  - Obtiene las propiedades del array del board pero lo pasa a useState y de ahi lo altera mas facil y despues lo devuelve al array
  - Agregarle una flag altera una variable global que es la de bombas(le resta 1)
  - Descubrir una caja dispara dos funciones: calcular bombsAround o perder (altera una variable global del estado del juego)
  */

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
