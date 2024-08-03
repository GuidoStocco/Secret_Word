//CSS
import './App.css';

//Component
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from "./components/GameOver"

//REACT HOOK
import { useCallback, useEffect, useState } from 'react';

//Data
import { wordsList } from './data/word';

const stage = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
]

function App() {

  const [gameStage, setGameStage] = useState(stage[0].name);
  const [words] = useState(wordsList);  

  // mudando o stagio do jogo
  const startGame = () => {
    setGameStage(stage[1].name);
  }

  return (
    <div className='App'>
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && <Game/>}
      {gameStage === "end" && <GameOver/>}
    </div>
  );
}

export default App;
