import React, { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';

import BasicLayout from './Basic';

function NoResultLayout(props: {numFilters: number}) {
    const history = useHistory();
    const cssClass = "no-result";
    const title = "Sorry, we didn't find anything matching your search";
    const subtitle = (props.numFilters >= 4) ? `Tip: you're using ${props.numFilters} differents filters, that is ambitious for our little base, try with less :)` : '';
    const handleClick = (event: SyntheticEvent) => {
        history.push('/');
    }

    const button = {
        text: "Go back home!",
        handleClick: handleClick
    }

    if (subtitle){
        return (
            <BasicLayout cssClass={cssClass} title={title} subtitle={subtitle} button={button}/>
    )}
    return ( 
        <BasicLayout cssClass={cssClass} title={title} button={button}/>
    )
}

export default NoResultLayout;