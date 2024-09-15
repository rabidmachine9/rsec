import React, { useEffect } from "react";
import { useGlobalState, Channel, SampleChannel, SynthChannel } from "./GlobalState";
import { velocityToDb } from "../functions/synth";
import * as Tone from "tone";

export const SoundPlayer: React.FC = () => {
    const { state, dispatch } = useGlobalState();

    function calculateVelocity(velocity: number, velocityRange: number) {
        return velocity - ((Math.random() * velocityRange) / 100) * velocity;
    }

    function probabilityResult(chance: number) {
        return chance > Math.random() * 100;
    }

    useEffect(() => {
        if (state.playing) {
            state.channels.forEach((channel, index) => {
                const armed = channel.sequence[state.activeStep]?.armed;
                const probability = probabilityResult(channel.sequence[state.activeStep].chance);
                if (armed && probability) {
                    const velocity = calculateVelocity(channel.sequence[state.activeStep].velocity, channel.sequence[state.activeStep].velocityRange);
                    if ("player" in channel && channel.player?.loaded) {
                        const velocityVol = velocityToDb(velocity);
                        channel.player.volume.value = velocityVol;
                        channel.player.start();
                    } else if ("synth" in channel && channel.synth) {
                        channel.synth.triggerAttackRelease(channel.sequence[state.activeStep].note, "8n", undefined, velocity / 127);
                    }
                }
            });
        }
    }, [state.activeStep]);

    return null; // This component doesn't render anything
};
