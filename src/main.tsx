import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BoardContextProvider } from './contexts/BoardContext.tsx'
import { TimerContextProvider } from './contexts/TimerContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TimerContextProvider>
    <BoardContextProvider>
      <App />
    </BoardContextProvider>
    </TimerContextProvider>
  </React.StrictMode>,
)
