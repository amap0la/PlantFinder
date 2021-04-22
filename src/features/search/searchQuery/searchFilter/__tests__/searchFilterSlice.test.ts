import searchFilterReducer, { addFilter, removeFilter } from '../searchFilterSlice';

describe('searchFilter reducer', () => {
    const initialState = {};
    it('should handle initial state', () => {
        expect(searchFilterReducer(undefined, { type: 'unknown' })).toEqual({});
    });
    it('should handle addFilter', () => {
        const newFilter = {
            name: 'flower_color',
            content: {
                filterType: 'array',
                filterValue: ['red', 'blue']
            }};
        const actual = searchFilterReducer(initialState, addFilter(newFilter));
        expect(actual).toEqual({'flower_color': {
            filterType: 'array',
            filterValue: ['red', 'blue']
        }});
    })
})