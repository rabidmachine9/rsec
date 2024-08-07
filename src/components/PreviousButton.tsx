import React, { FunctionComponent, MouseEventHandler } from 'react';
import PreviousIcon from '@mui/icons-material/SkipPrevious';


type ButtonProps = {
  text?: string,
  onClick?: MouseEventHandler,
  channel: number
}


export const PreviousButton: FunctionComponent<ButtonProps> = ({ text, onClick, channel }) => {
  
  return (
    <button  className="moufa-button">
       <PreviousIcon />
    </button>
  );
};