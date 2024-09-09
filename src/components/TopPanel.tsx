import React, { FunctionComponent, useState, useEffect } from "react";
import { MidiDeviceSelector } from "./MidiDeviceSelector";
import { useGlobalState } from "./GlobalState";
import { MidiDevice } from "../functions/types";
import { bpmToMs } from "../functions/f";

type TopPanelProps = {};

export const TopPanel: FunctionComponent<TopPanelProps> = ({}) => {
    const { state, dispatch } = useGlobalState();

    const midiDeviceSelected = (device: MidiDevice | null) => {
        if (device) {
            state.midiDevice = device;
            // You can now use device.device to send or receive MIDI messages
        } else {
            console.log("No device selected");
        }
    };

    const handleUpdateBPM = (e: any) => {
        dispatch({ type: "SET_BPM", payload: e.target.value });
    };

    const handleUpdateMSInterval = () => {
        dispatch({ type: "SET_MSINTERVAL", payload: bpmToMs(state.bpm, 4) });
    };
    useEffect(() => {
        handleUpdateMSInterval();
    }, [state.bpm]);
    return (
        <div className="top-panel">
            <label htmlFor="bpm">bpm:</label>
            <input type="number" id="bpm" name="bpm" min="1" max="200" value={state.bpm} onChange={handleUpdateBPM}></input>
            <MidiDeviceSelector
                onDeviceSelected={midiDeviceSelected}
                deviceType="input" // or 'output'
                label="Choose your MIDI Input Device"
                className="custom-midi-selector"
            />
        </div>
    );
};
