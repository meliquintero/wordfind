const getWordLocations = (characterGrid, coords) => {
  let {startCol, startRow, endCol, endRow } = coords

  if( startRow !== endRow && startCol !== endCol) {
    let rowDifference = Math.abs(startRow - endRow)
    let colDifference = Math.abs(startCol - endCol)

    if(rowDifference >= colDifference){
      if (startCol > endCol && startRow > endRow  ){
        return decreaseColAndRow(characterGrid, startCol, startRow, rowDifference)
      } else if (startCol > endCol ){
        return decreaseColDiagonaly(characterGrid, startCol, startRow, endRow, rowDifference)
      }  else if (startRow < endRow ){
        return incrementColAndRowDiagonaly(characterGrid, startCol, startRow, rowDifference)
      } else if (startRow > endRow ){
        return decreaseRowDiagonaly(characterGrid, startCol, startRow, endCol, rowDifference)
      }
    } else if( colDifference > rowDifference){
      if (startCol > endCol && startRow > endRow  ){
        return decreaseColAndRow(characterGrid, startCol, startRow, colDifference)
      } else if (startRow < endRow &&  startCol < endCol){
        return incrementColAndRowDiagonaly(characterGrid,  startCol, startRow, colDifference)
      } else if (startRow > endRow ){
        return decreaseRowDiagonaly(characterGrid, startCol, startRow, endCol, colDifference)
      } else if (startCol > endCol ){
        return decreaseColDiagonaly(characterGrid, startCol, startRow, endRow, colDifference)
      }
    }
  } else {
    if(startCol === endCol) {
      return incrementByRow(characterGrid, startCol, startRow, endRow )
    } else if (startRow === endRow) {
      return incrementByCol(characterGrid, startRow, startCol, endCol)
    }
  }
};

const decreaseColAndRow = (characterGrid, startCol, startRow, diff ) => {
  let selectedChars = ''
  let coordinates = []

  let i = 0
  while(i <= diff) {
    selectedChars += characterGrid[startRow-i][startCol-i]
    coordinates.push(startCol-i,startRow-i)
    i++
  }

  return { coordinates, selectedChars }
};

const decreaseColDiagonaly = (characterGrid, startCol, startRow, endRow, diff ) => {
  let selectedChars = ''
  let coordinates = []

  let i = 0
  while(i <= diff && characterGrid[startRow+i]) {
    selectedChars += characterGrid[startRow+i][startCol-i]
    coordinates.push(startCol-i,startRow+i)

    i++
  }

  return { coordinates, selectedChars }
};

const decreaseRowDiagonaly = (characterGrid, startCol, startRow, endCol, diff ) => {
  let coordinates = []
  let selectedChars = ''

  let i = 0
  while(i <= diff) {
    selectedChars += characterGrid[startRow-i][startCol+i]
    coordinates.push(startCol+i,startRow-i)
    i++
  }

  return { coordinates, selectedChars }
};

const incrementColAndRowDiagonaly = (characterGrid,  startCol, startRow, diff ) => {
  let selectedChars = ''
  let coordinates = []

  let i = 0
  while(i <= diff && characterGrid[startRow+i]) {
    selectedChars += characterGrid[startRow+i][startCol+i]
    coordinates.push(startCol+i,startRow+i)
    i++
  }

  return { coordinates, selectedChars }
};

const incrementByRow = (characterGrid, col, start, end ) => {
  let inv
  if (start > end) {
    [start, end] =  [end, start]
    inv = true
  }

  let coordinates = []
  let invertedCoordinates = []
  let selectedChars = ''
  let row = start

  while(row <= end) {
    selectedChars += characterGrid[row][col]
    coordinates.push(col,row)
    invertedCoordinates.unshift(col,row)
    row++
  }

  if (inv) { coordinates = invertedCoordinates}
  return {coordinates, selectedChars}
};

const incrementByCol = (characterGrid, row, start, end) => {
  let inv
  if (start > end) {
    [start, end] =  [end, start]
    inv = true
  }

  let coordinates = []
  let invertedCoordinates = []
  let selectedChars = ''
  let col = start

  while(col <= end) {
    selectedChars += characterGrid[row][col]
    coordinates.push(col,row)
    invertedCoordinates.unshift(col,row)
    col++
  }

  if (inv) {coordinates = invertedCoordinates}
  return { coordinates, selectedChars }
};

module.exports = { getWordLocations }
