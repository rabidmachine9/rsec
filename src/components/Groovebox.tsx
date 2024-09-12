import React, { useState, useEffect, FunctionComponent } from "react";
import { PlayButton } from "./ButtonPlay";
import { Screen } from "./Screen";
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
import LFOController from "./LFOController";
import OscillatorWithLFO from "./OscillatorWithLFO";

type GrooveProps = {};

export const Groovebox: FunctionComponent<GrooveProps> = ({}) => {
    const { state, dispatch } = useGlobalState();
    const [lfoFrequency, setLfoFrequency] = useState<number>(1);

    return (
        <div className="groovebox-container">
            <div className="screen-button-container">
                <SoundPlayer />
                <Screen selectedChannel={state.channel[state.selectedChannel]}></Screen>
                {/* <OscillatorWithLFO lfoFrequency={lfoFrequency} /> */}
                {/* <LFOController setLfoFrequency={setLfoFrequency} /> */}
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
