import React, { FunctionComponent, MouseEventHandler } from 'react';
import NextIcon from '@mui/icons-material/SkipNext';


type ButtonProps = {
  text?: string,
  onClick?: MouseEventHandler,
  channel: number
}


export const NextButton: FunctionComponent<ButtonProps> = ({ text, onClick, channel }) => {
  
  return (
    <button  className="moufa-button">
       <NextIcon />
    </button>
  );
};