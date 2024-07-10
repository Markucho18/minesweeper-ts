import {createContext, useContext, useState} from 'react'

interface ModalContext {
  modalIsOpen : boolean
  setModalIsOpen : React.Dispatch<React.SetStateAction<boolean>>
}

interface ModalContextProviderProps {
  children: React.ReactNode
}

const ModalContext = createContext<ModalContext | null>(null)

export const ModalContextProvider = ({children}: ModalContextProviderProps) => {

  const [modalIsOpen, setModalIsOpen] = useState(false)

  return(
    <ModalContext.Provider value={{
      modalIsOpen,
      setModalIsOpen
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => {
  const context = useContext(ModalContext)
  if(!context){
    throw new Error(
      'useBoardContext must be used in BoardContextProvider'
    )
  }
  return context
}