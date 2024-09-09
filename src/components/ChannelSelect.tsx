import React, { FunctionComponent, MouseEventHandler, useState } from "react";
import { ChannelButton } from "./ButtonChannel";
import { useGlobalState } from "./GlobalState";

type ButtonProps = {};

export const ChannelSelect: FunctionComponent<ButtonProps> = ({}) => {
    const { state, dispatch } = useGlobalState();

    return (
        <div className="sound-select">
            {state.channel.map((channel, index) => (
                <ChannelButton text={channel.name} channel={index}></ChannelButton>
            ))}
        </div>
    );
};
