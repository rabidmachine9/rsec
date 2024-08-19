import React, { FunctionComponent, MouseEventHandler, useState, useEffect } from 'react';
import { arrayRemove } from '../functions/f'
import { useGlobalState } from './GlobalState';

type ButtonProps = {
    index: number
}





export const SeqButton: FunctionComponent<ButtonProps> = ({index}) => {
    const { state, dispatch } = useGlobalState();

    useEffect(() => {

        dispatch({ 
            type: 'UPDATE_VELOCITY', 
            payload: { 
                step: state.selectedSeqButton, 
                velocity: state.sequence[state.selectedSeqButton].armed ? 120 : 0
            } 
        });
    }, [state.sequence[state.selectedSeqButton].armed])

    const handleUpdateSelected = (e:any) => {
        dispatch({ type: 'SET_SELECTEDSEQBUTTON', payload: Number(e.target.getAttribute('data-column')) });
    }  
    const handleUpdateTriggered = (e:any) => {
        // Update the 'triggered' value
        dispatch({ 
            type: 'UPDATE_ARMED', 
            payload: { 
                step: Number(e.target.getAttribute('data-column')), 
                armed: !state.sequence[state.selectedSeqButton].armed,
            } 
        });
    }  
    
    function onClick(e: React.MouseEvent<HTMLButtonElement>) {
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
            className={`seq-button ${state.selectedSeqButton === index ? 'selected ' : ''} ${state.sequence[index].armed ? 'armed ' : ''} ${state.activeStep === index ? 'active ' : ''}`}
            data-column={index}
            onClick={(e) => onClick(e)}
        >
        </button>
    );
};