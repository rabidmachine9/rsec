export type MidiDevice = {
    id: string;
    name: string;
    type: 'input' | 'output';
    device: WebMidi.MIDIInput | WebMidi.MIDIOutput;
  };
  