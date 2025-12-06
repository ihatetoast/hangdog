import {useState, useEffect} from 'react'

import ScoreBoard from './components/ScoreComponents/ScoreBoard'
import HangdogGame from './components/LettersComponents/HangdogGame';

import {breedData} from './data/breedData'

function App() {
  const [breed, setBreed] = useState(() =>{
     const randoIdx = Math.floor(Math.random() * breedData.length);
    return (breedData[randoIdx]);
  });  
  const [missedLetters, setMissedLetters] = useState([]);
  const gameIsOver = missedLetters.length >=6;

const getBreed = () => {
  const randoIdx = Math.floor(Math.random() * breedData.length);
  return (breedData[randoIdx]);
}

const noNameYet =(missedLetter)=> {
setMissedLetters((prevMissedLetters) => {
        return [missedLetter, ...prevMissedLetters]})
}

// reset to ... reset but also on init load. 
const resetGame = () =>{
setBreed(getBreed())
setMissedLetters([]);
}
// when game is over, switch scoreboard with facts. last.
console.log(missedLetters);
console.log("game is over: ", gameIsOver);
  return (
    <main>
      <section>
        {!gameIsOver &&  <ScoreBoard mistakes={missedLetters}/>}
        {gameIsOver && <p>some message dep on results. you won/lost. restart? button</p>}
    
      </section>
      <section>
        <HangdogGame breedName={breed.name} handleMissedLetters={noNameYet}/>
      </section>
    </main>
  )
}

export default App
