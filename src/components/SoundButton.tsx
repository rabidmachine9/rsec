import React, { FunctionComponent, MouseEventHandler, SetStateAction, useState, Dispatch } from 'react';
import { useGlobalState } from './GlobalState';

type ButtonProps = {
  text: string,
  channel: number,
}


export const SoundButton: FunctionComponent<ButtonProps> = ({ text, channel }) => {
    const { state, dispatch } = useGlobalState();

    const [id] = useState(text)
    const handleClick = (e: any) => {
        dispatch({type: 'SET_CHANNEL', payload: Number(e.target.getAttribute('data-channel'))})
    };
    return (
        <button
            data-channel={channel}  
            onClick={(e) => handleClick(e)}
            className={`moufa-button ${state.selectedChannel === channel ? 'active-sound ' : ''} `}
        >
            {text}
        </button>
    );
};