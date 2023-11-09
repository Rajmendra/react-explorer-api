import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import WebAPIs from './WebAPIs';

jest.mock('../services/ApiService', () => ({
  getWebAPIs: jest.fn(() => Promise.resolve(['API1', 'API2'])),
}));

test('renders Web APIs for a provider', async () => {
  const { findByText } = render(
    <MemoryRouter initialEntries={['/web-apis/Provider1']}>
      <Route path="/web-apis/:provider" component={WebAPIs} />
    </MemoryRouter>
  );

  const api1 = await findByText('API1');
  const api2 = await findByText('API2');

  expect(api1).toBeInTheDocument();
  expect(api2).toBeInTheDocument();
});