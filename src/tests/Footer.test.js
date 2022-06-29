import '@testing-library/jest-dom';
import React from 'react';
import { screen } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter/renderWithRouter';
import App from '../App';

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

    await act(async () => {
      history.push('/foods');
    });

    expect(history.location.pathname).toBe('/foods');
    expect(screen.getByTestId(TEST_ID_FOOTER)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID_BTN_DRINKS)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID_BTN_EXPLORE)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID_BTN_FOODS)).toBeInTheDocument();
  });

  it('Test if by clicking on the drink icon the page is redirected to the drinks page',
    async () => {
      const { history } = renderWithRouter(<App />);

      await act(async () => {
        history.push('/foods');
      });

      expect(history.location.pathname).toBe('/foods');

      const iconDrink = screen.getByTestId(TEST_ID_BTN_DRINKS);
      useEvent.click(iconDrink);

      expect(history.location.pathname).toBe('/drinks');
    });

  it('Test if by clicking on the explore icon the page is redirected to the explore page',
    async () => {
      const { history } = renderWithRouter(<App />);

      await act(async () => {
        history.push('/foods');
      });

      expect(history.location.pathname).toBe('/foods');

      const iconExpore = screen.getByTestId(TEST_ID_BTN_EXPLORE);
      useEvent.click(iconExpore);

      expect(history.location.pathname).toBe('/explore');
    });

  it('Test if by clicking on the food icon the page is redirected to the foods page',
    async () => {
      const { history } = renderWithRouter(<App />);

      await act(async () => {
        history.push('/drinks');
      });

      expect(history.location.pathname).toBe('/drinks');

      const iconFood = screen.getByTestId(TEST_ID_BTN_FOODS);
      useEvent.click(iconFood);

      expect(history.location.pathname).toBe('/foods');
    });
});
