import React, {FunctionComponent, useState, useEffect} from 'react';
import { useGlobalState } from './GlobalState';


type TopPanelProps = {
}


export const  TopPanel:FunctionComponent<TopPanelProps> = ({}) =>  {
  const { state, dispatch } = useGlobalState();


  const handleUpdateBPM = (e: any) => {
    dispatch({ type: 'SET_BPM', payload: e.target.value });
  };


  const handleUpdateMSInterval = () => {
    dispatch({type: 'SET_MSINTERVAL', payload: 60000 / state.bpm });
  };
  useEffect(() => {
    handleUpdateMSInterval()
  }, [state.bpm])
  return (
    
    <div className='top-panel'>
      <label htmlFor="bpm">bpm:</label>
      <input type="number" id="bpm" name="bpm" min="1" max="200" value={state.bpm} onChange={handleUpdateBPM}></input>
    </div>
  );
}

