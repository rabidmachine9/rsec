import React, { useEffect, useState } from 'react';
import { useGlobalState } from './GlobalState';
import * as Tone from 'tone';

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
    
    useEffect(() => {
        const player = new Tone.Player({
            url: state.channel[state.selectedChannel].soundFile,
            autostart: false
        }).toDestination();
        const filePath = '/samples/'+ state.channel[state.selectedChannel].name +'/'+ state.channel[state.selectedChannel].soundFile;
        player.load(filePath).then(() => {
            console.log(`Loaded sound file: ${filePath}`);
        }).catch(error => {
            console.error(`Failed to load sound file: ${filePath}`, error);
        });

        // Save the player instance in the global state
        dispatch({
            type: 'SET_CHANNEL_PLAYER',
            payload: { channelIndex: state.selectedChannel, player },
        });
    },[state.channel[state.selectedChannel].soundFile])

    const selectSound = (e: any, selectedChannel: number) => {
        console.log('sound selected')
        dispatch({ type: 'SET_CHANNEL_FILE', payload: { channelIndex: selectedChannel , soundFile: e.currentTarget.textContent } });
    }

    return (
        <div className='files-section'>
            <div className="files-title">Sounds</div>
            {Object.keys(files).map((folder) => {
            // If you want to filter by a specific folder, add an if statement here
            if (folder === state.channel[state.selectedChannel].name ) { // Replace 'BD' with your desired folder name
                return (
                    <ul className="fil-list">
                    {files[folder].map((file, index) => (
                        <li key={index} onClick={(e) => selectSound(e, state.selectedChannel)} className={`file-name ${state.channel[state.selectedChannel].soundFile === file ? 'selected-sound ' : ''} `} >
                            {file}
                        </li>
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
