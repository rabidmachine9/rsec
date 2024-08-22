import React, { FunctionComponent, MouseEventHandler, useState, useEffect } from 'react';
import { arrayRemove } from '../functions/f'
import { useGlobalState } from './GlobalState';

type ButtonProps = {
    index: number,
    button: any
}





export const SeqButton: FunctionComponent<ButtonProps> = ({button,index}) => {
    const { state, dispatch } = useGlobalState();

    useEffect(() => {

        dispatch({ 
            type: 'SET_CHANNEL_VELOCITY', 
            payload: {
                channelIndex: Number(state.selectedChannel),
                stepIndex: state.selectedSeqButton, 
                velocity: button.armed ? 120 : 0
            } 
        });
    }, [button.armed])

    const handleUpdateSelected = (e:any) => {
        dispatch({ type: 'SET_SELECTEDSEQBUTTON', payload: Number(e.target.getAttribute('data-column')) });
    }  
    const handleUpdateTriggered = (e:any) => {
        // Update the 'triggered' value
        dispatch({ 
            type: 'SET_CHANNEL_ARMED', 
            payload: { 
                channelIndex: Number(state.selectedChannel),
                stepIndex: Number(e.target.getAttribute('data-column')), 
                armed: !button.armed,
            } 
        });
    }  
    
    function onClick(e: React.MouseEvent<HTMLButtonElement>, button: any) {
        console.log("click")
        const target = e.currentTarget;
        target.classList.toggle('armed')
        //var seq_buttons = document.querySelectorAll('.seq-button')
        document.querySelectorAll('.seq-button').forEach(function(el){
            el.classList.remove("selected")
        })
        target.classList.add('selected')
        handleUpdateSelected(e)
        handleUpdateTriggered(e)
    }

    return (
        <button
            key={index}
            className={`seq-button ${state.selectedSeqButton === index ? 'selected ' : ''} ${button.armed ? 'armed ' : ''} ${state.activeStep === index ? 'active ' : ''}`}
            data-column={index}
            onClick={(e) => onClick(e, button)}
        >
        </button>
    );
};