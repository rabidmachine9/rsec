import React, { useEffect, useState } from "react";
import * as Tone from "tone";
import { SampleChannel, useGlobalState } from "./GlobalState";

interface FilesStructure {
    [folder: string]: string[];
}

interface FileListProps {
    currentChannel: SampleChannel; // Ensure this is a SampleChannel
}

const FileList: React.FC<FileListProps> = ({ currentChannel }) => {
    const [files, setFiles] = useState<FilesStructure>({});
    const { state, dispatch } = useGlobalState();

    useEffect(() => {
        // Fetch the files.json from the public folder
        fetch("/samples.json")
            .then((response) => response.json())
            .then((data: FilesStructure) => {
                setFiles(data);
            })
            .catch((error) => {
                console.error("Error fetching the files:", error);
            });
    }, []);

    useEffect(() => {
        const filePath = "/samples/" + currentChannel.name + "/" + currentChannel.soundFile;
        const player = new Tone.Player({
            url: filePath,
            autostart: false,
        }).toDestination();

        player
            .load(filePath)
            .then(() => {
                console.log(`Loaded sound file: ${filePath}`);
            })
            .catch((error) => {
                console.error(`Failed to load sound file: ${filePath}`, error);
            });

        dispatch({
            type: "SET_CHANNEL_PLAYER",
            payload: { channelIndex: state.selectedChannelIndex, player },
        });
    }, [currentChannel.soundFile]); // Dependencies

    const selectSound = (e: any, selectedChannel: number) => {
        dispatch({
            type: "SET_CHANNEL_FILE",
            payload: { channelIndex: selectedChannel, soundFile: e.currentTarget.textContent },
        });
    };

    return (
        <div className="files-section">
            <div className="files-title">Sounds</div>
            {Object.keys(files).map((folder) => {
                if (folder === currentChannel.name) {
                    return (
                        <ul className="file-list" key={folder}>
                            {files[folder].map((file, index) => (
                                <li
                                    key={index}
                                    onClick={(e) => selectSound(e, state.selectedChannelIndex)}
                                    className={`file-name ${currentChannel.soundFile === file ? "selected-sound" : ""}`}
                                >
                                    {file}
                                </li>
                            ))}
                        </ul>
                    );
                }
                return null;
            })}
        </div>
    );
};

export default FileList;
