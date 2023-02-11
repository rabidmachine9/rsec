import React, {FunctionComponent, useState} from 'react';

type TopPanelProps = {
    bpm: number,
    changeBpm:any
}


export const  TopPanel:FunctionComponent<TopPanelProps> = ({bpm, changeBpm}) =>  {
  return (

      <div className='top-panel'>
        <label htmlFor="bpm">bpm:</label>
        <input type="number" id="bpm" name="bpm" min="1" max="200" value={bpm} onChange={changeBpm}></input>
      </div>
  );
}

