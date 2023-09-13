import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import City from '../components/City';

test('City component renders without errors', () => {
  const { getByText } = render(
    <Provider store={store}>
      <City />
    </Provider>,
  );

  expect(getByText('Loading...')).toBeInTheDocument();
});
