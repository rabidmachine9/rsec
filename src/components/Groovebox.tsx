import React, { useState, useEffect, FunctionComponent } from "react";
import { PlayButton } from "./ButtonPlay";
import { Screen } from "./Screen";
import { arrayRemove, bpmToMs } from "../functions/f";
import { PreviousButton } from "./ButtonPrevious";
import { NextButton } from "./ButtonNext";
import { StopButton } from "./ButtonStop";
import { ChannelSelect } from "./ChannelSelect";
import { useGlobalState } from "./GlobalState";
import { Sequencer } from "./sequencer";
import { SoundPlayer } from "./SoundPlayer";
import { FileList } from "./FileList";
import { ListenButton } from "./ListenButton";
import SaveButton from "./ButtonSave";

type GrooveProps = {};

export const Groovebox: FunctionComponent<GrooveProps> = ({}) => {
    const { state, dispatch } = useGlobalState();

    return (
        <div className="groovebox-container">
            <div className="screen-button-container">
                <SoundPlayer />
                <Screen selectedChannel={state.channel[state.selectedChannel]}></Screen>
                <div className="button-container">
                    <ListenButton></ListenButton>
                    <PlayButton></PlayButton>
                    <StopButton></StopButton>
                    <PreviousButton></PreviousButton>
                    <NextButton></NextButton>
                    <SaveButton></SaveButton>
                </div>
            </div>
            <ChannelSelect></ChannelSelect>
            <Sequencer></Sequencer>
            <FileList />
        </div>
    );
};
