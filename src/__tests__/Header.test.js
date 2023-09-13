import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

test('renders the header component with the correct text', () => {
  render(<Header />);
  const headerText = screen.getByText('Weather and Pollution Metrics for Canada');
  expect(headerText).toBeInTheDocument();
});
