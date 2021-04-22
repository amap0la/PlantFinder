import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { resetResults } from '../searchResults/searchResultsSlice';
 
import Search from '../searchQuery/SearchQuery';
 
const mockStore = configureStore([]);
 
describe('<SearchQuery />', () => {
  let store;
  let component;
 
  beforeEach(() => {
    store = mockStore({
      searchTerm: '',
      searchFilter: {},
      searchResults: {}
    });

    store.dispatch = jest.fn();
 
    component = renderer.create(
      <Provider store={store}>
        <Search />
      </Provider>
    );
  });
 
  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
 
  /*it('should dispatch an action on button click', () => {
    renderer.act(() => {
      component.root.findByProps({id: 'search-button'}).props.onClick();
    });
 
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      resetResults()
    );
   });*/
});