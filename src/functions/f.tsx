export function bpmToMs(bpm: number, ratio: number) {
  return (60000 / bpm) * ratio
}


export const sendMidiMessage = (noteNumber: any) => {
  navigator.requestMIDIAccess().then(midiAccess => {
    const outputs = Array.from(midiAccess.outputs.values());
    outputs.forEach(output => {
      output.send([0x94, noteNumber, 100]); // send a note on message on MIDI channel 1 (0x90) for specified note number at velocity 100
    });
  });
};

export const sendMidiOff = (noteNumber: any) => {
  navigator.requestMIDIAccess().then(midiAccess => {
    const outputs = Array.from(midiAccess.outputs.values());
    outputs.forEach(output => {
      output.send([0x94, noteNumber, 0x00]); // send a note on message on MIDI channel 1 (0x90) for specified note number at velocity 100
    });
  });
};


export const ratioOptions = new Map<string, number>([['1', 1], ['1/2', 0.5], ['1/4', 0.25]]);