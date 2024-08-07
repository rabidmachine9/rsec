import React, { FunctionComponent, MouseEventHandler, useState } from 'react';
import { SoundButton } from './SoundButton';

type ButtonProps = {
  text?: string,
  onClick?: MouseEventHandler,
}


export const SoundSelect: FunctionComponent<ButtonProps> = ({ text, onClick }) => {
    
    
    const [activeId, setActiveId] = useState('BD');

    

    return (
        <div className="sound-select">
            <SoundButton text="BD" active={activeId} updateActive={setActiveId} ></SoundButton>
            <SoundButton text="SD" active={activeId} updateActive={setActiveId} ></SoundButton>
            <SoundButton text="HH" active={activeId} updateActive={setActiveId} ></SoundButton>
            <SoundButton text="CL" active={activeId} updateActive={setActiveId}  ></SoundButton>
            <SoundButton text="CR" active={activeId} updateActive={setActiveId} ></SoundButton>
            <SoundButton text="RD" active={activeId} updateActive={setActiveId} ></SoundButton>
            <SoundButton text="TM" active={activeId} updateActive={setActiveId} ></SoundButton>
        </div>
    );
};