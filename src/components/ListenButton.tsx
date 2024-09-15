import React, { FunctionComponent } from "react";
import MusicNote from "@mui/icons-material/MusicNote";
import { useGlobalState } from "./GlobalState";

type ButtonProps = {};

export const ListenButton: FunctionComponent<ButtonProps> = ({}) => {
    const { state, dispatch } = useGlobalState();

    const onClick = () => {
        const selectedChannel = state.channels[state.selectedChannelIndex];

        // Check if the selected channel is a SampleChannel (with a player)
        if ("player" in selectedChannel && selectedChannel.player) {
            selectedChannel.player.start();
        }
        // Check if the selected channel is a SynthChannel (with a synth)
        else if ("synth" in selectedChannel && selectedChannel.synth) {
            selectedChannel.synth.triggerAttackRelease("C4", "8n"); // Trigger a note for the synth
        }
    };

    return (
        <button className="moufa-button">
            <MusicNote onClick={(e) => onClick()} />
        </button>
    );
};
