import React, { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { useGlobalState } from './GlobalState';
import { playKick, playSnare } from '../functions/synth';

export const SoundPlayer: React.FC = () => {
    const { state } = useGlobalState();


    useEffect(() => {
        if (state.playing) {
            state.channel.forEach((channel, index) => {
                if (channel.sequence[state.activeStep].armed) {
                    // Dynamically call the correct sound function based on the channel index
                    if (index === 0) playKick(channel.sequence[state.activeStep].velocity);
                    if (index === 1) playSnare(channel.sequence[state.activeStep].velocity);
                    // Add more conditions for additional channels
                }
            });
        }
            
    }, [state.activeStep]);

    return null; // This component doesn't render anything
};
