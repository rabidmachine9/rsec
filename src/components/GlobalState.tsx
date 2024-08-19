import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

interface SequenceStep {
    step: number;
    velocity: number;
    armed: boolean;
}


interface ChannelSequence {
    sequence: Array<SequenceStep>
}
// Define the type for the global state
type State = {
    bpm: number,
    msInterval: number,
    sequence: Array<SequenceStep>,
    //channel: Array<ChannelSequence>,
    playing: boolean,
    selectedSeqButton: number,
    activeStep: number,
    selectedChannel: number
};

const defaultSequence = [];

for (let i = 0; i < 16; i++) {
    defaultSequence.push({
        step: i,
        velocity: 0,
        armed: false
    });
}

// Define the type for actions
type Action =
    | { type: 'SET_BPM'; payload: number }
    | { type: 'SET_MSINTERVAL'; payload: number }
    | { type: 'SET_SELECTEDSEQBUTTON'; payload: number }
    | { type: 'SET_SEQUENCE'; payload:Array<SequenceStep> }
    | { type: 'SET_PLAYING'; payload: boolean }
    | { type: 'UPDATE_VELOCITY'; payload: { step: number; velocity: number } }
    | { type: 'UPDATE_ARMED'; payload: { step: number; armed: boolean } }
    | { type: 'UPDATE_ACTIVE'; payload: number  }
    | { type: 'SET_CHANNEL'; payload: number  }
    ;

// Create the initial state
const initialState: State = {
    bpm: 120,
    msInterval: 600.0/120.0,
    selectedSeqButton:0,
    sequence: defaultSequence,
    playing: false,
    activeStep: -1,
    selectedChannel: 0
};

// Create the reducer function
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_BPM':
            return { ...state, bpm: action.payload };
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
        default:
            return state;
    }
};

// Create context
const GlobalStateContext = createContext<{ state: State; dispatch: Dispatch<Action> } | undefined>(undefined);

// Create a provider component
const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

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
