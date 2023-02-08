import React, { useState, useEffect } from 'react';
import { PlayButton } from './PlayButton';
import { bpmToMs, ratioOptions } from '../functions/f'
import { Dropdown } from './Dropdown';



export const Sequencer = () => {

  const [steps, setSteps] = useState(8)
  const [notesNum, setNoteNum] = useState(4)
  const [sequence, setSequence] = useState<Array<Array<number>>>([])
  const [bpm, SetBpm] = useState(120)
  const [ratio, setRatio] = useState(1)
  const [timeInterval, setTimeInterval] = useState(() => bpmToMs(bpm, ratio))
  const [baseNote, setBaseNote] = useState(36)


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
          else
            noteSeq.push(-1)
        }
      })
      seq.push(noteSeq)

    }

    console.log(seq)
    return seq
  }

  function onSeqStepClick(e: React.MouseEvent<HTMLButtonElement>) {
    const target = e.target as Element;
    target.classList.toggle('selected')
    let grid = document.getElementById('grid')
    let seq = gridToSeq(grid)
    setSequence(seq)
  }

  const onRatioChange: React.FormEventHandler<HTMLInputElement> = (e) => {
    let value: number = e.currentTarget.value as unknown as number
    setRatio(() => value)
    let interval = bpmToMs(bpm, e.currentTarget.value as unknown as number)
    setTimeInterval(() => interval)
  }



  function renderSeqButtons(notesNum: number, steps: number) {
    let buttons = [];
    for (let j = 0; j < notesNum; j++) {
      for (let i = 0; i < steps; i++) {
        buttons.push(<button className="seq-button" data-row={j} data-column={i} data-note={baseNote + (notesNum - 1) - j} onClick={onSeqStepClick} key={'' + i + j}></button>)
      }
    }
    return buttons
  }


  return (
    <div className="sequencer-container">
      <div className="sequencer" id="grid">
        {renderSeqButtons(notesNum, steps)}
      </div>
      <div className="button-container">
        <PlayButton sequence={sequence} timeInterval={timeInterval} ></PlayButton>
        <Dropdown options={ratioOptions} label="Choose beat ratio:" onChange={(e: any): void => onRatioChange(e)} ></Dropdown>
      </div>

    </div >
  )
}