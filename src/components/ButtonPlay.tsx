import React, { FunctionComponent, useState, useEffect } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useGlobalState } from './GlobalState';


type ButtonProps = {
}


function colorSeqCol(col: number) {
  let grid = document.getElementById('grid')
  let seqButtons = grid!.querySelectorAll('.seq-button')

  Array.from(seqButtons).forEach((el) => {
    el.classList.remove('active')
  })
  let activeEl = document.querySelectorAll('[data-column="' + col + '"]')
  activeEl.forEach((el) => {
    el.classList.add('active')
  })
  
}

export const PlayButton: FunctionComponent<ButtonProps> = ({}) => {

  const { state, dispatch } = useGlobalState();


  const togglePlay = () => {
    console.log(state.msInterval)
    dispatch({ type: 'SET_PLAYING', payload: !state.playing });
  };

  const updateStep = () => {
    dispatch({ type: 'UPDATE_ACTIVE', payload: (state.activeStep + 1) % state.sequenceLength });
  }

  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;


    if (state.playing) {
      intervalId = setInterval(() => {
        colorSeqCol(state.activeStep)
        updateStep()
      }, state.msInterval);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [state.playing, state.activeStep]);


  return (
    <button onClick={togglePlay} className="moufa-button">
      {(state.playing ? <PauseIcon /> : <PlayArrowIcon />)}
    </button>
  );
};