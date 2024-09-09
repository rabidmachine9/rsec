import React, { FunctionComponent, MouseEventHandler } from "react";
import NextIcon from "@mui/icons-material/SkipNext";
import { useGlobalState } from "./GlobalState";

type ButtonProps = {};

export const NextButton: FunctionComponent<ButtonProps> = ({}) => {
    const { state, dispatch } = useGlobalState();

    const onClick = (e: any) => {
        dispatch({
            type: "SET_SELECTEDSEQBUTTON",
            payload: (state.selectedSeqButton + 1 + state.sequenceLength) % state.sequenceLength,
        });
    };
    return (
        <button className="moufa-button">
            <NextIcon onClick={(e) => onClick(e)} />
        </button>
    );
};
