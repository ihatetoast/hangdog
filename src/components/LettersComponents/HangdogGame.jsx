
import {useState, useEffect, useCallback} from 'react'

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


  const handleKeyClick = useCallback((letter) =>{
    // double clicking ...
    if(usedLetters.includes(letter)) return;

    setUsedLetters((prevArr) => [letter, ...prevArr])
    // check if miss and return early
    if(!breedName.includes(letter)){
      getMissedLetter(letter);
      return;
    }
    // add to good guesses
    setGoodGuesses((prevArr) =>  [letter, ...prevArr])
  }, [breedName, getMissedLetter, usedLetters])

// checking to see if the word has been solved:
useEffect(()=>{
  const gameLettersOnly = breedName.replace(/[\s-]/g, "").split("");
  const uniqueLetters = [...new Set(gameLettersOnly)]; // Use Set to remove duplicate elements from an array
  const allGuessed = uniqueLetters.every(letter => goodGuesses.includes(letter))
  getWordSolved(allGuessed)
}, [goodGuesses, breedName, getWordSolved])

useEffect(() =>{
  // flatten the arr of arrs for easy validation:
  const validKeys = QWERTY_WITH_DIACRITICALS.flat();
  // note: add to html for users to use the HTML keys for the Ü etc. If on english keyboard, 
  // this might not work with the key combos. BUT I think it should work if user sets keyboard to another language.
  // test this!

  const handleKeyPress = (e) => {
    const key = e.key.toUpperCase();
    if(validKeys.includes(key)){
      handleKeyClick(key);
    }
  }
  window.addEventListener('keydown', handleKeyPress)

  // clean up
  return () => {
    window.removeEventListener('keydown', handleKeyPress);
  }
}, [handleKeyClick])

  return (
    <div>
      <div className={styles["game-tiles"]}>
        {gameSpaces()}
      </div> 
      <div>
        {QWERTY_WITH_DIACRITICALS.map((row, rowIdx) => (
          <div className={styles.keyrow} key={rowIdx}>
            {row.map(letter => <Key 
            key={letter}
            letter={letter}
            onKeyClick={handleKeyClick}
            isDisabled={usedLetters.includes(letter)}>{letter}
            </Key>)}
          </div>
        ))}
        <div className={styles.spacebar}>If your keyboard does not have Ä, É, Ñ, Ö, or Ü, use the mouse.</div>
      </div> 
    </div>
  )
}

export default HangdogGame