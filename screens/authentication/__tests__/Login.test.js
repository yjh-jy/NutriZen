import React from 'react';
import renderer from 'react-test-renderer';
import Login  from '../Login'; // Update this path to match the location of your Login component

describe('Login Component', () => {
  it('should match the snapshot', () => {
    const navigationMock = { push: jest.fn(), goBack: jest.fn() };
    const tree = renderer.create(<Login navigation={navigationMock} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
