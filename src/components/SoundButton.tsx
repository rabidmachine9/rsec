import React, { FunctionComponent, MouseEventHandler, SetStateAction, useState, Dispatch } from 'react';


type ButtonProps = {
  text: string,
  onClick?: MouseEventHandler,
  active: string,
  updateActive: Dispatch<SetStateAction<string>>,
}


export const SoundButton: FunctionComponent<ButtonProps> = ({ text, onClick, active, updateActive }) => {
  
    const [id] = useState(text)
    const handleClick = () => {
        if (updateActive) {
            updateActive(text);
        }
    };
    return (
        <button  className={(active == text ? "active-sound " : "") + "moufa-button"} onClick={handleClick}>
            {text}
        </button>
    );
};