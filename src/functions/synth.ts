import * as Tone from 'tone';


const convertVelocityToDb = (velocity :number) => {
    const minDb = -35; // Minimum dB value (very quiet)
    const maxDb = 0;   // Maximum dB value (full volume)
    
    // Normalize velocity (1-127) to a value between 0 and 1
    const normalizedVelocity = velocity / 127;
    
    // Map normalized velocity to dB range
    return (normalizedVelocity * (maxDb - minDb)) + minDb;
};

// Function to play the kick drum
export const playKick = (velocity :number) => {
    const dbLevel = convertVelocityToDb(velocity); // Convert velocity to dB

    // Create a volume node with the calculated dB level
    const volumeNode = new Tone.Volume(dbLevel).toDestination();

    // Create a basic kick drum sound
    const kick = new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 10,
        oscillator: {
            type: 'sine',
        },
        envelope: {
            attack: 0.001,
            decay: 0.4,
            sustain: 0.01,
            release: 1.4,
            attackCurve: 'exponential',
        },
    }).connect(volumeNode); // Connect the synth to the volume node

    // Trigger the kick drum sound
    kick.triggerAttackRelease("C1", "8n");
};


export const playSnare = (velocity :number) => {
    const normalizedVolume = convertVelocityToDb(velocity); // Convert velocity to a volume in dB

    // Create a noise source for the snare
    const noise = new Tone.Noise("white").start();
    
    // Create a low-pass filter to shape the noise
    const noiseFilter = new Tone.Filter({
        frequency: 1500
    });

    // Create an amplitude envelope for the noise
    const noiseEnvelope = new Tone.AmplitudeEnvelope({
        attack: 0.001,
        decay: 0.2,
        sustain: 0,
        release: 0.02
    }).toDestination();

    // Connect the noise through the filter and to the envelope
    noise.chain(noiseFilter, noiseEnvelope);

    // Create a high-pitched oscillator to simulate the drumhead
    const osc = new Tone.Oscillator(100, "sine").start();
    
    // Create an amplitude envelope for the oscillator
    const oscEnvelope = new Tone.AmplitudeEnvelope({
        attack: 0.001,
        decay: 0.1,
        sustain: 0,
        release: 0.02
    }).toDestination();

    // Connect the oscillator to the envelope
    osc.connect(oscEnvelope);

    // Trigger the envelopes with the adjusted volume
    noiseEnvelope.triggerAttackRelease("8n", Tone.now(), normalizedVolume);
    oscEnvelope.triggerAttackRelease("8n", Tone.now(), normalizedVolume);
}
