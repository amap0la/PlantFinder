import React, { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';

import BasicLayout from './Basic';

function ErrorLayout() {
    const history = useHistory();
    const cssClass = "no-result";
    const title = "Ooops, something went wrong.";
    const help = 
        ["Note: this is a demo version, please make sure to visit", <a href="https://cors-anywhere.herokuapp.com/" target="_blank" rel="noreferrer" className="text-light">, "https://cors-anywhere.herokuapp.com/", </a>, "and click on the Request temporary access to the demo server button prior to any search session. Make sure you also modified .env to add your own API token."];
    const handleClick = (event: SyntheticEvent) => {
        history.push('/');
    }

    const button = {
        text: "Go back home!",
        handleClick: handleClick
    }

    return <BasicLayout cssClass={cssClass} title={title} help={help} button={button}/>;
}

export default ErrorLayout;