import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import * as Tone from "tone";

export const ToneEditor: React.FC = () => {
    const [code, setCode] = useState<string>(`
        // Write your Tone.js code here
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease(note, length);
    `);

    const runCode = (note: string, length: string) => {
        try {
            // Pass the additional parameters alongside 'Tone'
            const codeToRun = new Function("Tone", "note", "length", code);
            // Call the generated function, passing in the arguments
            codeToRun(Tone, note, length);
        } catch (error) {
            console.error("Error running Tone.js code:", error);
        }
    };

    return (
        <div>
            <h2>Tone.js Code Editor</h2>
            <CodeMirror
                value={code}
                height="200px"
                extensions={[javascript()]}
                onChange={(value: any) => {
                    setCode(value);
                }}
            />
            <button
                onClick={() => runCode("C4", "8n")} // Wrapped in an arrow function
                style={{ marginTop: "10px" }}
            >
                Run Tone.js Code
            </button>
        </div>
    );
};
