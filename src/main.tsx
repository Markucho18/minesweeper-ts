import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BoardContextProvider } from './contexts/BoardContext.tsx'
import { TimerContextProvider } from './contexts/TimerContext.tsx'
import { ModalContextProvider } from './contexts/ModalContext.tsx' 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ModalContextProvider>
    <TimerContextProvider>
    <BoardContextProvider>
      <App />
    </BoardContextProvider>
    </TimerContextProvider>
    </ModalContextProvider>
  </React.StrictMode>,
)
