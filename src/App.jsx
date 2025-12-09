import {useState, useCallback, useEffect, useRef} from 'react'

import ScoreBoard from './components/ScoreComponents/ScoreBoard'
import HangdogGame from './components/LettersComponents/HangdogGame';

import {breedData} from './data/breedData'

const API_URL = 'https://dogapi.dog/api/v2';
function App() {
  const [breed, setBreed] = useState(() =>{
     const randoIdx = Math.floor(Math.random() * breedData.length);
    return (breedData[randoIdx]);
  });  

  const [missedLetters, setMissedLetters] =useState([]);
  const [wordGuessed, setWordGuessed] = useState(false)
  const [gameIsOver, setGameIsOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [breedAttribute, setBreedAttribute] = useState('');
  const [randomDogFacts, setRandomDogFacts] = useState([]);
  const [error, setError]= useState(null);

  const breedRef = useRef(breed);

const getBreed = () => {
  const randoIdx = Math.floor(Math.random() * breedData.length);
  return (breedData[randoIdx]);
}

const handleMissedLetter =(missedLetter)=> {
  setMissedLetters((prevMissedLetters) => {
  return [missedLetter, ...prevMissedLetters]})
}

const handleWordSolved = useCallback((wordSolved)=>{
  setWordGuessed(wordSolved)
}, [])

const determineEndOfGame =()=>{
  if(missedLetters.length === 6 || wordGuessed) {
    setGameIsOver(true)
  }
}

// handle the breed.id dependency in the use effect
useEffect(() => {
  breedRef.current = breed;
}, [breed]);


// get the breed info from api if there's an id or extraInfo otherwise. 
// get this when the game starts because when the game ends, there's another api call (for facts)
useEffect(() =>{
  setIsLoading(true);
  if(breed.id){
    const fetchDogData = async () => {
      try {
        const response = await fetch(`${API_URL}/breeds/${breed.id}`);
        if(!response.ok){
          throw new Error (`HTTP error! Status: ${response.status}`)
        }
        const result = await response.json();
        setBreedAttribute(result.data.attributes.description)
      }
      catch(err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDogData();
  } else {
    setBreedAttribute(breed.extraInfo);
    setIsLoading(false);
  }
}, [breed])

useEffect(() =>{
  // check for game over
  determineEndOfGame();// 
  
},[missedLetters, wordGuessed])

useEffect(() =>{
  // when game is over, get some trivia
  if (!gameIsOver) return;
  // dog api has more info coming in, so they'll get just 2 facts
  // the dogs with no id have breed info that is very short, so they will get 5.
  setIsLoading(true);
  
  const fetchDogTrivia = async () => {
    try {
      const response = await fetch(`${API_URL}/facts?limit=${breed.id ? 2 : 5}`);
      if(!response.ok){
        throw new Error (`HTTP error! Status: ${response.status}`)
      }
      const result = await response.json();
      setRandomDogFacts(result.data.map(triv => triv.attributes.body));
    }
    catch(err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  fetchDogTrivia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[gameIsOver])

// reset after loss 
const resetGame = () =>{
  setBreed(getBreed())
  setMissedLetters([]);
  setRandomDogFacts([]);
  setBreedAttribute('');
  setWordGuessed(false);
  setGameIsOver(false);
  setError(null);
}

// bone-shaped button (shaped via css)
const boneButton = <button onClick={resetGame} className="bone-btn">
    <div className="bone-nubbin-1"></div>
    <div className="bone-nubbin-2"></div>
    <div className="bone-nubbin-3"></div>
    <div className="bone-nubbin-4"></div>
    <div className="bone-center">
      <div className="bone-text">Play again!</div>
    </div>
</button>;


const losingContent = <p>Oh no, look at you. You've got too much poo on the bottom of your shoe! The word was {breed.name}. {breed.id ? breedAttribute : breed.extraInfo}</p>;
// for winning content, get the info from the api about the breed (has breed.id); otherwise, use the extraInfo (info i found and added to the breedData.js)
const winningContent = <><p>Ear scritches for you! You guessed <span className="breed-name">{breed.name}</span>.</p> <p>{breed.extraInfo || breedAttribute || "Getting breed info ..."}</p></>;


// 2 or 5 facts dep on the origin of the game dog (api or my own)
const endOfGameDogTriviaContent = <div className="gameover-trivia">
  <p>Did you know ...</p>
  <ul>{randomDogFacts.map((rdf, idx) => <li key={`rdf-${idx}`}>{rdf}</li>)}
    </ul></div>


const endOfGameTextContent = <div className="gameover-content">
  {gameIsOver && !wordGuessed && losingContent}
  {gameIsOver && wordGuessed && winningContent}
  {endOfGameDogTriviaContent}
  {boneButton}
  </div>;


  return (
    <main>
      {isLoading && <p>Hold on. Getting the leash ...</p>}
      {error && <p>Oh no. We encountered an error: {error}</p>}
      {!isLoading && <>
      <section>
        {!gameIsOver && <ScoreBoard mistakes={missedLetters}/>}
        {gameIsOver && endOfGameTextContent}
      </section>
      <section>
        {!gameIsOver && <HangdogGame key={breed.name} breedName={ breed.name.toUpperCase()} getMissedLetter={handleMissedLetter} getWordSolved={handleWordSolved}/>}
      </section>
      </>}
      
    </main>
  )
}

export default App
