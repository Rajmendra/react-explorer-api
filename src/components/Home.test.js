import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

test('renders open sidebar button', () => {
  const { getByText } = render(<Home />);
  const buttonElement = getByText(/open sidebar/i);
  expect(buttonElement).toBeInTheDocument();
});