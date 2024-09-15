import React, { FunctionComponent, useEffect } from "react";
import { useGlobalState, SampleChannel } from "./GlobalState";
import * as Tone from "tone";

interface ButtonProps {
    channel: SampleChannel;
    index: number;
}

export const ChannelButton: FunctionComponent<ButtonProps> = ({ channel, index }) => {
    const { state, dispatch } = useGlobalState();

    useEffect(() => {
        // Dispatch action to set the channel name on mount, but only for this channel
        dispatch({ type: "SET_CHANNEL_NAME", payload: { channelIndex: index, name: channel.name } });
    }, [channel.name, index, dispatch]);

    useEffect(() => {
        if (!channel.player) {
            const player = new Tone.Player({
                url: channel.soundFile,
                autostart: false,
            }).toDestination();

            const filePath = `/samples/${channel.name}/${channel.soundFile}`;
            player
                .load(filePath)
                .then(() => {
                    console.log(`Loaded sound file: ${filePath}`);
                })
                .catch((error) => {
                    console.error(`Failed to load sound file: ${filePath}`, error);
                });

            // Save the player instance in the global state
            dispatch({
                type: "SET_CHANNEL_PLAYER",
                payload: { channelIndex: index, player }, // Use index to correctly target this channel
            });
        }
    }, [channel.player, channel.soundFile, channel.name, index, dispatch]);

    // Handle channel selection on button click
    const handleClick = () => {
        dispatch({ type: "SET_CHANNEL", payload: index });
    };

    return (
        <button data-channel={index} onClick={handleClick} className={`moufa-button ${state.selectedChannelIndex === index ? "active-sound" : ""}`}>
            {channel.name}
        </button>
    );
};
