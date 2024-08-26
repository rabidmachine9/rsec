import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';
import { MidiDevice } from '../functions/types';
import { bpmToMs } from '../functions/f';

interface SequenceStep {
    step: number;
    velocity: number;
    armed: boolean;
    chance: number;
}


interface Channel {
    sequence: Array<SequenceStep>;
    midiChannel: number;
}

// interface ChannelSequence {
//     sequence: Array<SequenceStep>
// }
// Define the type for the global state
type State = {
    bpm: number,
    msInterval: number,
    sequence: Array<SequenceStep>,
    channel: Array<Channel>,
    playing: boolean,
    selectedSeqButton: number,
    activeStep: number,
    selectedChannel: number,
    midiDevice?: MidiDevice
};

const defaultSequence = [];

for (let i = 0; i < 16; i++) {
    defaultSequence.push({
        step: i,
        velocity: 0,
        armed: false,
        chance: 100
    });
}



// Define the type for actions
type Action =
    | { type: 'SET_BPM'; payload: number }
    | { type: 'SET_MIDI_DEVICE'; payload: MidiDevice }
    | { type: 'SET_MSINTERVAL'; payload: number }
    | { type: 'SET_SELECTEDSEQBUTTON'; payload: number }
    | { type: 'SET_SEQUENCE'; payload:Array<SequenceStep> }
    | { type: 'SET_PLAYING'; payload: boolean }
    | { type: 'UPDATE_VELOCITY'; payload: { step: number; velocity: number } }
    | { type: 'UPDATE_ARMED'; payload: { step: number; armed: boolean } }
    | { type: 'UPDATE_ACTIVE'; payload: number  }
    | { type: 'SET_CHANNEL'; payload: number  }
    | { type: 'SET_CHANNEL_ARMED'; payload: { channelIndex: number; stepIndex: number; armed: boolean }  }
    | { type: 'SET_STEP_CHANCE'; payload: { channelIndex: number; stepIndex: number; chance: number }  }
    | { type: 'SET_CHANNEL_VELOCITY'; payload: { channelIndex: number; stepIndex: number; velocity: number }  }
    | { type: 'SET_CHANNEL_MIDI'; payload: { channelIndex: number; midiChannel: number }  }
    ;

// Create the initial state
const initialState: State = {
    bpm: 120,
    msInterval: bpmToMs(120, 4),
    selectedSeqButton:0,
    sequence: defaultSequence,
    channel: Array(7).fill({sequence: defaultSequence, midiChannel: -1}),
    playing: false,
    activeStep: -1,
    selectedChannel: 0
};


// Create the reducer function
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_BPM':
            return { ...state, bpm: action.payload };
        case 'SET_MIDI_DEVICE':
            return { ...state, midiDevice: action.payload };
        case 'UPDATE_ACTIVE':
            return { ...state, activeStep: action.payload };
        case 'SET_MSINTERVAL':
            return { ...state, msInterval: action.payload };
        case 'SET_SEQUENCE':
            return { ...state, sequence: action.payload}
        case 'SET_PLAYING':
            return { ...state, playing: action.payload}
        case 'SET_SELECTEDSEQBUTTON':
            return { ...state, selectedSeqButton: action.payload}
        case 'SET_CHANNEL':
            return { ...state, selectedChannel: action.payload}
        case 'UPDATE_ARMED':
            return {
                ...state,
                sequence: state.sequence.map((item) =>
                    item.step === action.payload.step
                        ? { ...item, armed: action.payload.armed }
                        : item
                ),
        };
        case 'UPDATE_VELOCITY':
            return {
                ...state,
                sequence: state.sequence.map((item) =>
                    item.step === action.payload.step
                        ? { ...item, velocity: action.payload.velocity }
                        : item
                ),
        };
        case 'SET_CHANNEL_ARMED': {
            const { channelIndex, stepIndex, armed } = action.payload;

            // Update the specific sequence step's armed property in the selected channel
            const updatedChannel = state.channel.map((channel, chIndex) => {
                if (chIndex === channelIndex) {
                    // Update the specific step in the channel
                    const updatedSequence = channel.sequence.map((step, stIndex) =>
                        stIndex === stepIndex ? { ...step, armed } : step
                    );
                    return { ...channel, sequence: updatedSequence };
                }
                return channel;
            });

            return {
                ...state,
                channel: updatedChannel,
            };
        }
        case 'SET_CHANNEL_VELOCITY': {
            const { channelIndex, stepIndex, velocity } = action.payload;

            // Create a new channel array with the updated armed value
            const updatedChannel = state.channel.map((channel, chIndex) => {
                if (chIndex === channelIndex) {
                    // Update the specific step in the channel
                    const updatedSequence = channel.sequence.map((step, stIndex) =>
                        stIndex === stepIndex ? { ...step, velocity } : step
                    );
                    return { ...channel, sequence: updatedSequence };
                }
                return channel;
            });

            return {
                ...state,
                channel: updatedChannel,
            };
        };
        case 'SET_STEP_CHANCE': {
            const { channelIndex, stepIndex, chance } = action.payload;

            // Create a new channel array with the updated armed value
            const updatedChannel = state.channel.map((channel, chIndex) => {
                if (chIndex === channelIndex) {
                    // Update the specific step in the channel
                    const updatedSequence = channel.sequence.map((step, stIndex) =>
                        stIndex === stepIndex ? { ...step, chance } : step
                    );
                    return { ...channel, sequence: updatedSequence };
                }
                return channel;
            });

            return {
                ...state,
                channel: updatedChannel,
            };
        };
        case 'SET_CHANNEL_MIDI': {
            const { channelIndex, midiChannel } = action.payload;

            // Create a new channel array with the updated armed value
            const updatedChannel = state.channel.map((channel, chIndex) => {
                if (chIndex === channelIndex) {
                    // Update the specific step in the channel
                    
                    return { ...channel, midiChannel: midiChannel };
                }
                return channel;
            });

            return {
                ...state,
                channel: updatedChannel,
            };
        };
        default:
            return state;
    }
};

// Create context
const GlobalStateContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined);

// Create a provider component
const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log("MS", state.msInterval)
    return (
        <GlobalStateContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

// Custom hook to use the global state
const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
};

export { GlobalStateProvider, useGlobalState };
