import React, { FunctionComponent, MouseEventHandler, useState, useEffect } from 'react';
import { sendMidiMessage, sendMidiOff } from '../functions/f';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

type ButtonProps = {
  text?: string,
  onClick?: MouseEventHandler,
  sequence: Array<Array<number>>,
  timeInterval: number
}


function colorSeqCol(col: number, length: number) {
  var ractiveEl
  let activeEl = document.querySelectorAll('[data-column="' + col + '"]')
  for (let i = 0; i < activeEl.length; i++) {
    activeEl[i].classList.add('active');
  }
  if (col === 0) {
    ractiveEl = document.querySelectorAll('[data-column="' + (length - 1) + '"]')
  }
  else {
    ractiveEl = document.querySelectorAll('[data-column="' + (col - 1) + '"]')
  }
  for (let i = 0; i < ractiveEl?.length; i++) {
    ractiveEl[i]?.classList.remove('active');
  }
}

export const PlayButton: FunctionComponent<ButtonProps> = ({ text, onClick, sequence, timeInterval }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeNotes, setActiveNotes] = useState([])


  useEffect(() => {
    let intervalId: any;


    if (isPlaying) {
      intervalId = setInterval(() => {
        activeNotes.forEach((note) => {
          console.log("off")
          sendMidiOff(note)
        })
        setActiveNotes([])
        colorSeqCol(currentStep, sequence.length)

        for (let i = 0; i < sequence[currentStep].length; i++) {
          let currentNote = sequence[currentStep][i];
          if (currentNote !== -1) {
            setActiveNotes(() => {
              let newActive: any = activeNotes
              newActive.push(currentNote)
              return newActive
            })
            sendMidiMessage(currentNote);
          }
        }


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