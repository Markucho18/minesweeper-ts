import { useBoardContext } from "../contexts/BoardContext"

interface footer {

}

const Footer: React.FC<footer> = ()=> {

  const {gameStatus, totalBombs} = useBoardContext()

  return (
    <footer className="flex flex-row w-full px-10 justify-between">
      <p>TIME: 0</p>
      <p>BOMBS: {totalBombs}</p>
      <p>STATUS: {gameStatus}</p>
    </footer>
  )
}

export default Footer