import React, { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { useGlobalState } from './GlobalState';
import { velocityToDb } from '../functions/synth';

export const SoundPlayer: React.FC = () => {
    const { state, dispatch } = useGlobalState();

    function calculateVelocity(velocity: number, velocityRange: number) {
        return velocity - (((Math.random() * velocityRange) / 100) * velocity) 
    }

    function probabilityResult(chance: number) {
        return chance > (Math.random() * 100)
    }
    
    useEffect(() => {
        if (state.playing) {
            state.channel.forEach((channel, index) => {
            const armed = channel.sequence[state.activeStep]?.armed;
            const probability =  probabilityResult(channel.sequence[state.activeStep].chance);
                if (armed && channel.player?.loaded && probability) {
                    const velocity = calculateVelocity(channel.sequence[state.activeStep].velocity, channel.sequence[state.activeStep].velocityRange)
                    const velocityVol = velocityToDb(velocity);
                    channel.player.volume.value = velocityVol;
                    channel.player.start();
                }
            });
        }
    }, [state.activeStep]);


    return null; // This component doesn't render anything
};
