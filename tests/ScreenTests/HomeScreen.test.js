import React from 'react';
import HomeScreen from '../../src/screens/HomeScreen';

import renderer from 'react-test-renderer';


test('Renders correctly', () => {
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});