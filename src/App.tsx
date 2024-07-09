import Footer from "./components/Footer"
import Board from "./components/Board"
import { useEffect } from "react"
import { useBoardContext } from "./contexts/BoardContext"
import { TimerContextProvider } from "./contexts/TimerContext"

function App() {

  const {board, gameStatus, setGameStatus} = useBoardContext()

  useEffect(()=>{
    const boxes = board.flatMap(row => row)
    const coveredBoxes = boxes.filter(box => box.covered)
    const bombBoxes = coveredBoxes.filter(box => box.bomb)
    if(coveredBoxes.length === bombBoxes.length) setGameStatus('Won')
  },[board])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-slate-300">
      <TimerContextProvider>
        <Board></Board>
        <Footer></Footer>
      </TimerContextProvider>
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
          </main>
        </div>
      )}
    </div>
  )
}

export default App
