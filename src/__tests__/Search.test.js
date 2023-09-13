import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search';

describe('renders States component and handles search and initial loading message', () => {
  test('renders the Search component with an input field', () => {
    render(<Search onSearch={() => { }} />);

    const inputField = screen.getByPlaceholderText('Search...');
    expect(inputField).toBeInTheDocument();
  });

  test('calls the onSearch callback when the input value changes', () => {
    const mockOnSearch = jest.fn();

    render(<Search onSearch={mockOnSearch} />);

    const inputField = screen.getByPlaceholderText('Search...');
    fireEvent.change(inputField, { target: { value: 'Toronto' } });

    expect(mockOnSearch).toHaveBeenCalledWith('Toronto');
  });

  test('clears the input field when the user clears it', () => {
    const mockOnSearch = jest.fn();

    render(<Search onSearch={mockOnSearch} />);

    const inputField = screen.getByPlaceholderText('Search...');

    fireEvent.change(inputField, { target: { value: 'Vancouver' } });

    expect(inputField.value).toBe('Vancouver');

    fireEvent.change(inputField, { target: { value: '' } });

    expect(inputField.value).toBe('');
  });

  test('calls the onSearch callback with the correct value when user types in the search bar', () => {
    const mockOnSearch = jest.fn();

    render(<Search onSearch={mockOnSearch} />);

    const inputField = screen.getByPlaceholderText('Search...');
    const search = screen.getByTestId('search-text');

    fireEvent.change(inputField, { target: { value: 'Montreal' } });

    fireEvent.submit(search);

    expect(mockOnSearch).toHaveBeenCalledWith('Montreal');
  });
});
