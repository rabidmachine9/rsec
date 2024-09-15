import React, { FunctionComponent } from "react";
import { ChannelButton } from "./ButtonChannel";
import { useGlobalState } from "./GlobalState";
import { SynthButton } from "./ButtonSynth";

type ButtonProps = {};

export const ChannelSelect: FunctionComponent<ButtonProps> = ({}) => {
    const { state, dispatch } = useGlobalState();
    //console.log(state.channels);
    return (
        <div className="sound-select">
            {state.channels.map((channel, index) => (
                <ChannelButton channel={channel} index={index}></ChannelButton>
            ))}
        </div>
    );
};
