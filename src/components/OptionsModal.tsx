import { useModalContext } from "../contexts/ModalContext"
import bomb from "../assets/bomb.png" 

interface optionsModal {}

const OptionsModal: React.FC<optionsModal> = () => {

  const { setModalIsOpen } = useModalContext()

  const handleSubmit = () => {

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
        <header className="flex text-white px-2 font-bold items-center">
          <p className="text-white py-2 font-bold text-lg select-none">Options</p>
          {/* <button
            className="size-6 flex justify-center items-center bg-red-500  border-[1px] border-white rounded-md hover:bg-red-600"
            onClick={() => setModalIsOpen(false)}
          >
            X
          </button> */}
        </header>
       <form onSubmit={handleSubmit}>
        <main className="bg-white rounded-sm">
            <div className="flex gap 2">
              <input
                type="radio"
                value={1}
              />
              <p>Easy</p>
              <div className="flex">
                <p>10</p>
                <img src={bomb} alt="bombs:" className="size-6"/>
                <p>9x9(81)</p>
              </div>
            </div>
            <div className="flex gap 2">
              <input
                type="radio"
                value={2}
              />
              <p>Medium</p>
              <div className="flex">
                <p>40</p>
                <img src={bomb} alt="bombs:" className="size-6"/>
                <p>16x16(256)</p>
              </div>
            </div>
          </main>
          <footer>
            <button type="submit">Save</button>
            <button onClick={() => setModalIsOpen(false)}>Cancel</button>
          </footer>
       </form>
      </div>
    </div>
  )
  
}

export default OptionsModal