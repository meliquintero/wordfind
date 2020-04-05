import React, { useState, useEffect, useCallback  } from 'react';

import Grid from './Grid';

import { languages } from '../constants';
import { getWordLocations } from '../gridHelpers';

const Challenge = ({challenge, nextChallenge}) => {
  const [coordinates, setCoordinates] = useState([]);
  const [wordLocations, setWordLocations] = useState({});
  const [foundWords, setFoundWords] = useState([]);

  const initChallange = useCallback(() => {
    setWordLocations(challenge.word_locations);
    setFoundWords([])
  }, [challenge]);

  useEffect(() => {
    initChallange();
  }, [initChallange]);

  useEffect(() => {
    if (foundWords.length > 0 && foundWords.length === Object.keys(wordLocations).length) {
      nextChallenge()
    }
  }, [foundWords]);

  const word = () => { return challenge.word }
  const targetLanguage = () => { return languages[challenge.target_language]}
  const characterGrid = () => { return challenge.character_grid}

  const handleOnMouseLeaveGrid = () => {
    setCoordinates([])
  }

  const startSearch = (col,row,e) => {
    e.preventDefault()
    setCoordinates([ ...coordinates, col, row ])
  }

  const continueSearch = (endCol,endRow, e) => {
    e.preventDefault()

    let data
    if (coordinates.length > 1) {
      let [startCol,startRow] = coordinates

      data = getWordLocations(characterGrid(), {startCol, startRow, endCol, endRow} )
      if (data) {
        setCoordinates([ ...data.coordinates ])
      }
    }
  }

  const endSearch = (endCol, endRow, e) => {
    e.preventDefault()
    checkIfWordIsRight(endCol, endRow)
    setCoordinates([])
  }

  const checkIfWordIsRight = ( endCol, endRow) => {
    let [startCol,startRow] = coordinates
    let data = getWordLocations(characterGrid(), {startCol, startRow, endCol, endRow})
    let chars = data.selectedChars

    let foundWord = Object.keys(wordLocations)
      .find(key => wordLocations[key] === chars || wordLocations[key] === chars.split('').reverse().join('') )

    if (foundWord) {
      setFoundWords([...foundWords, foundWord])
    }
  }

  return (
    <div
      className='board'
      onMouseLeave={ (e) => handleOnMouseLeaveGrid(e)}>
    <aside>
      <h2>Find the word '{word()}' in {targetLanguage()} </h2>
    </aside>

    <Grid
      coordinates={coordinates}
      foundWords={foundWords}
      characterGrid={characterGrid()}
      startSearch={startSearch}
      continueSearch={continueSearch}
      endSearch={endSearch}/>
    </div>
  )
}

export default Challenge
