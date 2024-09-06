import React, { FunctionComponent, MouseEventHandler, SetStateAction, useState, Dispatch, useEffect, useRef } from 'react';
import { useGlobalState } from './GlobalState';
import * as Tone from 'tone';
import {velocityToDb} from '../functions/synth'; 

type ButtonProps = {
  text: string,
  channel: number,
}


export const ChannelButton: FunctionComponent<ButtonProps> = ({ text, channel }) => {
    const { state, dispatch } = useGlobalState();

    useEffect(() => {
        // Dispatch an action to update the channel name when the component mounts
        dispatch({ type: 'SET_CHANNEL_NAME', payload: { channelIndex: channel, name: text } });
      }, []);
    
    useEffect(() => {


        if (!state.channel[state.selectedChannel].player) {
            const player = new Tone.Player({
                url: state.channel[state.selectedChannel].soundFile,
                autostart: false
            }).toDestination();

            const filePath = '/samples/'+ state.channel[state.selectedChannel].name +'/'+ state.channel[state.selectedChannel].soundFile;
            player.load(filePath).then(() => {
                console.log(`Loaded sound file: ${filePath}`);
            }).catch(error => {
                console.error(`Failed to load sound file: ${filePath}`, error);
            });

            // Save the player instance in the global state
            dispatch({
                type: 'SET_CHANNEL_PLAYER',
                payload: { channelIndex: state.selectedChannel, player },
            });
        }
    },[state.selectedChannel])

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