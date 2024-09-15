import React, { FunctionComponent, useEffect } from "react";
import { useGlobalState } from "./GlobalState";

type ButtonProps = {
    index: number;
    step: any;
};

export const SeqButton: FunctionComponent<ButtonProps> = ({ step, index }) => {
    const { state, dispatch } = useGlobalState();

    useEffect(() => {
        dispatch({
            type: "SET_STEP_VELOCITY",
            payload: {
                channelIndex: Number(state.selectedChannelIndex),
                stepIndex: state.selectedSeqButton,
                velocity: step.armed ? 120 : 0,
            },
        });
    }, [step.armed]);

    const handleUpdateSelected = (e: any) => {
        dispatch({ type: "SET_SELECTEDSEQBUTTON", payload: Number(e.target.getAttribute("data-column")) });
    };
    const handleUpdateTriggered = (e: any) => {
        // Update the 'triggered' value
        dispatch({
            type: "SET_STEP_ARMED",
            payload: {
                channelIndex: Number(state.selectedChannelIndex),
                stepIndex: Number(e.target.getAttribute("data-column")),
                armed: !step.armed,
            },
        });
    };

    function onClick(e: React.MouseEvent<HTMLButtonElement>, button: any) {
        const target = e.currentTarget;
        target.classList.toggle("armed");
        //var seq_buttons = document.querySelectorAll('.seq-button')
        document.querySelectorAll(".seq-button").forEach(function (el) {
            el.classList.remove("selected");
        });
        target.classList.add("selected");
        handleUpdateSelected(e);
        handleUpdateTriggered(e);
    }

    return (
        <button
            key={index}
            className={`seq-button ${state.selectedSeqButton === index ? "selected " : ""} ${step.armed ? "armed " : ""} ${
                state.activeStep === index ? "active " : ""
            }`}
            data-column={index}
            onClick={(e) => onClick(e, step)}
        ></button>
    );
};
