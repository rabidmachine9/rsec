package main

import (
   "syscall/js"
   "gitlab.com/gomidi/midi/v2"
   "gitlab.com/gomidi/midi/v2/mid"
   "gitlab.com/gomidi/midi/v2/realtime"
)

// func myGolangFunction() js.Func {
//    return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
//       return args[0].Int() + args[1].Int()
//    })
// }



var SECONDS_IN_MINUTE float64 = 60000 


func go_bpmToMs() js.Func {
   return js.FuncOf(func(this js.Value, args []js.Value) interface{}{
      // bpm := args[0]
      // //js.Global().Get("console").Call("log", bpm)
      // ratio := args[1]
      ms := (60000.0 / args[0].Float()) * args[1].Float()
      js.Global().Get("console").Call("log", ms)
      return ms
   })
}

func go_sendMidi() js.Func {
   return js.FuncOf(func(this js.Value, args []js.Value) interface {} {
      
      output, err := midi.OpenOut(0)
      if err != nil {
         panic(err)
      }
      defer output.Close()

      output.Send(midimessage.Channel(0).NoteOn(note, 100))
         // midiNote := args[0].Int()
         // midiNoteUint8 := uint8(midiNote)
         // message := midi.Message{
         //    Status: 0x90, // note on message
         //    Data1:  midiNoteUint8,
         //    Data2:  100, // velocity
         // }
         // midi.WriteShort(0, message)
         //midi.NoteOn(1, midiNoteUint8, 100)
         return nil
         // element is the element from someSlice for where we are
}) 
   
   
   
   // navigator.requestMIDIAccess().then(midiAccess => {
   //    const outputs = Array.from(midiAccess.outputs.values());
   //    notes.forEach((note) => {
   //      outputs.forEach(output => {
   //        output.send([0x94, note, 100]); // send a note on message on MIDI channel 1 (0x90) for specified note number at velocity 100
   //      });
   //    });
   //  });
}

func main() {
   ch := make(chan struct{}, 0)
   //js.Global().Set("myGolangFunction", myGolangFunction())
   js.Global().Set("go_bpmToMs", go_bpmToMs())
   js.Global().Set("go_sendMidi", go_sendMidi())
   <-ch
   select {}
}