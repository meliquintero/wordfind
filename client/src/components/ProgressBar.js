import React from 'react';
import { Line } from 'rc-progress';

const ProgressBar = ({indx, totalChallenges}) => {
  let percentage = indx*100/(totalChallenges)
  return(
    <Line percent={percentage}
      strokeWidth='2'
      trailWidth='4'
      strokeLinecap='butt'
      strokeColor='#51d400' />
  );
}

export default ProgressBar;
