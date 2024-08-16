import React, { FunctionComponent, MouseEventHandler, useState, useEffect } from 'react';
import { sendMidiMessage, sendMidiOff } from '../functions/f';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useGlobalState } from './GlobalState';


type ButtonProps = {
  sequence: Array<Array<number>>,
  timeInterval: number,
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

export const PlayButton: FunctionComponent<ButtonProps> = ({ sequence, timeInterval }) => {

  const { state, dispatch } = useGlobalState();


  const togglePlay = () => {
    dispatch({ type: 'SET_PLAYING', payload: !state.playing });
  };

  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;


    if (state.playing) {
      intervalId = setInterval(() => {
        colorSeqCol(currentStep)
        setCurrentStep((currentStep + 1) % sequence.length);
      }, timeInterval);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [state.playing, sequence, currentStep, timeInterval]);


  return (
    <button onClick={togglePlay} className="moufa-button">
      {(state.playing ? <PauseIcon /> : <PlayArrowIcon />)}
    </button>
  );
};