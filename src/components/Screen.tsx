import React, { FunctionComponent } from 'react';

type ScreenProps = {
    text?: string,
}

export const Screen: FunctionComponent<ScreenProps> = ({text}) => {
    return (
        <div className="screen">
            hello
        </div>
        
    )
};