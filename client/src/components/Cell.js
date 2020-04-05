import React, {forwardRef} from 'react';

const Cell = forwardRef((props, ref) => {

  const handleEvent = (eventName, e) => {
    props[eventName](props.col, props.row, e)
  }

  return(
    <div
      ref={ref}
      id={`${props.col},${props.row}`}
      key={`${props.col},${props.row}`}
      className='grid-cell'
      onMouseDown={ (e) => handleEvent('startSearch',e)}
      onMouseEnter={(e) => handleEvent('continueSearch',e)}
      onMouseUp={(e) => handleEvent('endSearch',e)}>
      <div className='char'>
        {props.char}
      </div>
    </div>
  );
})

export default Cell;
