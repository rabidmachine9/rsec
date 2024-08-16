import React, { FunctionComponent, useState, useEffect } from 'react';
import { useGlobalState } from './GlobalState';

type ScreenProps = {
}

export const Screen: FunctionComponent<ScreenProps> = ({}) => {
    const { state, dispatch } = useGlobalState(); 

    const onChange = (e: any) =>{
        handleUpdateVelocity(e)
    }

    const handleUpdateVelocity = (e:any) => {
        // Update the 'triggered' value
        dispatch({ 
            type: 'UPDATE_VELOCITY', 
            payload: { 
                step: Number(state.sequence[state.selectedSeqButton].step), 
                velocity: e.currentTarget.value,
            } 
        });
    }
    return (
        <div className="screen">
            {"step: "+(Number(state.sequence[state.selectedSeqButton].step)+1)} <br/>
            {"triggered: "+String(state.sequence[state.selectedSeqButton].armed)}<br/>
            <label>velocity</label>
            <input type="number" id="velocity" value={state.sequence[state.selectedSeqButton].velocity} onChange={onChange}></input>
        </div>
        
    )
};