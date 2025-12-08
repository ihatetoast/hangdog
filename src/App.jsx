import {useState, useEffect} from 'react'

import ScoreBoard from './components/ScoreComponents/ScoreBoard'
import HangdogGame from './components/LettersComponents/HangdogGame';

import {breedData} from './data/breedData'

function App() {
  const [breed, setBreed] = useState(() =>{
     const randoIdx = Math.floor(Math.random() * breedData.length);
    return (breedData[randoIdx]);
  });  

  const [missedLetters, setMissedLetters] =useState([]);
  const [wordGuessed, setWordGuessed] = useState(false)
  const [gameIsOver, setGameIsOver] = useState(false); // needs to handle also game is one

const getBreed = () => {
  const randoIdx = Math.floor(Math.random() * breedData.length);
  return (breedData[randoIdx]);
}

const handleMissedLetter =(missedLetter)=> {
  setMissedLetters((prevMissedLetters) => {
  return [missedLetter, ...prevMissedLetters]})
}

const handleWordSolved = (wordSolved)=>{
  setWordGuessed(wordSolved)
}

// todo: now fetch the facts. todo!
const handleEndOfGame =()=>{
  if(missedLetters.length === 6 || wordGuessed) {
    setGameIsOver(true)
  }
}
useEffect(() =>{
  handleEndOfGame();
},[missedLetters, wordGuessed])


// reset after loss 
const resetGame = () =>{
  setBreed(getBreed())
  setMissedLetters([]);
  setWordGuessed(false);
  setGameIsOver(false);
}


// remove even
console.log("TESTING: WORD TO GUESS IS ", breed.name);
const losingContent = <p>Oh no. You lost. The word was {breed.name}</p>;
const winningContent = <p>Congrats! You guessed {breed.name} like a champ.</p>;
  return (
    <main>
      <section>
        {!gameIsOver && <ScoreBoard mistakes={missedLetters}/>}
        <div>
          {gameIsOver && !wordGuessed && losingContent}
          {gameIsOver && wordGuessed && winningContent}
          {gameIsOver && <button onClick={resetGame}>Play Again</button>}
        </div>
      </section>
      <section>
        <HangdogGame key={breed.name} breedName={ breed.name.toUpperCase()} getMissedLetter={handleMissedLetter} getWordSolved={handleWordSolved}/>
      </section>
    </main>
  )
}

export default App
