import { useState } from 'react'
import { useModalContext } from "../contexts/ModalContext"
import bomb from "../assets/bomb.png" 
import { useBoardContext } from '../contexts/BoardContext'

interface optionsModal {}

const OptionsModal: React.FC<optionsModal> = () => {

  const { difficulty, setDifficulty } = useBoardContext()

  const { setModalIsOpen } = useModalContext()

  const [selected, setSelected] = useState(difficulty === 'easy' ? "1" : "2")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(selected === "1"){
      setDifficulty('easy')
    }
    else{
      setDifficulty('medium')
    }
    setModalIsOpen(false)
  }

  return(
    <div
      className="flex justify-center items-center bg-black/25 fixed top-0 left-0 size-full"
      onClick={() => setModalIsOpen(false)}
    >
      <div
        className="flex flex-col px-1 pb-2 rounded-md border-blue-800 border-2"
        style={{background: "linear-gradient(to bottom, #4c8bf5, #3a6fd5, #2b53a5, #1d3775)"}}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex text-white px-2 font-bold items-center justify-between">
          <p className="text-white py-2 font-bold text-lg select-none">Options</p>
          <button
            className="size-6 flex justify-center items-center bg-red-500  border-[1px] border-white rounded-md hover:bg-red-600"
            onClick={() => setModalIsOpen(false)}
          >
            X
          </button>
        </header>
       <form onSubmit={handleSubmit}>
        <main className="flex flex-col bg-white rounded-sm">
            <label className="flex gap-8 select-none hover:bg-zinc-200 p-2 cursor-pointer">
              <div className="flex gap-2 items-center">
                <input
                  className="size-4"
                  type="radio"
                  name="difficulty"
                  value={"1"}
                  checked={selected === "1"}
                  onChange={(e) => setSelected(e.target.value)}
                  />
                <p>Easy</p>
              </div>
              <div className="flex justify-end flex-1">
                <p>10</p>
                <img src={bomb} alt="bombs:" className="size-6"/>
                <p>9x9(81)</p>
              </div>
            </label>
            <label className="flex gap-8 select-none hover:bg-zinc-200 p-2 cursor-pointer">
              <div className="flex gap-2 items-center">
                <input
                  className="size-4"
                  type="radio"
                  name="difficulty"
                  value={"2"}
                  checked={selected === "2"}
                  onChange={(e) => setSelected(e.target.value)}
                />
                <p>Medium</p>
              </div>
              <div className="flex justify-end flex-1">
                <p>40</p>
                <img src={bomb} alt="bombs:" className="size-6"/>
                <p>16x16(256)</p>
              </div>
            </label>
          </main>
          <footer className="flex justify-end">
            <button
              className="rounded-md border-2 border-blue-700 text-white mt-2 mr-2 px-4 py-1 bg-blue-600 hover:bg-blue-500"
              type="submit"
            >Save</button>
          </footer>
       </form>
      </div>
    </div>
  )
  
}

export default OptionsModal