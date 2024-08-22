import React, { useState, useEffect, FunctionComponent } from 'react';
import { arrayRemove, bpmToMs } from '../functions/f'
import { SeqButton } from './SeqButton'
import { useGlobalState } from './GlobalState';

type SeqProps = {
}

export const Sequencer: FunctionComponent<SeqProps> = ({}) => {
  const { state, dispatch } = useGlobalState();

  return (
      <div className="sequencer" id="grid" >
        
        {state.channel[state.selectedChannel].sequence.map((button,index) => {          
          return (
            <SeqButton key={index} index={index} button={button}></SeqButton>
          );
          
        })}
      </div>
  )
}