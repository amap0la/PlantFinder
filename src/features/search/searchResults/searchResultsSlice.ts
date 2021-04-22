import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { ISearchResults } from '../../../models/search';
import TrefleDataService from '../../../util/TrefleDataService';
import { ISearchConfig } from '../../../models/search';


export const loadSearchResults = createAsyncThunk<
ISearchResults, ISearchConfig,
{ state: RootState }
>(
    'searchResults/loadSearchResults',
    async (searchConfig, thunkApi) => {
        const results = await TrefleDataService.getPlants(searchConfig);
        return results;        
    }
)

const initialState: ISearchResults = {
    plantList: [],
    numResults: 0,
    status: 'idle'
}

export const searchResultsSlice = createSlice({
    name: 'searchResults',
    initialState: initialState,
    reducers: {
        resetResults: (state) => {
            state = initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadSearchResults.pending, (state, action) => {
            if (state.status === 'idle'){
                state.status = 'loading';
            }
            
        });

        builder.addCase(loadSearchResults.fulfilled, (state, { payload }) => {
            state.status = payload.status;
            state.plantList = payload.plantList;
            state.numResults = payload.numResults;
        });

        builder.addCase(loadSearchResults.rejected, (state, action) => {
            if (state.status === 'loading'){
                state.status = 'failed';
            }
        })
    }
})

export const selectPlantList = (state: RootState) => state.searchResults.plantList;
export const selectNumResults = (state: RootState) => state.searchResults.numResults;
export const selectSearchStatus = (state: RootState) => state.searchResults.status;
export const resetResults = searchResultsSlice.actions.resetResults;
export default searchResultsSlice.reducer;


