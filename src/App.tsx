import React, {useState, useCallback, useEffect} from 'react';
import './scss/styles.scss';
import { Sequencer } from './components/sequencer'
import { TopPanel } from './components/TopPanel';


function App() {
  const [bpm, setBpm ] = useState<number>(120)
  const [baseInterval, setBaseInterval ] = useState<number>(() => bpm/6000)


  useEffect(() => {
    setBaseInterval(bpm/6000)
  }, [bpm])

  const changeBpm = (e: any) => {
    setBpm(e.target.value)
  };

  return (
    <div className="App">
      <TopPanel bpm={bpm} changeBpm={changeBpm}></TopPanel>
      <Sequencer bpm={bpm}></Sequencer>
    </div>
  );
}

export default App;
