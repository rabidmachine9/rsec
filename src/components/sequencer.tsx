import React, { useState, useEffect, FunctionComponent } from 'react';
import { PlayButton } from './PlayButton';
import { arrayRemove, bpmToMs } from '../functions/f'
import { Dropdown, Dropdown2 } from './Dropdown';
import { Notes } from '../functions/notes';
import { Scales, scales } from '../functions/scales';
import { options } from '../functions/options'

type SeqProps = {
  bpm: number
}

let harmony = new Notes


export const Sequencer: FunctionComponent<SeqProps> = ({ bpm }) => {

  const [steps, setSteps] = useState(8)
  const [noteRange, setNoteRange] = useState(8)
  const [octave, setOctave] = useState(2)
  const [sequence, setSequence] = useState<Array<Array<number>>>([])
  const [ratio, setRatio] = useState(1)
  const [timeInterval, setTimeInterval] = useState(() => bpmToMs(bpm, ratio))
  const [rootNote, setRootNote] = useState<string>('c')
  const [baseNoteNumber, setBaseNoteNumber] = useState(harmony.symbolToMidi(rootNote, octave))
  const [scaleName, setScaleName] = useState<string>(() => 'harmonic')
  const [scale, setScale] = useState<Array<number>>(() => scales[scaleName as keyof typeof scales])
  const [channel, setChannel] = useState(1)


  useEffect(() => {
    setBaseNoteNumber(harmony.symbolToMidi(rootNote, octave))
    setSequence(() => gridToSeq(document.getElementById('grid')))
  }, [octave, rootNote])

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

  const onRatioChange: React.FormEventHandler<HTMLInputElement> = (e) => {
    let value: number = e.currentTarget.value as unknown as number
    setRatio(() => value)
  }

  function noteFromIndex(index: number, scaleLength: number, noteRange: number){
    let oct = Math.floor(index/scaleLength)
    let scaleIndex =  noteRange - index -1
    let noteNumber = baseNoteNumber + (oct *12)+ scale[scaleIndex % scaleLength] 
    return noteNumber
  }


  function renderSeqButtons(notesNum: number, steps: number) {
    let buttons = [];
    for (let j = 0; j < notesNum; j++) {
      let noteNumber = noteFromIndex(j, scale.length, notesNum)
      if(noteNumber > 120) break
      for (let i = 0; i < steps; i++) {
        buttons.push(
          <button className="seq-button" data-row={j} data-column={i} data-note={noteNumber} onClick={onSeqStepClick} key={'' + i + j}>
            {harmony.midiToSymbol(noteNumber)}
          </button>
        )
      }
    }
    return buttons
  }


  return (
    <div className="sequencer-container">

      <div className="sequencer" id="grid" style={{ gridTemplateColumns: "repeat(" + steps + ",40px)" }}>
        {renderSeqButtons(noteRange, steps)}
      </div>

      <div className="button-container">
        <PlayButton sequence={sequence} channel={channel} timeInterval={timeInterval} ></PlayButton>
        <Dropdown options={options.channels} label="Midi Channel:" name="channel" selected={channel} onChange={(e: any): void =>{ setChannel(() => e.target.value)}} ></Dropdown>
        <Dropdown options={options.ratio} label="Ratio:" name="ratio" selected={ratio} onChange={(e: any): void => onRatioChange(e)} ></Dropdown>
        <Dropdown2 options={options.steps} label="Steps:" name="steps" selected={steps} onChange={(e: any) => { setSteps(() => e.target.value) }}></Dropdown2>
        <Dropdown2 options={options.range} label="Range" name="range" selected={noteRange} onChange={(e:any) => setNoteRange(e.target.value) }></Dropdown2>
        <Dropdown2 options={options.octaves} label="Octave:" name="octave" selected={octave} onChange={(e: any) => { setOctave(() => e.target.value) }} ></Dropdown2>
        <Dropdown2 options={options.notes} label="Root Note:" name="" selected={rootNote} onChange={(e: any) => { setRootNote(() => e.target.value) }} ></Dropdown2>
        <Dropdown2 options={options.scales} label="Scale:" selected={scaleName} name={scaleName} onChange={(e: any) => {
          setScaleName(e.target.value)
          setScale(() => {
            return scales[e.target.value as keyof typeof scales]
          })
        }}></Dropdown2>
      </div>
    </div >
  )
}