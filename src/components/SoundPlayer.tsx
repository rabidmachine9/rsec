import React, { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { useGlobalState } from './GlobalState';
import { velocityToDb } from '../functions/synth';

export const SoundPlayer: React.FC = () => {
    const { state, dispatch } = useGlobalState();

    
    useEffect(() => {
        if (state.playing) {
            state.channel.forEach((channel, index) => {
                if (channel.sequence[state.activeStep]?.armed && channel.player?.loaded) {
                    const velocityVol = velocityToDb(channel.sequence[state.activeStep]?.velocity);
                    channel.player.volume.value = velocityVol;
                    channel.player.start();
                }
            });
        }
    }, [state.activeStep]);


    return null; // This component doesn't render anything
};
