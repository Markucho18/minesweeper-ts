interface footer {

}

const Footer: React.FC<footer> = ()=> {
  return (
    <footer className="flex flex-row w-full px-10 justify-between">
      <p>Timer</p>
      <p>Bomba</p>
    </footer>
  )
}

export default Footer