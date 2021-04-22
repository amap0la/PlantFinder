import React from 'react';
import SearchQuery from './searchQuery/SearchQuery';
import SearchResults from './searchResults/SearchResults';
import NotFound from '../../components/layout/NotFound';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function Search() {
    return(
        <Router>
            <Switch>
                <Route exact path="/">
                    <SearchQuery />
                </Route>
                <Route path="/results">
                    <SearchResults />
                </Route>
                <Route>
                    <NotFound />
                </Route>
             </Switch>
        </Router>
    )
}

export default Search;

