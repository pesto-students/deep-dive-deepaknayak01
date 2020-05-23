import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import renderer from 'react-test-renderer';
import { generateLineGraphData ,generateBarGraphData} from '../utils'

it('renders without crashing', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should test if data is available for chart', () => {
  const data = generateBarGraphData();
  console.log('data:::', data);
  expect(data.length).toBeGreaterThan(0);
});

