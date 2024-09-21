import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import * as Tone from "tone";

export const ToneEditor: React.FC = () => {
    const [code, setCode] = useState<string>(`
        // Write your Tone.js code here
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease("C4", "8n");
    `);

    const runCode = () => {
        try {
            const codeToRun = new Function("Tone", code);
            codeToRun(Tone);
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
            <button onClick={runCode} style={{ marginTop: "10px" }}>
                Run Tone.js Code
            </button>
        </div>
    );
};
