import React from 'react';
import { useSelector } from 'react-redux';
import { selectSearchFilter } from '../searchQuery/searchFilter/searchFilterSlice';
import { ISearchStatus } from '../../../models/search';
import { selectPlantList, selectNumResults, selectSearchStatus } from './searchResultsSlice';
import IdleLayout from '../../../components/layout/Idle';
import LoadingLayout from '../../../components/layout/Loading';
import ResultsLayout from '../../../components/layout/Results';
import NoResultLayout from '../../../components/layout/NoResult';
import ErrorLayout from '../../../components/layout/Error';

function SearchResults() {
    const plantList = useSelector(selectPlantList);
    const numResults = useSelector(selectNumResults);
    const status = useSelector(selectSearchStatus);
    const numFilters = Object.keys(useSelector(selectSearchFilter)).length;

    const getResultsFromStatus = (status: ISearchStatus) => {
        switch(status){
            case 'idle':
                if (numResults && plantList){
                    return <ResultsLayout />;
                }
                return (
                    <IdleLayout />
                );
            case 'loading':
                return (<LoadingLayout />);
            case 'succeeded':
                return numResults ? <ResultsLayout /> : <NoResultLayout numFilters={numFilters}/>;
            case 'failed':
                return <ErrorLayout />
            default: 
                return <IdleLayout />
        }
    }

    return (
        <div>
            {getResultsFromStatus(status)}
        </div>
    )
    
}

export default SearchResults;