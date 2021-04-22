import React from 'react';

import BasicLayout from './Basic';

function LoadingLayout() {
    const cssClass = "neutral text-primary";
    const title = "Loading...";

    return (
        <BasicLayout cssClass={cssClass} title={title} spinner={true}/>
    )
}

export default LoadingLayout;