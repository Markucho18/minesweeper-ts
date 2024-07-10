import Header from "./components/Header"
import Board from "./components/Board"
import { useEffect } from "react"
import { useBoardContext } from "./contexts/BoardContext"
import { useTimerContext } from "./contexts/TimerContext"

function App() {

  const {board, gameStatus, setGameStatus} = useBoardContext()

  const { count } = useTimerContext()

  useEffect(()=>{
    const boxes = board.flatMap(row => row)
    const coveredBoxes = boxes.filter(box => box.covered)
    const bombBoxes = coveredBoxes.filter(box => box.bomb)
    if(coveredBoxes.length === bombBoxes.length) setGameStatus('Won')
  },[board])

  return (
    <div className="app flex flex-col items-center justify-center min-h-screen w-screen bg-slate-300">
      <div className="flex flex-col px-2 pb-2 bg-blue-600 rounded-md">
        <div className="flex justify-between items-center">
          <p className="text-white py-2">Minesweeper</p>
          <div className="flex text-white gap-2 font-bold">
            <button className="border-[1px] border-white size-6 text-center">-</button>
            <button className="border-[1px] border-white size-6 text-center">[]</button>
            <button className="border-[1px] border-white size-6 text-center">X</button>
          </div>
        </div>
        <header className="flex bg-white gap-2 px-2">
          <p>Game</p>
          <p>Help</p>
        </header>
        <main className="flex flex-col gap-2 bg-red-500 p-2">
          <Header/>
          <Board/>
        </main>
      </div>
      {gameStatus == "Lost" && (
        <div className="flex flex-col items-center justify-center bg-zinc-600/25 w-full h-full fixed top-0 left-0">
          <main className="bg-white rounded-md p-4">
            <p>YOU LOST! HHAHAHAAHH</p>
          </main>
        </div>
      )}
      {gameStatus == "Won" && (
        <div className="flex flex-col items-center justify-center bg-zinc-600/25 w-full h-full fixed top-0 left-0">
          <main className="bg-white rounded-md p-4">
            <p>YOU WON! YEAAHHH</p>
            <p>IN {count} seconds</p>
          </main>
        </div>
      )}
    </div>
  )
}

export default App
