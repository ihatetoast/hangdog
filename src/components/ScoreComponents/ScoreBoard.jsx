import React from 'react';
import ScoreIcon from './ScoreIcon';
import styles from './ScoreBoard.module.css';
const ScoreBoard = ({ mistakes }) => {
  const numberOfPoos = mistakes.length;
  const totalIcons = 6;

  return (
    <div className={styles['icons-container']}>
      {Array.from({ length: totalIcons }).map((_, idx) => (
        <ScoreIcon
          key={`icon-${idx}`}
          showError={idx >= totalIcons - numberOfPoos}
        />
      ))}   
    </div>
  );
};

export default ScoreBoard;
