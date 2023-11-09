import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import APIDetails from './APIDetails';

jest.mock('../services/ApiService', () => ({
  getAPIDetails: jest.fn(() => Promise.resolve({ name: 'API1', description: 'Description' })),
}));

test('renders API details for a provider and API', async () => {
  const { findByText } = render(
    <MemoryRouter initialEntries={['/api-details/Provider1/API1']}>
      <Route path="/api-details/:provider/:api" component={APIDetails} />
    </MemoryRouter>
  );

  const apiName = await findByText('API1');
  const description = await findByText('Description');

  expect(apiName).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});