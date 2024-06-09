import Footer from "./components/Footer"
import Board from "./components/Board"
import { useState } from "react"

type gameStatus = 'Playing' | 'Lost' | 'Won'

function App() {

  const [gameStatus, setGameStatus] = useState('Playing')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-slate-300">
      <Board></Board>
      <Footer></Footer>
    </div>
  )
}

export default App
