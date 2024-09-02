import React, { FunctionComponent, MouseEventHandler, useState } from 'react';
import { SoundButton } from './SoundButton';
import { useGlobalState } from './GlobalState';


type ButtonProps = {
}


export const SoundSelect: FunctionComponent<ButtonProps> = ({ }) => {
    
    const { state, dispatch } = useGlobalState();
    

    return (
        <div className="sound-select">
            {state.channel.map((channel, index) => (
                <SoundButton text={channel.name} channel={index}></SoundButton>
            ))}
        </div>
    );
};