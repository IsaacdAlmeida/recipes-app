import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter/renderWithRouter';

const fetchMock = require('../../cypress/mocks/fetch');

const TEST_ID_FOOTER = 'footer';
const TEST_ID_BTN_DRINKS = 'drinks-bottom-btn';
const TEST_ID_BTN_EXPLORE = 'explore-bottom-btn';
const TEST_ID_BTN_FOODS = 'food-bottom-btn';

beforeEach(() => {
  window.fetch = fetchMock;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Testing component footer', () => {
  it('Check if it has attribute', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    expect(history.location.pathname).toBe('/foods');
    expect(screen.getByTestId(TEST_ID_FOOTER)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID_BTN_DRINKS)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID_BTN_EXPLORE)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID_BTN_FOODS)).toBeInTheDocument();
  });
});
