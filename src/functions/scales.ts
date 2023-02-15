import { Notes } from './notes'

export var scales = {
  'major': [0, 2, 4, 5, 7, 9, 11], 'ionian': [0, 2, 4, 5, 7, 9, 11],
  'minor': [0, 2, 3, 5, 7, 8, 10], 'aeolian': [0, 2, 3, 5, 7, 8, 10],
  'dorian': [0, 2, 3, 5, 7, 9, 10],
  'mixolydian': [0, 2, 4, 5, 7, 9, 10],
  'lydian': [0, 2, 4, 6, 7, 9, 11],
  'phrygian': [0, 1, 3, 5, 7, 8, 10],
  'locrian': [0, 1, 3, 5, 6, 8, 10],
  'diminished': [0, 1, 3, 4, 6, 7, 9, 10],
  'wholehalf': [0, 2, 3, 5, 6, 8, 9, 11],
  'wholetone': [0, 2, 4, 6, 8, 10],
  'minorblues': [0, 3, 5, 6, 7, 10],
  'minorpentatonic': [0, 3, 5, 7, 10],
  'majorpentatonic': [0, 2, 4, 7, 9],
  'harmonicminor': [0, 2, 3, 5, 7, 8, 11],
  'melodicminor': [0, 2, 3, 5, 7, 9, 11],
  'super locrian': [0, 1, 3, 4, 6, 8, 10],
  'bhairav': [0, 1, 4, 5, 7, 8, 11],
  'hungarian': [0, 2, 3, 6, 7, 8, 11],
  'gypsy': [0, 1, 4, 5, 7, 8, 10],
  'hirajoshi': [0, 2, 3, 7, 8],
  'insen': [0, 1, 5, 7, 10],
  'iwato': [0, 1, 5, 6, 10],
  'kumoi': [0, 2, 3, 7, 9],
  'pelog': [0, 1, 3, 4, 7, 8],
  'spanish': [0, 1, 3, 4, 5, 6, 8, 10],
  'harmonic': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
};



export class Scales extends Notes {
  s: Array<number>
  noteNumber: number

  constructor(note: number, scale: Array<number>) {
    super()
    this.s = scale
    this.noteNumber = note
    this.octave = 2
  }

  getScale() {
    return this.s
  }

  getBaseNoteNum() {
    return this.noteNumber
  }

  getBaseNoteString() {
    return this.midiToSymbol(this.noteNumber)
  }

  getNoteInPosition(pos: number, oct: number) {
    if (oct === undefined) {
      oct = this.octave
    }
    return this.s[pos] + this.octaveToMidi(oct)
  }

  getRandom(oct?: number): number {
    if (oct === undefined) {
      oct = this.octave
    }
    return this.s[Math.floor(Math.random() * (this.s.length))] + this.octaveToMidi(oct)
  }

  getAmong(positions: Array<number>, oct?: number) {
    if (oct === undefined) {
      oct = this.octave
    }

    let position = Math.floor(Math.random() * (positions.length))

    return this.s[positions[position]] + this.octaveToMidi(oct)
  }


  getScaleNotesInOctave() {
    var notes = this.s.map((x) => {
      return x + this.octaveToMidi(this.getOctave())
    })
    return notes
  }

}