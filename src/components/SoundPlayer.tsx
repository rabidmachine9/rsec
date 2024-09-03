import React, { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { useGlobalState } from './GlobalState';
import { velocityToDb } from '../functions/synth';

export const SoundPlayer: React.FC = () => {
    const { state, dispatch } = useGlobalState();

    
    useEffect(() => {
        if (state.playing) {
            state.channel.forEach((channel, index) => {
            const probability =  channel.sequence[state.activeStep].chance > (Math.random() * 100);
                if (channel.sequence[state.activeStep]?.armed && channel.player?.loaded && probability) {
                    const velocity = channel.sequence[state.activeStep]?.velocity - (((Math.random() * channel.sequence[state.activeStep]?.velocityRange) / 100) * channel.sequence[state.activeStep]?.velocity) 
                    const velocityVol = velocityToDb(velocity);
                    channel.player.volume.value = velocityVol;
                    channel.player.start();
                }
            });
        }
    }, [state.activeStep]);


    return null; // This component doesn't render anything
};
