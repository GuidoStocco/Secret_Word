import "./GameOver.css"

const GameOver = ({retry}) => {
  return (
    <div>
      <h1>Gamer Over</h1>
      <button onClick={retry}>Recomeçar o Jogo</button>
    </div>
  )
}

export default GameOver