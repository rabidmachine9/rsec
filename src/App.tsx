import React, {useState} from 'react';
import './scss/styles.scss';
import { Sequencer } from './components/sequencer'



function App() {
  const [bpm, setBpm ] = useState<number>(120)
  return (
    <div className="App">
      <div className='top-panel'>
        <label htmlFor="bpm">bpm:</label>
        <input type="number" id="bpm" name="bpm" min="1" max="200" value={bpm} onChange={(e:any) => setBpm(e.target.value)}></input>
      </div>
      <Sequencer bpm={bpm}></Sequencer>
    </div>
  );
}

export default App;
