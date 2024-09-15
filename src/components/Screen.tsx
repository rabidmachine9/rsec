import React, { FunctionComponent } from "react";
import { useGlobalState } from "./GlobalState";

type ScreenProps = {
    selectedChannel: any;
};

export const Screen: FunctionComponent<ScreenProps> = ({ selectedChannel }) => {
    const { state, dispatch } = useGlobalState();

    const handleUpdateVelocity = (e: any) => {
        // Update the 'triggered' value
        dispatch({
            type: "SET_STEP_VELOCITY",
            payload: {
                channelIndex: state.selectedChannelIndex,
                stepIndex: Number(state.selectedSeqButton),
                velocity: Number(e.currentTarget.value),
            },
        });
    };
    const handleUpdateVelocityRange = (e: any) => {
        // Update the 'triggered' value
        dispatch({
            type: "SET_STEP_VELOCITY_RANGE",
            payload: {
                channelIndex: state.selectedChannelIndex,
                stepIndex: Number(state.selectedSeqButton),
                velocityRange: Number(e.currentTarget.value),
            },
        });
    };
    const handleUpdateMidiChannel = (e: any) => {
        // Update the 'triggered' value
        dispatch({
            type: "SET_CHANNEL_MIDI",
            payload: {
                channelIndex: state.selectedChannelIndex,
                midiChannel: Number(e.currentTarget.value),
            },
        });
    };
    const handleChanceUpdate = (e: any) => {
        // Update the 'triggered' value
        dispatch({
            type: "SET_STEP_CHANCE",
            payload: {
                channelIndex: state.selectedChannelIndex,
                stepIndex: Number(state.selectedSeqButton),
                chance: Number(e.currentTarget.value),
            },
        });
    };
    return (
        <div className="screen">
            {"step: " + Number(state.selectedSeqButton + 1)} <br />
            {"triggered: " + String(selectedChannel.sequence[state.selectedSeqButton].armed)}
            <br />
            <label>velocity</label>
            <input
                type="number"
                max="127"
                min="0"
                id="velocity"
                value={selectedChannel.sequence[state.selectedSeqButton].velocity}
                onChange={handleUpdateVelocity}
            ></input>
            <br />
            <label>velocity range</label>
            <input
                type="number"
                max="100"
                min="0"
                id="velocity_range"
                value={selectedChannel.sequence[state.selectedSeqButton].velocityRange}
                onChange={handleUpdateVelocityRange}
            ></input>
            <br />
            <label>Midi Channel</label>
            <input type="number" max="9" min="0" id="midiChannel" value={selectedChannel.midiChannel} onChange={handleUpdateMidiChannel}></input>
            <br />
            <label>Chance</label>
            <input
                style={{ width: "45px" }}
                type="number"
                max="100"
                min="1"
                id="chance"
                value={selectedChannel.sequence[state.selectedSeqButton].chance}
                onChange={handleChanceUpdate}
            ></input>
            <span>%</span> <br />
            {/* <label>Sound:</label> {state.channel[state.selectedChannel].soundFile} */}
        </div>
    );
};
