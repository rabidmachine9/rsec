import React, { useEffect } from 'react';
import * as Tone from 'tone';
import { useGlobalState } from './GlobalState';

export const SoundPlayer: React.FC = () => {
    const { state } = useGlobalState();
    useEffect(() => {
        const synth = new Tone.Synth().toDestination();
        if(state.playing && state.channel[0].sequence[state.activeStep].armed){
            // Trigger a sound whenever currentStep changes
            synth.triggerAttackRelease("C4", "8n");
        }
        

        // Cleanup: Dispose the synth when the component unmounts
        return () => {
            synth.dispose();
        };
    }, [state.activeStep]);

    return null; // This component doesn't render anything
};
