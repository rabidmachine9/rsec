import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useGlobalState } from "./GlobalState"; // Assuming you have this hook from your global state
import SaveIcon from "@mui/icons-material/Save";

const SaveButton = () => {
    const { state } = useGlobalState(); // Assuming you have this hook
    const [fileName, setFileName] = useState("appState");
    const [open, setOpen] = useState(false);

    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key: any, value: any) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return; // Circular reference found, discard key
                }
                seen.add(value);
            }
            // Remove player or other non-serializable objects
            if (key === "player" || value instanceof AudioContext) {
                return undefined;
            }
            return value;
        };
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveStateAsFile = () => {
        try {
            // Prepare the state to save, excluding the player
            const stateToSave = {
                ...state,
                channels: state.channel.map((channel) => ({
                    ...channel,
                    player: undefined, // Exclude player
                })),
            };

            const jsonState = JSON.stringify(stateToSave, getCircularReplacer(), 2);
            const blob = new Blob([jsonState], { type: "application/json" });
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `${fileName}.json`; // Use the dynamic file name
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            console.log(`State saved as ${fileName}.json`);
            handleClose(); // Close the dialog after saving
        } catch (error) {
            console.error("Error saving state:", error);
        }
    };

    return (
        <div>
            {/* Button to open the modal */}
            <button className="moufa-button" onClick={handleClickOpen}>
                <SaveIcon></SaveIcon>
            </button>

            {/* Modal dialog for file name input */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Save State</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter a file name to save the current application state.</DialogContentText>
                    <TextField autoFocus margin="dense" label="File Name" fullWidth value={fileName} onChange={(e) => setFileName(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveStateAsFile}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SaveButton;
