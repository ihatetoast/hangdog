import poop from '../../assets/poop-2024794_640.png';
import sign from '../../assets/sign-1283411_640.png';

import styles from './ScoreIcon.module.css'

const ScoreIcon = ({ showError }) => {

  return (
    <span className={`${styles.icon} ${showError ? styles.poop : styles.sign}`}>
      <img
        src={showError ? poop : sign}
        alt={showError ? 'poop emoji' : 'buster sign signalling no dog pooping'}
      />
    </span>
  );
};

export default ScoreIcon;
