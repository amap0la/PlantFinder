import React, { SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import SearchTerm from './searchTerm/SearchTerm';
import SearchFilter from './searchFilter/SearchFilter';
import { loadSearchResults, resetResults } from '../searchResults/searchResultsSlice';
import { selectSearchFilter } from './searchFilter/searchFilterSlice';
import { selectSearchTerm } from './searchTerm/searchTermSlice';
import { ISearchConfig } from '../../../models/search';



function SearchQuery() {

    const history = useHistory();
    const dispatch = useAppDispatch();
    const searchTerm = useSelector(selectSearchTerm);
    const searchFilter = useSelector(selectSearchFilter);

    const handleValidation = (event: SyntheticEvent) => {
        event.preventDefault();
        dispatch(resetResults());
        search({
            term: searchTerm,
            filters: searchFilter
        });
        history.push('/results');
    }
    
    const search = (searchConfig: ISearchConfig) => {
        dispatch(loadSearchResults(searchConfig));
   }

    return(
        <Row className="h-100 w-100" noGutters>
            <Col className="base-layout landing p-5">
                <Row>
                    <Col>
                        <h1 className="my-4">Find your <span className="text-secondary">perfect plant</span></h1>
                        <SearchTerm onKeyPress={handleValidation}/>
                        <Button variant="secondary text-light" id="search-button" className="my-4" type="submit" onClick={handleValidation}>
                                Let's go!
                        </Button>  
                    </Col>
                </Row>
            </Col>

            <Col className="base-layout neutral p-5">
                    <Row className="filter-panel p-5 justify-content-center align-items-center">
                        <Col>
                            <SearchFilter />
                            <Button variant="secondary text-light" id="search-button" className="m-3" type="submit" onClick={handleValidation}>
                                Let's go!
                            </Button>  
                        </Col>
                    </Row>
            </Col>
        </Row>
    )
}

export default SearchQuery;
