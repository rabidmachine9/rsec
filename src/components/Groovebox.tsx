import React, { useState, useEffect, FunctionComponent } from 'react';
import { PlayButton } from './PlayButton';
import { Screen } from './Screen';
import { arrayRemove, bpmToMs } from '../functions/f'
import { Notes } from '../functions/notes';
import { PreviousButton } from './PreviousButton';
import { NextButton } from './NextButton';
import { StopButton } from './StopButton';
import { SoundSelect } from './SoundSelect';
import { useGlobalState } from './GlobalState';
import { Sequencer } from './sequencer';
import { SoundPlayer } from './SoundPlayer';
import { FileList } from './FileList'

type GrooveProps = {
  
}



export const Groovebox: FunctionComponent<GrooveProps> = ({  }) => {
    const { state, dispatch } = useGlobalState();
    const [steps, setSteps] = useState(16)
    const [noteRange, setNoteRange] = useState(1)
    const [sequence, setSequence] = useState<Array<Array<number>>>([])
    const [ratio, setRatio] = useState(1)
    const [timeInterval, setTimeInterval] = useState(() => bpmToMs(state.bpm, ratio))

    const [channel, setChannel] = useState(1)


    useEffect(() => {
        //console.log(steps)
        setSequence(() => gridToSeq(document.getElementById('grid')))
    }, [steps])

    useEffect(() => {
        setTimeInterval(() => bpmToMs(state.bpm, ratio))
    }, [state.bpm, ratio])

    useEffect(() => {
        setSequence(() => gridToSeq(document.getElementById('grid')))
    }, []);

    function gridToSeq(el: any) {
        var seq: any = []
        let buttons = el.querySelectorAll('.seq-button')

        for (let i = 0; i < steps; i++) {
        let noteSeq: any = []
        buttons.forEach((btn: HTMLButtonElement) => {
            if (Number(btn.dataset.column) === i) {
            if (btn.classList.contains('selected'))
                noteSeq.push(btn.dataset.note)
            }
        })
        seq.push(noteSeq)

        }

        //console.log(seq)
        return seq
    }

    function addToSeq(col: number, note: number) {
        let seq = sequence
        seq[col].push(note)
        setSequence(seq)
    }
    function removeFromSeq(col: number, note: number) {
        let seq = sequence
        seq[col] = arrayRemove(seq[col], note)

        setSequence(seq)
    }

    function onSeqStepClick(e: React.MouseEvent<HTMLButtonElement>) {
        const target = e.target as HTMLElement;
        target.classList.toggle('selected')
        //let grid = document.getElementById('grid')
        if (target.classList.contains('selected')) {
        addToSeq(Number(target.dataset.column), Number(target.dataset.note))
        }
        else {
        removeFromSeq(Number(target.dataset.column), Number(target.dataset.note))
        }
  }



 


  function renderSeqButtons(notesNum: number, steps: number) {
    let buttons = [];

      for (let i = 0; i < steps; i++) {
        buttons.push(
          <button className="seq-button"  data-column={i}  onClick={onSeqStepClick} key={'' + i}>
          </button>
        )
      }
    
    return buttons
  }


  return (
    <div className="groovebox-container"  >
    <div className="screen-button-container">
        <SoundPlayer />
        <Screen selectedChannel={state.channel[state.selectedChannel]}></Screen>
        <div className="button-container">
            <PlayButton ></PlayButton>
            <StopButton></StopButton>
            <PreviousButton  channel={channel}></PreviousButton>
            <NextButton  channel={channel}></NextButton>        
        </div>
      </div>
      <SoundSelect></SoundSelect>
      <Sequencer></Sequencer>
      <FileList />
    </div >
    
  )
}