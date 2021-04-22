import React, { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';

import BasicLayout from './Basic';

function NotFoundLayout() {
    const history = useHistory();
    const cssClass = "not-found";
    const title = "You seem lost...";

    const handleClick = (event: SyntheticEvent) => {
        history.push('/');
    }

    const button = {
        text: "Go back home!",
        handleClick: handleClick
    }

    
    return (
        <BasicLayout cssClass={cssClass} title={title} button={button}/>
    )
}

export default NotFoundLayout;