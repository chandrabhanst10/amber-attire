import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

jest.mock('./user/home/Home', () => () => <div>Home Page</div>);
jest.mock('./user/products/page', () => () => <div>Products Page</div>);
jest.mock('./auth/signin/page', () => () => <div>Sign In Page</div>);


test('renders app without crashing', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
  // Just smoke test for now, or check for something we know exists like a header or "Amber Attire" if visible
});
