import React, { useState, useEffect } from 'react';

import Challenge from './Challenge';
import ProgressBar from './ProgressBar';

import { findChallenges } from '../apiWrapper';

const Game = () => {
  const [challenges, setChallenges] = useState([]);
  const [indx, setIndx] = useState(0);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    if (indx === challenges.length-1){
      setHasWon(true)
    }
  }, [indx]);

  useEffect(() => {
    findChallenges()
      .then(response => {
        setChallenges(response);
      })
      .catch(error => console.log(error));
  }, []);

  const restartChallenge = (e) => {
    e.preventDefault()
    setIndx(0);
    setHasWon(false)
  }

  const nextChallenge = () => {
    setTimeout(() => {
        setIndx(indx + 1)
      }, 900);
  }

  return (
    <div className='game'>
    { challenges.length > 0 && !hasWon &&
      <>
        <ProgressBar
          indx={indx}
          totalChallenges= {challenges.length}/>
        <Challenge
          challenge={challenges[indx]}
          nextChallenge={nextChallenge} />
      </>
    }
    { hasWon &&
      <>
        <div>
          Well done!
        </div>
        <button onClick={(e) => restartChallenge(e) }>
          <span>Practice more</span>
        </button>
      </>
    }
    </div>
  )
}

export default Game
