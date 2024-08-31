import React, { useEffect, useState } from 'react';
import { useGlobalState } from './GlobalState';

interface FilesStructure {
    [folder: string]: string[];
  }
  

export const FileList = () => {
    const [files, setFiles] = useState<FilesStructure>({});
    const { state, dispatch } = useGlobalState();

    useEffect(() => {
        // Fetch the files.json from the public folder
        fetch('/samples.json')
        .then((response) => response.json())
        .then((data: FilesStructure) => {
            setFiles(data);
        })
        .catch((error) => {
            console.error('Error fetching the files:', error);
        });
    }, []);
    
    const selectSound = (e: any, selectedChannel: number) => {
        
        dispatch({ type: 'SET_CHANNEL_FILE', payload: { channelIndex: selectedChannel , soundFile: e.currentTarget.textContent } });
    }

    return (
        <div>
        <div>Sounds</div>
            {Object.keys(files).map((folder) => {
            // If you want to filter by a specific folder, add an if statement here
            if (folder === state.channel[state.selectedChannel].name ) { // Replace 'BD' with your desired folder name
                return (
                    <ul>
                    {files[folder].map((file, index) => (
                        <li key={index} onClick={(e) => selectSound(e, state.selectedChannel)}>{file}</li>
                    ))}
                    </ul>
                );
            }

            // Return null or handle other folders accordingly if not 'BD'
            return null;
            })}
        </div>
    );
};

export default FileList;
