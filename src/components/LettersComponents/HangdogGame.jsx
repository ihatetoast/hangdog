import {useState} from 'react'

import Key from './Key'

import styles from './HangdogGame.module.css';

const QUERTY_WITH_DIACRITICALS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ['Ä','É', 'Ñ', 'Ö', 'Ü'] ];

const HangdogGame = ({breedName, handleMissedLetters}) => {
  const [playedLetters, setPlayedLetters] = useState([])

  // arr of letters only (to compare clicks against)
  const gameBreedLetters = breedName
  .toUpperCase()
  .replace(/[\s-]/g, "")
  .split("");
  console.log("gameBreedLetters: ", gameBreedLetters);


  function gameSpaces(str) {
    const spaces = str.toUpperCase().split("");
    return spaces.map((space, idx) => {
      if(space === " ") {
        return <span key={`blank-${idx}`} className={styles.blank}>{" "}</span>;
      } else if (space === "-") {
        return <span key={`blank-${idx}`} className={styles.blank}>{"-"}</span>;
      } else {
        return <span key={`letter-${idx}`} className={styles.letter}>{" - "}</span>;
      }
    })
  }


  function handleKeyClick(letter) {
    setPlayedLetters((prevLetters)=>{
      return [letter, ...prevLetters]
    })
    if(!gameBreedLetters.includes(letter)){
    handleMissedLetters(letter)
    }
  }

  return (
    <div>
      <p>for testing: in component: game word to guess is {breedName}</p>
      <div className={styles["game-tiles"]}>
        {gameSpaces(breedName)}
      </div>
      
      <div>
        {QUERTY_WITH_DIACRITICALS.map((row, rowIdx) => (
          <div className={styles.keyrow} key={rowIdx}>
            {row.map(letter => <Key key={letter} letter={letter} onKeyClick={handleKeyClick} isDisabled={playedLetters.includes(letter)}>{letter}</Key>)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HangdogGame