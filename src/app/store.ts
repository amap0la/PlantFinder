import { configureStore } from '@reduxjs/toolkit';
import searchFilterReducer from '../features/search/searchQuery/searchFilter/searchFilterSlice';
import searchTermReducer from '../features/search/searchQuery/searchTerm/searchTermSlice';
import searchResultsReducer from '../features/search/searchResults/searchResultsSlice';

export const reducer = {
    searchTerm: searchTermReducer,
    searchFilter: searchFilterReducer,
    searchResults: searchResultsReducer
}

export const store = configureStore({
    reducer: {
        searchTerm: searchTermReducer,
        searchFilter: searchFilterReducer,
        searchResults: searchResultsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
