import { useEffect} from 'react'
import { useBoardContext } from "../contexts/BoardContext"
import { useTimerContext } from '../contexts/TimerContext'
import happyFace from "../assets/happyFace.png"

interface header {

}

const Header: React.FC<header> = ()=> {

  const {gameStatus, totalBombs} = useBoardContext()

  const {count, stopTimer} = useTimerContext()

  const formatTime = (num : number) => {
    if(num < 10) return `00${num}`
    else if(num < 100) return `0${num}`
  }

  useEffect(()=>{
    if(gameStatus === 'Lost' || gameStatus === 'Won'){
      stopTimer()
    }
  },[gameStatus])

  return (
    <header className="flex flex-row w-full justify-between items-center p-2 bg-zinc-400 border-4 coolBorder">
      <div className='bg-orange-950 h-8 w-16 text-center'>
        <span className='alarmFont text-red-500 font-bold text-3xl'>
          {formatTime(count)}
        </span>
      </div>
      <button className='size-8 border-2 borderCool'>
        <img src={happyFace} alt='face' />
      </button>
      <div className='bg-orange-950 h-8 w-16 text-center'>
        <span className='alarmFont text-red-500 font-bold text-3xl'>
          {formatTime(totalBombs)}
        </span>
      </div>
    </header>
  )
}

export default Header