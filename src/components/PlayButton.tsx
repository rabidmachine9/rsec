import React, { FunctionComponent, MouseEventHandler, useState, useEffect } from 'react';
import { sendMidiMessage, sendMidiOff } from '../functions/f';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

type ButtonProps = {
  text?: string,
  onClick?: MouseEventHandler,
  sequence: Array<Array<number>>,
  timeInterval: number,
  channel: number
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

export const PlayButton: FunctionComponent<ButtonProps> = ({ text, onClick, sequence, timeInterval, channel }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;


    if (isPlaying) {
      intervalId = setInterval(() => {
        sendMidiOff(sequence[currentStep], channel)
        colorSeqCol(currentStep)
        sendMidiMessage(sequence[currentStep], channel);
        setCurrentStep((currentStep + 1) % sequence.length);
      }, timeInterval);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying, sequence, currentStep, timeInterval]);

  function play() {
    setIsPlaying(!isPlaying);
  }
  function stop() {
    setIsPlaying(false)
    setCurrentStep(0)
  }

  return (
    <button onClick={isPlaying ? stop : play} className="moufa-button">
      {(isPlaying ? <StopIcon /> : <PlayArrowIcon />)}
    </button>
  );
};