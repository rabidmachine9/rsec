import React, {useState, useCallback, useEffect} from 'react';
import './scss/styles.scss';
import { TopPanel } from './components/TopPanel';
import { Groovebox } from './components/Groovebox';


function App() {


  return (
    <div className="App">
      <TopPanel></TopPanel>
      <Groovebox></Groovebox>
    </div>
  );
}

export default App;
