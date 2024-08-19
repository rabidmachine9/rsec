import React, { FunctionComponent, MouseEventHandler } from 'react';
import PreviousIcon from '@mui/icons-material/SkipPrevious';
import { useGlobalState } from './GlobalState';

type ButtonProps = {
  channel: number
}


export const PreviousButton: FunctionComponent<ButtonProps> = ({ channel }) => {
  const { state, dispatch } = useGlobalState(); 

  const onClick = (e: any) =>{
    dispatch({ type: 'SET_SELECTEDSEQBUTTON', payload: ((state.selectedSeqButton - 1) + state.sequence.length) % state.sequence.length  });
  }
  return (
    <button  className="moufa-button">
       <PreviousIcon onClick={onClick}/>
    </button>
  );
};