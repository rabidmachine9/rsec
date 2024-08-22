import React, { FunctionComponent, useState, useEffect } from 'react';
import { useGlobalState } from './GlobalState';

type ScreenProps = {
}

export const Screen: FunctionComponent<ScreenProps> = ({}) => {
    const { state, dispatch } = useGlobalState(); 

    const onChange = (e: any) => {
        handleUpdateVelocity(e)
    }

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
    return (
        <div className="screen">
            {"step: "+(Number(state.selectedSeqButton+1))} <br/>
            {"triggered: "+String(state.channel[state.selectedChannel].sequence[state.selectedSeqButton].armed)}<br/>
            <label>velocity</label>
            <input type="number" max="127" min="0" id="velocity" value={state.channel[state.selectedChannel].sequence[state.selectedSeqButton].velocity} onChange={onChange}></input>
        </div>
        
    )
};