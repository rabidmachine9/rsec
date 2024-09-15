import React, { FunctionComponent } from "react";
import { SeqButton } from "./ButtonSeq";
import { useGlobalState } from "./GlobalState";

type SeqProps = {};

export const Sequencer: FunctionComponent<SeqProps> = ({}) => {
    const { state, dispatch } = useGlobalState();

    return (
        <div className="sequencer" id="grid">
            {state.channels[state.selectedChannelIndex].sequence.map((step, index) => {
                return <SeqButton key={index} index={index} step={step}></SeqButton>;
            })}
        </div>
    );
};
