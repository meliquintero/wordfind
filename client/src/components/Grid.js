import React, { createRef } from 'react';

import Cell from './Cell';

import { cellSide } from '../constants';

const Grid = (props) => {

  let childRef = createRef()
  let setRef = (input) => {
    childRef = input

    if (childRef) {
      childRef.classList.remove('active')
    }
    if(childRef && props.coordinates.length > 0){
      highlightCell(childRef, props.coordinates, 'active')
    } else if(childRef && props.foundWords.length > 0) {
      childRef.classList.remove('active')
      for (let i=0; i < props.foundWords.length; i++) {
        highlightCell(childRef, props.foundWords[i].split(','), 'winner')
      }
    }
    if(childRef && props.foundWords.length === 0) {
      childRef.classList.remove('winner')
    }
  }

  const highlightCell = (childRef, coords, className) => {
    for (let i=0; i < coords.length-1; i = i + 2) {
      if(childRef.id === `${coords[i]},${coords[i+1]}`){
        childRef.classList.add(className)
      }
    }
  }

  const CellList = props.characterGrid.map((rows, row) => {
    return rows.map((cell, col) => {
      return(
        <Cell
          key={`${col},${row}`}
          ref={setRef}
          col={col}
          row={row}
          char={props.characterGrid[row][col]}
          {...props}/>
      )
    });
  });

  let divStyle = {
    gridTemplateRows: `repeat(${props.characterGrid.length}, ${cellSide})`,
    gridTemplateColumns: `repeat(${props.characterGrid[0].length}, ${cellSide})`,
  }

  return(
    <div
      className='grid-container'
      style={divStyle}>
      { CellList }
    </div>
  )
}

export default Grid;
