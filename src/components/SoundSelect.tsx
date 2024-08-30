import React, { FunctionComponent, MouseEventHandler, useState } from 'react';
import { SoundButton } from './SoundButton';

type ButtonProps = {
}


export const SoundSelect: FunctionComponent<ButtonProps> = ({ }) => {
    
    


    return (
        <div className="sound-select">
            <SoundButton text="BD" channel={0}   ></SoundButton>
            <SoundButton text="SD" channel={1}   ></SoundButton>
            <SoundButton text="HO" channel={2}   ></SoundButton>
            <SoundButton text="HC" channel={3}   ></SoundButton>
            <SoundButton text="CR" channel={4}   ></SoundButton>
            <SoundButton text="RD" channel={5}   ></SoundButton>
            <SoundButton text="TM" channel={6}   ></SoundButton>
        </div>
    );
};