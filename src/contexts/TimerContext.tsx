import { useState, useRef, useContext, createContext } from 'react'

interface TimerContext {
  count : number
  startTimer : () => void
  stopTimer : () => void
}

interface TimerContextProviderProps {
  children: React.ReactNode
}

export const TimerContext = createContext< TimerContext | null >(null)

export const TimerContextProvider = ({ children }: TimerContextProviderProps ) => {

  const [count, setCount] = useState(0)
  const intervalRef = useRef(0);

  const startTimer = () => {
    intervalRef.current = window.setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);
  }

  const stopTimer = () => {
    clearInterval(intervalRef.current)
  }

  return (
    <TimerContext.Provider value={{
      count,
      startTimer,
      stopTimer
    }}>
      {children}
    </TimerContext.Provider>
  )
}

export const useTimerContext = () => {
  const context = useContext(TimerContext)
  if(!context){
    throw new Error(
      'useBoardContext must be used in BoardContextProvider'
    )
  }
  return context
}