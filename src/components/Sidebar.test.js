import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from './Sidebar';

jest.mock('../services/ApiService', () => ({
  getProviders: jest.fn(() => Promise.resolve(['Provider1', 'Provider2'])),
}));

test('renders sidebar with providers', async () => {
  const { findByText } = render(<Sidebar />);
  const provider1 = await findByText('Provider1');
  const provider2 = await findByText('Provider2');

  expect(provider1).toBeInTheDocument();
  expect(provider2).toBeInTheDocument();
});