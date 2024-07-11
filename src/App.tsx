import Header from "./components/Header"
import Board from "./components/Board"
import { useEffect } from "react"
import { useBoardContext } from "./contexts/BoardContext"
import { useTimerContext } from "./contexts/TimerContext"
import { useModalContext } from "./contexts/ModalContext"
import OptionsModal from "./components/OptionsModal"

function App() {

  const {board, gameStatus, setGameStatus} = useBoardContext()

  const { count } = useTimerContext()

  const { modalIsOpen, setModalIsOpen } = useModalContext()

  useEffect(()=>{
    const boxes = board.flatMap(row => row)
    const coveredBoxes = boxes.filter(box => box.covered)
    const bombBoxes = coveredBoxes.filter(box => box.bomb)
    if(coveredBoxes.length === bombBoxes.length) setGameStatus('Won')
  },[board])

  return (
    <div className="app flex flex-col items-center justify-center min-h-screen w-screen bg-slate-300">
      <div
        className="flex flex-col px-1 pb-2 rounded-md border-blue-800 border-2"
        style={{background: "linear-gradient(to bottom, #4c8bf5, #3a6fd5, #2b53a5, #1d3775)"}}
      >
        <div className="flex justify-between items-center px-2 ">
          <p className="text-white py-2 font-bold text-lg select-none">Minesweeper</p>
          <div className="flex text-white gap-2 font-bold">
            <button className="size-6 flex items-end border-[1px] border-white rounded-md hover:bg-blue-400">
              <span className="h-[10%] w-[50%] bg-white rounded-sm ml-[4px] mb-[4px]"></span>
            </button>
            <button className="size-6 flex justify-center items-center border-[1px] border-white rounded-md hover:bg-blue-400">
              <span className="size-4 border-x-[2px] border-b-[2px] border-t-[6px] border-white box-border rounded-sm"></span>
            </button>
            <button className="size-6 flex justify-center items-center bg-red-500  border-[1px] border-white rounded-md hover:bg-red-600">
              X
            </button>
          </div>
        </div>
        <header className="flex bg-white gap-2 px-2">
          <button onClick={() => setModalIsOpen(prev => !prev)}>Game</button>
          <button>Help</button>
        </header>
        <main className="flex flex-col gap-2 bg-zinc-400 p-2">
          <Header/>
          <Board/>
        </main>
      </div>
      {/* {gameStatus == "Lost" && (
        <div className="flex flex-col items-center justify-center bg-zinc-600/25 w-full h-full fixed top-0 left-0">
          <main className="bg-white rounded-md p-4">
            <p>YOU LOST! HHAHAHAAHH</p>
          </main>
        </div>
      )} */}
      {gameStatus == "Won" && (
        <div className="flex flex-col items-center justify-center bg-zinc-600/25 w-full h-full fixed top-0 left-0">
          <main className="bg-white rounded-md p-4">
            <p>YOU WON! YEAAHHH</p>
            <p>IN {count} seconds</p>
          </main>
        </div>
      )}
      {modalIsOpen && (
        <OptionsModal/>
      )}
    </div>
  )
}

export default App
