declare global {
    export interface Window {
      Go: any;
      //myGolangFunction: (num1: number, num2: number) => number,
      go_bpmToMs: (bpm: number, ratio: number) => number,
      go_sendMidi: (note: number) => void,
    }
  }
  
  export {};