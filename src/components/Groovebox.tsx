import React, { useState, useEffect, FunctionComponent } from 'react';
import { PlayButton } from './ButtonPlay';
import { Screen } from './Screen';
import { arrayRemove, bpmToMs } from '../functions/f'
import { PreviousButton } from './ButtonPrevious';
import { NextButton } from './ButtonNext';
import { StopButton } from './ButtonStop';
import { ChannelSelect } from './ChannelSelect';
import { useGlobalState } from './GlobalState';
import { Sequencer } from './sequencer';
import { SoundPlayer } from './SoundPlayer';
import { FileList } from './FileList'
import { ListenButton } from './ListenButton';

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

  return (
    <div className="groovebox-container"  >
    <div className="screen-button-container">
        <SoundPlayer />
        <Screen selectedChannel={state.channel[state.selectedChannel]}></Screen>
        <div className="button-container">
            <ListenButton></ListenButton>
            <PlayButton ></PlayButton>
            <StopButton></StopButton>
            <PreviousButton  channel={channel}></PreviousButton>
            <NextButton  channel={channel}></NextButton>        
        </div>
      </div>
      <ChannelSelect></ChannelSelect>
      <Sequencer></Sequencer>
      <FileList />
    </div >
    
  )
}