import React, { useState, useEffect } from "react";
import { MidiDevice } from "../functions/types";

type MidiDeviceSelectorProps = {
    onDeviceSelected?: (device: MidiDevice | null) => void;
    deviceType?: "input" | "output"; // Choose whether to list input or output devices
    label?: string; // Optional label for the dropdown
    className?: string; // Optional CSS class for styling
};

export const MidiDeviceSelector: React.FC<MidiDeviceSelectorProps> = ({
    onDeviceSelected,
    deviceType = "input",
    label = "Select MIDI Device",
    className,
}) => {
    const [devices, setDevices] = useState<MidiDevice[]>([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (!navigator.requestMIDIAccess) {
            setError("Web MIDI API is not supported in this browser.");
            return;
        }

        navigator
            .requestMIDIAccess()
            .then((access) => {
                updateDeviceList(access);

                // Listen for changes in device connections
                access.onstatechange = () => updateDeviceList(access);
            })
            .catch(() => {
                setError("Could not access MIDI devices. Permission denied.");
            });
    }, [deviceType]);

    const updateDeviceList = (access: WebMidi.MIDIAccess) => {
        const inputs = Array.from(access.inputs.values());
        const outputs = Array.from(access.outputs.values());

        const devicesList = (deviceType === "input" ? inputs : outputs).map((device) => ({
            id: device.id,
            name: device.name || "Unnamed Device",
            type: deviceType,
            device,
        }));

        setDevices(devicesList);
    };

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const deviceId = event.target.value;
        setSelectedDeviceId(deviceId);

        const selectedDevice = devices.find((device) => device.id === deviceId) || null;
        if (onDeviceSelected) {
            onDeviceSelected(selectedDevice);
        }
    };

    return (
        <div className={className}>
            {error ? (
                <div className="midi-error">{error}</div>
            ) : (
                <div className="midi-device-selector">
                    <label htmlFor="midi-device-selector">{label}:</label>
                    <select id="midi-device-selector" value={selectedDeviceId} onChange={handleChange} disabled={devices.length === 0}>
                        <option value="" disabled>
                            {devices.length === 0 ? "No devices available" : "Select a device"}
                        </option>
                        {devices.map((device) => (
                            <option key={device.id} value={device.id}>
                                {device.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default MidiDeviceSelector;
