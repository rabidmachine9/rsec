import React, { FunctionComponent, MouseEventHandler } from 'react';
import PreviousIcon from '@mui/icons-material/SkipPrevious';
import { useGlobalState } from './GlobalState';

type ButtonProps = {
}


export const PreviousButton: FunctionComponent<ButtonProps> = ({}) => {
  const { state, dispatch } = useGlobalState(); 

  const onClick = (e: any) =>{
    dispatch({ type: 'SET_SELECTEDSEQBUTTON', payload: ((state.selectedSeqButton - 1) + state.sequenceLength) % state.sequenceLength  });
  }
  return (
    <button  className="moufa-button" onClick={onClick}>
       <PreviousIcon />
    </button>
  );
};