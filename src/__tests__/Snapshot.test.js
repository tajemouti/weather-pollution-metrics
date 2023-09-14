import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../components/Header';
import Search from '../components/Search';

describe('Snapshot Tests', () => {
  it('renders Header correctly', () => {
    const headerComponent = renderer.create(<Header />).toJSON();
    expect(headerComponent).toMatchSnapshot();
  });

  it('renders Search correctly', () => {
    const searchComponent = renderer.create(<Search onSearch={() => {}} />).toJSON();
    expect(searchComponent).toMatchSnapshot();
  });
});
