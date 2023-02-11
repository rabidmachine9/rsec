import React, { useState, useEffect, FunctionComponent } from 'react';
import { PlayButton } from './PlayButton';
import { arrayRemove, bpmToMs, ratioOptions, stepOptions } from '../functions/f'
import { Dropdown } from './Dropdown';
import { Repeat } from '@mui/icons-material';


type SeqProps = {
  bpm: number
}



export const Sequencer: FunctionComponent<SeqProps> = ({bpm}) => {

  const [steps, setSteps] = useState(8)
  const [notesNum, setNoteNum] = useState(4)
  const [sequence, setSequence] = useState<Array<Array<number>>>([])
  const [ratio, setRatio] = useState(1)
  const [timeInterval, setTimeInterval] = useState(() => bpmToMs(bpm, ratio))
  const [baseNote, setBaseNote] = useState(36) 
  

  useEffect(() => {
    console.log(steps)
    setSequence(() => gridToSeq(document.getElementById('grid')))
  }, [steps])

  useEffect(() => {
    setTimeInterval(() => bpmToMs(bpm, ratio))
  }, [bpm, ratio])

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

    console.log(seq)
    return seq
  }

  function addToSeq(col: number, note: number){
    let seq = sequence
    seq[col].push(note)
    setSequence(seq)
  }
  function removeFromSeq(col: number, note: number){
    let seq = sequence
    seq[col] = arrayRemove(seq[col], note)

    setSequence(seq)
  }

  function onSeqStepClick(e: React.MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLElement;
    target.classList.toggle('selected')
    //let grid = document.getElementById('grid')
    if(target.classList.contains('selected')){
      addToSeq(Number(target.dataset.column) , Number(target.dataset.note))
    }
    else{
      removeFromSeq(Number(target.dataset.column) , Number(target.dataset.note))
    }
  }

  const onRatioChange: React.FormEventHandler<HTMLInputElement> = (e) => {
    let value: number = e.currentTarget.value as unknown as number
    setRatio(() => value)
  }




  function renderSeqButtons(notesNum: number, steps: number) {
    let buttons = [];
    for (let j = 0; j < notesNum; j++) {
      for (let i = 0; i < steps; i++) {
        buttons.push(
          <button className="seq-button" data-row={j} data-column={i} data-note={baseNote + (notesNum - 1) - j} onClick={onSeqStepClick} key={'' + i + j}></button>
        )
      }
    }
    return buttons
  }


  return (
    <div className="sequencer-container">
      <div className="sequencer" id="grid" style={{gridTemplateColumns: "repeat("+steps+",40px)"}}>
        {renderSeqButtons(notesNum, steps)}
      </div>
      <div className="button-container">
        <PlayButton sequence={sequence} timeInterval={timeInterval} ></PlayButton>
        <Dropdown options={ratioOptions} label="Ratio:" onChange={(e: any): void => onRatioChange(e)} ></Dropdown>
        <Dropdown options={stepOptions} label="Steps:" onChange={(e:any)=>{ setSteps(() => e.target.value)}}></Dropdown>
      </div>

    </div >
  )
}