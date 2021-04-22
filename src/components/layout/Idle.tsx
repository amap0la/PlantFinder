import React, { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';

import BasicLayout from './Basic';

function IdleLayout() {
    const history = useHistory();
    const cssClass = "idle";
    const title = "Want to try a new search?";

    const handleClick = (event: SyntheticEvent) => {
        history.push('/');
    }

    const button = {
        text: "Let's go!",
        handleClick: handleClick
    }

    
    return (
        <BasicLayout cssClass={cssClass} title={title} button={button}/>
    )
}

export default IdleLayout;