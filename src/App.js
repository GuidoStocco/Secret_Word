//CSS
import './App.css';

//Component
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from "./components/GameOver"

//REACT HOOK
import { useCallback, useEffect, useState } from 'react';

//Data
import { wordsList } from './data/words';

const stage = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
]

function App() {

  const [gameStage, setGameStage] = useState(stage[0].name);
  const [words] = useState(wordsList);  

  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const pickWordAndCategory = () => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return {word, category}
  }

  // mudando o stagio do jogo
  const startGame = () => {
    //picke word and category
    const {word, category} = pickWordAndCategory();

    //create an array of letters
    let wordLetters = word.split('');
    wordLetters = wordLetters.map((l) => {
      l.toLowerCase();
    })
    
    //fill stage
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(letters);
    
    setGameStage(stage[1].name);
  }

  // Process the letter input
  const verifyLetter = () => {
    setGameStage(stage[2].name);
  }

  //restart the game
  const retry = () => {
    setGameStage(stage[0].name)
  }

  return (
    <div className='App'>
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && <Game verifyLetter={verifyLetter}/>}
      {gameStage === "end" && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
