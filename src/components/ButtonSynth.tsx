import React, { FunctionComponent, useState, useEffect } from "react";
import { useGlobalState } from "./GlobalState";
import * as Tone from "tone";

type ButtonProps = {
    name: string;
    index: number;
};

export const SynthButton: FunctionComponent<ButtonProps> = ({ name, index }) => {
    const { state, dispatch } = useGlobalState();

    useEffect(() => {
        // Dispatch an action to update the channel name when the component mounts
        dispatch({ type: "SET_CHANNEL_NAME", payload: { channelIndex: index, name: name } });
    }, []);

    // useEffect(() => {
    //     if (!state.channel[state.selectedChannel].player) {
    //         const player = new Tone.Player({
    //             url: state.channel[state.selectedChannel].soundFile,
    //             autostart: false,
    //         }).toDestination();

    //         const filePath = "/samples/" + state.channel[state.selectedChannel].name + "/" + state.channel[state.selectedChannel].soundFile;
    //         player
    //             .load(filePath)
    //             .then(() => {
    //                 console.log(`Loaded sound file: ${filePath}`);
    //             })
    //             .catch((error) => {
    //                 console.error(`Failed to load sound file: ${filePath}`, error);
    //             });

    //         // Save the player instance in the global state
    //         dispatch({
    //             type: "SET_CHANNEL_PLAYER",
    //             payload: { channelIndex: state.selectedChannel, player },
    //         });
    //     }
    // }, [state.selectedChannel]);

    const [id] = useState(name);
    const handleClick = (e: any) => {
        dispatch({ type: "SET_CHANNEL", payload: Number(e.target.getAttribute("data-channel")) });
    };
    return (
        <button
            data-channel={index}
            onClick={(e) => handleClick(e)}
            className={`moufa-button ${state.selectedChannelIndex === index ? "active-sound " : ""} `}
        >
            {name}
        </button>
    );
};
