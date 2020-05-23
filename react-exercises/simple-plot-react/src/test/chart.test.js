import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
