import React, { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { useGlobalState } from './GlobalState';

export const SoundPlayer: React.FC = () => {
    const { state, dispatch } = useGlobalState();

    
    // useEffect(() => {
    //     state.channel.forEach((channel, index) => {
    //         console.log(channel)
    //         if (!channel.player) {
    //             const player = new Tone.Player(channel.soundFile).toDestination();
    //             const filePath = 'samples/'+channel.name+"/"+channel.soundFile;
    //             console.log(filePath)
    //             // Load the sound file
    //             player.load(filePath).then(() => {
    //                 console.log(`Loaded sound file: ${channel.soundFile}`);
    //             }).catch(error => {
    //                 console.error(`Failed to load sound file: ${channel.soundFile}`, error);
    //             });
    
    //             // Save the player instance in the global state
    //             dispatch({
    //                 type: 'SET_CHANNEL_PLAYER',
    //                 payload: { channelIndex: index, player },
    //             });
    //         }
    //     });
    // }, []);

    useEffect(() => {
        if (state.playing) {
            state.channel.forEach((channel, index) => {
                if (channel.sequence[state.activeStep]?.armed && channel.player?.loaded) {
                    channel.player.start();
                }
            });
        }
    }, [state.activeStep]);

    // useEffect(() => {
    //     if (state.playing) {
    //         state.channel.forEach((channel, index) => {
    //             if (channel.sequence[state.activeStep].armed) {
    //                 // Dynamically call the correct sound function based on the channel index
    //                 if (index === 0) playKick(channel.sequence[state.activeStep].velocity);
    //                 if (index === 1) playSnare(channel.sequence[state.activeStep].velocity);
    //                 // Add more conditions for additional channels
    //             }
    //         });
    //     }
            
    // }, [state.activeStep]);

    return null; // This component doesn't render anything
};
