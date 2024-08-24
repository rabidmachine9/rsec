import React, { FunctionComponent, useState, useEffect } from 'react';
import { useGlobalState } from './GlobalState';

type ScreenProps = {
    selectedChannel: any
}

export const Screen: FunctionComponent<ScreenProps> = ({selectedChannel}) => {
    const { state, dispatch } = useGlobalState(); 

    const handleUpdateVelocity = (e:any) => {
        // Update the 'triggered' value
        dispatch({ 
            type: 'SET_CHANNEL_VELOCITY', 
            payload: { 
                channelIndex: state.selectedChannel,
                stepIndex: Number(state.selectedSeqButton), 
                velocity: Number(e.currentTarget.value),
            } 
        });
    }
    const handleUpdateMidiChannel = (e:any) => {
        // Update the 'triggered' value
        dispatch({ 
            type: 'SET_CHANNEL_MIDI', 
            payload: { 
                channelIndex: state.selectedChannel,
                midiChannel: Number(e.currentTarget.value),
            } 
        });
    }
    const handleChanceUpdate = (e:any) => {
        // Update the 'triggered' value
        dispatch({ 
            type: 'SET_STEP_CHANCE', 
            payload: { 
                channelIndex: state.selectedChannel,
                stepIndex: Number(state.selectedSeqButton), 
                chance: Number(e.currentTarget.value),
            } 
        });
    }
    return (
        <div className="screen">
            {"step: "+(Number(state.selectedSeqButton+1))} <br/>
            {"triggered: "+String(selectedChannel.sequence[state.selectedSeqButton].armed)}<br/>
            <label>velocity</label>
            <input type="number" max="127" min="0" id="velocity" value={selectedChannel.sequence[state.selectedSeqButton].velocity} onChange={handleUpdateVelocity}></input><br/>
            <label>Midi Channel</label>
            <input type="number" max="9" min="0" id="midiChannel" value={selectedChannel.midiChannel} onChange={handleUpdateMidiChannel}></input><br/>
            <label>Chance</label>
            <input style={{ width: '45px' }} type="number" max="100" min="1" id="chance" value={selectedChannel.sequence[state.selectedSeqButton].chance} onChange={handleChanceUpdate}></input>
            <span>%</span> 
        </div>
        
    )
};