import React, { FunctionComponent, MouseEventHandler, SetStateAction, useState, Dispatch, useEffect } from 'react';
import { useGlobalState } from './GlobalState';

type ButtonProps = {
  text: string,
  channel: number,
}


export const SoundButton: FunctionComponent<ButtonProps> = ({ text, channel }) => {
    const { state, dispatch } = useGlobalState();

    useEffect(() => {
        // Dispatch an action to update the channel name when the component mounts
        dispatch({ type: 'SET_CHANNEL_NAME', payload: { channelIndex: channel, name: text } });
      }, []);

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