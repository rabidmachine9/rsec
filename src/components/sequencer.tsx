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
        {state.sequence.map((button, index) => (
          <SeqButton index={index}></SeqButton>
                // <button
                //     key={index}
                //     className={`seq-button ${state.selectedSeqButton === index ? 'selected' : ''} ${state.sequence[state.selectedSeqButton].get('armed') == index ? 'armed' : ''}`}
                //     data-column={index}
                //     // onClick={(e) => onClick(e, index)}
                // >
                // </button>
            ))}
      </div>
  )
}