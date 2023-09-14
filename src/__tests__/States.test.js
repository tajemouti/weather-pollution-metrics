import React from 'react';
import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import States from '../components/States';
import mockStore from '../__mocks__/reduxMock';

const initialState = {
  states: [],
};

const store = mockStore(initialState);

describe('renders States component and handles search and initial loading message', () => {
  test('renders States component and handles search', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <States />
        </BrowserRouter>
      </Provider>,
    );

    const searchInput = screen.getByPlaceholderText('Search...');

    fireEvent.change(searchInput, { target: { value: 'Quebec' } });

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });
});
