import { useEffect} from 'react'
import { useBoardContext } from "../contexts/BoardContext"
import { useTimerContext } from '../contexts/TimerContext'

interface footer {

}

const Footer: React.FC<footer> = ()=> {

  const {gameStatus, totalBombs} = useBoardContext()

  const {count, startTimer, stopTimer} = useTimerContext()

  useEffect(()=>{
    if(gameStatus === 'Lost' || gameStatus === 'Won'){
      stopTimer()
    }
  },[gameStatus])
  

  return (
    <footer className="flex flex-row w-full px-10 justify-between">
      <button onClick={startTimer}>start</button>
      <p>TIME: {count}</p>
      <p>BOMBS: {totalBombs}</p>
      <p>STATUS: {gameStatus}</p>
    </footer>
  )
}

export default Footer