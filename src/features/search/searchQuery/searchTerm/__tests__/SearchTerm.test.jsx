import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
 
import SearchTerm from '../SearchTerm';
 
const mockStore = configureStore([]);
 
describe('<SearchTerm />', () => {
  let store;
  let component;
 
  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    });
 
    component = renderer.create(
      <Provider store={store}>
        <SearchTerm />
      </Provider>
    );
  });
 
  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
 
  it('should dispatch an action on button click', () => {
 
  });
});