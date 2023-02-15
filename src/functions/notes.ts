export class Notes {
  notes = 'ccddeffggaab' //western notes
  naturalPositions = [0, 2, 4, 5, 7, 9, 11]
  baseMidiNote = 24
  octave = 2
  symbolToMidi(s: string, octave?: number): number {
    if (octave === undefined) octave = 2

    const note = s[0].toLowerCase()
    const flat = +(s[1] === 'b') //this is supposed to be slow
    const sharp = +(s[1] === '#')
    //this.octave = 2
    return this.baseMidiNote + (octave * 12) + this.notes.indexOf(note) + (sharp - flat)
  }

  midiToSymbol(mindiNum: number) {
    const position = mindiNum % 12
    var tone: string
    if (!this.naturalPositions.includes(position)) {
      tone = this.notes[position] + '#'
    } else {
      tone = this.notes[position]
    }

    return tone
  }

  midiToOctave(midiNum: number) {
    return Math.floor((midiNum - this.baseMidiNote) / 12)
  }
  octaveToMidi(octave: number) {
    return this.baseMidiNote + (octave * 12)
  }

  setOctave(oct: number) {
    this.octave = oct
  }

  getOctave() {
    return this.octave
  }
}