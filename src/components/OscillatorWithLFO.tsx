import React, { useEffect, useRef } from "react";
import * as Tone from "tone";

interface OscillatorWithLFOProps {
    lfoFrequency: number;
}

const OscillatorWithLFO: React.FC<OscillatorWithLFOProps> = ({ lfoFrequency }) => {
    const oscRef = useRef<Tone.Oscillator | null>(null);
    const lfoRef = useRef<Tone.LFO | null>(null);

    useEffect(() => {
        // Initialize oscillator and LFO
        const oscillator = new Tone.Oscillator({
            type: "sine",
            frequency: 440, // A4
        }).toDestination();

        const lfo = new Tone.LFO({
            type: "sine",
            frequency: lfoFrequency,
            min: 200, // LFO modulation range (for frequency)
            max: 800,
        });

        // Connect the LFO to the oscillator's frequency
        lfo.connect(oscillator.frequency);

        // Start oscillator and LFO
        oscillator.start();
        lfo.start();

        // Assign the oscillator and LFO to the refs
        oscRef.current = oscillator;
        lfoRef.current = lfo;

        // Cleanup on unmount
        return () => {
            oscillator.stop();
            lfo.stop();
        };
    }, [lfoFrequency]);

    return null; // No UI for this component
};

export default OscillatorWithLFO;
