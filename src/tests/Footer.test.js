import React from 'react';
import { render, screen } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
import Foods from '../pages/Foods';
import testData from '../../cypress/mocks/meals';

const TEST_ID_FOOTER = 'footer';
const TEST_ID_BTN_DRINKS = 'drinks-bottom-btn';
const TEST_ID_BTN_EXPLORE = 'explore-bottom-btn';
const TEST_ID_BTN_FOODS = 'food-bottom-btn';

beforeEach(() => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      meals: () => Promise.resolve(testData),
    }));
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Testing component footer', () => {
  it('Check if it has attribute', async () => {
    render(<Foods />);

    expect(screen.getByTestId(TEST_ID_FOOTER)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID_BTN_DRINKS)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID_BTN_EXPLORE)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID_BTN_FOODS)).toBeInTheDocument();
  });
});
