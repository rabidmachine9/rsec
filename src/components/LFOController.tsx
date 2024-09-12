import React, { useState } from "react";

interface LFOControllerProps {
    setLfoFrequency: (frequency: number) => void;
}

const LFOController: React.FC<LFOControllerProps> = ({ setLfoFrequency }) => {
    const [frequency, setFrequency] = useState<number>(1); // Set initial frequency to 1 Hz

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        setFrequency(value);
        setLfoFrequency(value); // Pass the new frequency to parent component
    };

    return (
        <div>
            <input type="range" min="0.1" max="10" step="0.1" value={frequency} onChange={handleSliderChange} />
            <p>LFO Frequency: {frequency} Hz</p>
        </div>
    );
};

export default LFOController;
