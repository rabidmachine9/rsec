import React, { createContext, useContext, useReducer, ReactNode, Dispatch, useEffect } from "react";
import { MidiDevice } from "../functions/types";
import { bpmToMs } from "../functions/f";
import * as Tone from "tone";

interface SequenceStep {
    step: number;
    velocity: number;
    velocityRange: number;
    armed: boolean;
    chance: number;
    note: string;
}

interface BaseChannel {
    sequence: Array<SequenceStep>;
    midiChannel: number;
    name: string;
}

export interface SampleChannel extends BaseChannel {
    soundFile?: string;
    player?: Tone.Player;
}

export interface SynthChannel extends BaseChannel {
    oscillatorType?: "sine" | "square" | "triangle" | "sawtooth";
    synth?: Tone.Synth;
}

export type Channel = SampleChannel | SynthChannel;

// Define the type for the global state
type State = {
    bpm: number;
    msInterval: number;
    sequenceLength: number;
    channels: Array<Channel>;
    playing: boolean;
    selectedSeqButton: number;
    activeStep: number;
    selectedChannelIndex: number;
    midiDevice?: MidiDevice;
    soundFiles: { [key: string]: string[] };
    synthChannelsLength: number;
};

const defaultSequence: SequenceStep[] = Array.from({ length: 16 }, (_, i) => ({
    step: i,
    velocity: 0,
    velocityRange: 0,
    armed: false,
    chance: 100,
    note: "C4",
}));

// Define the type for actions
type Action =
    | { type: "SET_BPM"; payload: number }
    | { type: "SET_MIDI_DEVICE"; payload: MidiDevice }
    | { type: "SET_MSINTERVAL"; payload: number }
    | { type: "SET_SELECTEDSEQBUTTON"; payload: number }
    | { type: "SET_SEQUENCE"; payload: Array<SequenceStep> }
    | { type: "SET_PLAYING"; payload: boolean }
    | { type: "UPDATE_ACTIVE"; payload: number }
    | { type: "SET_CHANNEL"; payload: number }
    | { type: "SET_STEP_ARMED"; payload: { channelIndex: number; stepIndex: number; armed: boolean } }
    | { type: "SET_STEP_CHANCE"; payload: { channelIndex: number; stepIndex: number; chance: number } }
    | { type: "SET_STEP_VELOCITY"; payload: { channelIndex: number; stepIndex: number; velocity: number } }
    | { type: "SET_STEP_VELOCITY_RANGE"; payload: { channelIndex: number; stepIndex: number; velocityRange: number } }
    | { type: "SET_CHANNEL_MIDI"; payload: { channelIndex: number; midiChannel: number } }
    | { type: "SET_CHANNEL_NAME"; payload: { channelIndex: number; name: string } }
    | { type: "SET_CHANNEL_FILE"; payload: { channelIndex: number; soundFile: string } }
    | { type: "SET_CHANNELS"; payload: Array<Channel> }
    | { type: "SET_SOUND_FILES"; payload: { [key: string]: string[] } }
    | { type: "SET_CHANNEL_PLAYER"; payload: { channelIndex: number; player: Tone.Player } };

// Create the initial state
const initialState: State = {
    bpm: 120,
    msInterval: bpmToMs(120, 4),
    selectedSeqButton: 0,
    sequenceLength: 16,
    channels: Array(7)
        .fill(null)
        .map(() => ({
            sequence: defaultSequence,
            midiChannel: -1,
            soundFile: "",
            name: "",
            oscillatorType: "sine",
        })),

    playing: false,
    activeStep: -1,
    selectedChannelIndex: 0,
    soundFiles: {},
    synthChannelsLength: 1,
};

// Create the reducer function
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_BPM":
            return { ...state, bpm: action.payload };
        case "SET_MIDI_DEVICE":
            return { ...state, midiDevice: action.payload };
        case "UPDATE_ACTIVE":
            return { ...state, activeStep: action.payload };
        case "SET_MSINTERVAL":
            return { ...state, msInterval: action.payload };
        case "SET_PLAYING":
            return { ...state, playing: action.payload };
        case "SET_SELECTEDSEQBUTTON":
            return { ...state, selectedSeqButton: action.payload };
        case "SET_CHANNEL":
            return { ...state, selectedChannelIndex: action.payload };
        case "SET_STEP_ARMED": {
            const { channelIndex, stepIndex, armed } = action.payload;

            const updatedChannel = state.channels.map((channel, chIndex) => {
                if (chIndex === channelIndex) {
                    const updatedSequence = channel.sequence.map((step, stIndex) => (stIndex === stepIndex ? { ...step, armed } : step));
                    return { ...channel, sequence: updatedSequence };
                }
                return channel;
            });

            return { ...state, channels: updatedChannel };
        }
        case "SET_STEP_VELOCITY": {
            const { channelIndex, stepIndex, velocity } = action.payload;

            const updatedChannel = state.channels.map((channel, chIndex) => {
                if (chIndex === channelIndex) {
                    const updatedSequence = channel.sequence.map((step, stIndex) => (stIndex === stepIndex ? { ...step, velocity } : step));
                    return { ...channel, sequence: updatedSequence };
                }
                return channel;
            });

            return { ...state, channels: updatedChannel };
        }
        case "SET_STEP_VELOCITY_RANGE": {
            const { channelIndex, stepIndex, velocityRange } = action.payload;

            const updatedChannel = state.channels.map((channel, chIndex) => {
                if (chIndex === channelIndex) {
                    const updatedSequence = channel.sequence.map((step, stIndex) => (stIndex === stepIndex ? { ...step, velocityRange } : step));
                    return { ...channel, sequence: updatedSequence };
                }
                return channel;
            });

            return { ...state, channels: updatedChannel };
        }
        case "SET_STEP_CHANCE": {
            const { channelIndex, stepIndex, chance } = action.payload;

            const updatedChannel = state.channels.map((channel, chIndex) => {
                if (chIndex === channelIndex) {
                    const updatedSequence = channel.sequence.map((step, stIndex) => (stIndex === stepIndex ? { ...step, chance } : step));
                    return { ...channel, sequence: updatedSequence };
                }
                return channel;
            });

            return { ...state, channels: updatedChannel };
        }
        case "SET_CHANNEL_MIDI": {
            const { channelIndex, midiChannel } = action.payload;

            const updatedChannel = state.channels.map((channel, chIndex) => {
                if (chIndex === channelIndex) {
                    return { ...channel, midiChannel };
                }
                return channel;
            });

            return { ...state, channels: updatedChannel };
        }
        case "SET_CHANNEL_NAME": {
            const { channelIndex, name } = action.payload;

            const updatedChannel = state.channels.map((channel, chIndex) => {
                if (chIndex === channelIndex) {
                    return { ...channel, name };
                }
                return channel;
            });

            return { ...state, channels: updatedChannel };
        }
        case "SET_CHANNEL_FILE": {
            const { channelIndex, soundFile } = action.payload;

            const updatedChannel = state.channels.map((channel, chIndex) => {
                if (chIndex === channelIndex) {
                    return { ...channel, soundFile };
                }
                return channel;
            });

            return { ...state, channels: updatedChannel };
        }
        // Inside your reducer
        case "SET_CHANNEL_PLAYER": {
            const { channelIndex, player } = action.payload;
            const updatedChannel = state.channels.map((channel, index) => (index === channelIndex ? { ...channel, player } : channel));
            return { ...state, channels: updatedChannel };
        }
        case "SET_CHANNELS":
            return { ...state, channels: action.payload };
        case "SET_SOUND_FILES":
            return { ...state, soundFiles: action.payload };
        default:
            return state;
    }
};

// Create context
const GlobalStateContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined);

// Create a provider component
const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetch("/samples.json")
            .then((response) => response.json())
            .then((data) => {
                dispatch({ type: "SET_SOUND_FILES", payload: data });
                const channelNames = Object.keys(data);
                // console.log("data");
                // console.log(data);
                dispatch({
                    type: "SET_CHANNELS",
                    payload: channelNames.map((name) => ({
                        sequence: defaultSequence,
                        midiChannel: -1,
                        name: name,
                        soundFile: data[name][0], // Ensures soundFile exists
                    })), // Explicitly cast the result as SampleChannel[]
                });
            });
    }, []);

    return <GlobalStateContext.Provider value={{ state, dispatch }}>{children}</GlobalStateContext.Provider>;
};

// Custom hook to use the global state
const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error("useGlobalState must be used within a GlobalStateProvider");
    }
    return context;
};

export { GlobalStateProvider, useGlobalState };
