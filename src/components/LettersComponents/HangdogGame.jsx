
import {useState, useEffect} from 'react'

import Key from './Key'

import styles from './HangdogGame.module.css';

// for keyboard, an array of arrays
const QWERTY_WITH_DIACRITICALS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ['Ä','É', 'Ñ', 'Ö', 'Ü'] ];

const HangdogGame = ({breedName, getMissedLetter, getWordSolved}) => {
  const [usedLetters, setUsedLetters] = useState([])
  const [goodGuesses, setGoodGuesses] = useState([])

  // create game spaces and include spaces and dashes of original breed name
  const gameSpaces = () => {
    return breedName.split('').map((letter, idx) => {
      if(letter === " ") {
        return <span key={`space-${idx}`} className={styles.blank}>{" "}</span>;
      } else if (letter === "-") {
        return <span key={`hyphen-${idx}`} className={styles.blank}>{"-"}</span>;
      } else {
        return  <span key={`letter-${idx}`} className={styles.letter}>{goodGuesses.includes(letter) ? letter : " ? "}</span>;
      }
    })
  }

  function handleKeyClick(letter) {
    setUsedLetters((prevArr) => {
      return [letter, ...prevArr]
    })
    // check if miss and return early
    if(!breedName.includes(letter)){
      getMissedLetter(letter);
      return;
    }
    // add to good guesses
    setGoodGuesses((prevArr) => {
      return [letter, ...prevArr]
    })

  }


useEffect(()=>{
  const gameLettersOnly = breedName.replace(/[\s-]/g, "").split("");
  const uniqueLetters = [...new Set(gameLettersOnly)]; // Use Set to remove duplicate elements from an array
  const allGuessed = uniqueLetters.every(letter => goodGuesses.includes(letter))
  getWordSolved(allGuessed)
}, [goodGuesses, breedName, getWordSolved])


  return (
    <div>
      <div className={styles["game-tiles"]}>
        {gameSpaces()}
      </div> 
      <div>
        {QWERTY_WITH_DIACRITICALS.map((row, rowIdx) => (
          <div className={styles.keyrow} key={rowIdx}>
            {row.map(letter => <Key key={letter} letter={letter} onKeyClick={handleKeyClick} isDisabled={usedLetters.includes(letter)}>{letter}</Key>)}
          </div>
        ))}
      </div> 
    </div>
  )
}

export default HangdogGame