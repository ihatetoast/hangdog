import React from 'react'
import styles from './key.module.css'

const Key = ({letter, onKeyClick, isDisabled}) => {
  return (
    <button className={styles.keypad} letter={letter} onClick={()=>onKeyClick(letter)} disabled={isDisabled}>{letter}</button>
  )
}

export default Key