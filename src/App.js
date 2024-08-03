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

const guessesNumber = 3;

function App() {

  const [gameStage, setGameStage] = useState(stage[0].name);
  const [words] = useState(wordsList);  

  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const [guessedLetter, setGuessedLetter] = useState([]);
  const [wrongLetter, setWrongLetter] = useState([]);
  const [guesses, setGuesses] = useState(guessesNumber);
  const [score, setScore] = useState(0)

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
    setLetters(wordLetters);
    
    setGameStage(stage[1].name);
  }

  // Process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    //check if the letter has already been utilized
    if(guessedLetter.includes(normalizedLetter) || wrongLetter.includes(normalizedLetter)){
      return
    }

    //push guesses letter or remove a guess
    if(letters.includes(normalizedLetter)){
      setGuessedLetter((actualGuessesLetter) => [
        ...actualGuessesLetter,
        normalizedLetter
      ])
    } else{
      setWrongLetter((actualWrongLetter) => [
        ...actualWrongLetter,
        normalizedLetter
      ])
      
      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const clearLetterStates = () => {
    setGuessedLetter([])
    setWrongLetter([])
  }

  //monitor um dado 
  useEffect (() => {
    if(guesses <= 0){
      clearLetterStates();

      setGameStage([2].name)
    }
  }, [guesses])

  //restart the game
  const retry = () => {
    setScore(0);
    setGuesses(guessesNumber);
    setGameStage(stage[0].name)
  }

  return (
    <div className='App'>
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} setPickedWord={pickedWord} pickedCategory={pickedCategory}
      letters={letters} guessedLetter={guessedLetter} wrongLetter={wrongLetter} guesses={guesses} score={score}/>}
      {gameStage === "end" && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
