import React, { FunctionComponent, MouseEventHandler } from 'react';
import MusicNote from '@mui/icons-material/MusicNote';
import { useGlobalState } from './GlobalState';


type ButtonProps = {
}


export const ListenButton: FunctionComponent<ButtonProps> = ({}) => {
  const { state, dispatch } = useGlobalState(); 

  const onClick = () =>{
    state.channel[state.selectedChannel].player?.start()
  }
  return (
    <button  className="moufa-button">
       <MusicNote onClick={(e) => onClick()}/>
    </button>
  );
};