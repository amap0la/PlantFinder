import searchTermReducer,  { setSearchTerm, clearSearchTerm } from '../searchTermSlice';

describe('searchTerm reducer', () => {
    const initialState = '';
    it('should handle initial state', () => {
        expect(searchTermReducer(undefined, { type: 'unknown'})).toEqual('');
    });
    it('should handle setting the search term', () => { 
        const newTerm = 'pilea';
        const actual = searchTermReducer(initialState, setSearchTerm(newTerm));
        expect(actual).toEqual('pilea');
    });
    it('should handle updating the search term', () => {
        const newTerm = 'alocasia';
        const actual = searchTermReducer('pilea', setSearchTerm(newTerm));
        expect(actual).toEqual('alocasia');
    });
    it('should handle clearing the search term', () => {
        const actual = searchTermReducer('kentia', clearSearchTerm());
        expect(actual).toEqual('');
    });
});