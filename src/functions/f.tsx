export function bpmToMs(bpm: number, ratio: number) {
  return (60000 / bpm) * ratio
}


export const sendMidiMessage = (notes: number[]) => {
  navigator.requestMIDIAccess().then(midiAccess => {
    const outputs = Array.from(midiAccess.outputs.values());
    notes.forEach((note) => {
      outputs.forEach(output => {
        output.send([0x94, note, 100]); // send a note on message on MIDI channel 1 (0x90) for specified note number at velocity 100
      });
    });
  });
};

export const sendMidiOff = (notes: number[]) => {
  navigator.requestMIDIAccess().then(midiAccess => {
    const outputs = Array.from(midiAccess.outputs.values());
    notes.forEach((note) => {
      outputs.forEach(output => {
        output.send([0x94, note, 0x00]); // send a note on message on MIDI channel 1 (0x90) for specified note number at velocity 0
      });
    })
    
  });
};


export function arrayRemove(arr: any[], value: any) { 
    
  return arr.filter(function(ele){ 
      return ele != value; 
  });
}


export const ratioOptions = new Map<string, number>([['1', 1], ['1/2', 0.5], ['1/4', 0.25]]);

export const stepOptions = new Map<string, number>([['8',8 ], ['4', 4], ['16', 16], ['32', 32]]);