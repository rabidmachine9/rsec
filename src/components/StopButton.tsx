import React, { FunctionComponent, MouseEventHandler } from 'react';
import StopIcon from '@mui/icons-material/Stop';


type ButtonProps = {
  text?: string,
  onClick?: MouseEventHandler,
}


export const StopButton: FunctionComponent<ButtonProps> = ({ text, onClick}) => {
  
  return (
    <button  className="moufa-button">
       <StopIcon />
    </button>
  );
};