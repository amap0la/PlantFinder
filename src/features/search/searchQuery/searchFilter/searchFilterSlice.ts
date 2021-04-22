import { IFilterCollection, IFilterContentAny } from '../../../../models/search';
import { RootState } from '../../../../app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface IPayloadFilter {
    name: string,
    content: IFilterContentAny
}

const initialState: IFilterCollection = {}

export const searchFilterSlice = createSlice({
    name: 'searchFilter',
    initialState: initialState,
    reducers: {
        addFilter: (state, action: PayloadAction<IPayloadFilter>) => {
            state[action.payload.name] = action.payload.content;
        },
        removeFilter: (state, action) => {

        }
    }
})

export const selectSearchFilter = (state: RootState) => state.searchFilter;
export const { addFilter, removeFilter } = searchFilterSlice.actions;
export default searchFilterSlice.reducer;