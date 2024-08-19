import React, { FunctionComponent, MouseEventHandler, useEffect, useState } from 'react';
import StopIcon from '@mui/icons-material/Stop';
import { useGlobalState } from './GlobalState';

type ButtonProps = {
}


export const StopButton: FunctionComponent<ButtonProps> = ({}) => {
  const { state, dispatch } = useGlobalState();
  const [stopClicked, setStopClicked] = useState(false)

  useEffect(() => {
    dispatch({ type: 'SET_PLAYING', payload: false });
    dispatch({ type: 'UPDATE_ACTIVE', payload: -1 });
  }, [stopClicked])

  const onClick = () => {
    setStopClicked(!stopClicked)
  }

  return (
    <button  className="moufa-button">
       <StopIcon  onClick={() => onClick()}/>
    </button>
  );
};