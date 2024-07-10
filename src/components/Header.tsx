import { useEffect} from 'react'
import { useBoardContext } from "../contexts/BoardContext"
import { useTimerContext } from '../contexts/TimerContext'

interface header {

}

const Header: React.FC<header> = ()=> {

  const {gameStatus, totalBombs} = useBoardContext()

  const {count, stopTimer} = useTimerContext()

  useEffect(()=>{
    if(gameStatus === 'Lost' || gameStatus === 'Won'){
      stopTimer()
    }
  },[gameStatus])
  

  return (
    <footer className="flex flex-row w-full justify-between px-2 bg-gray-500">
      <p>TIME: {count}</p>
      <p>CARITA</p>
      <p>BOMBS: {totalBombs}</p>
    </footer>
  )
}

export default Header