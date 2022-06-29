import React from 'react';
import { screen } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter/renderWithRouter';
import App from '../App';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const LOGIN_SUBMIT_BNT_TEST_ID = 'login-submit-btn';
const VALID_EMAIL = 'test@test.com';
const VALID_PASSWORD = 'test123';
const INVALID_EMAIL = 'test';
const INVALID_PASSWORD = 'test';

describe('Testing page Login', () => {
  it('Testing componentes in screen, Requirement 2', () => {
    renderWithRouter(<App />);

    expect(screen.getByTestId(EMAIL_INPUT_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(PASSWORD_INPUT_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(LOGIN_SUBMIT_BNT_TEST_ID)).toBeInTheDocument();
  });

  it('Testing writing in input field', () => {
    renderWithRouter(<App />);

    const inputEmailEL = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    useEvent.type(inputEmailEL, VALID_EMAIL);
    useEvent.type(inputPassword, VALID_PASSWORD);

    expect(inputEmailEL).toHaveValue(VALID_EMAIL);
    expect(inputPassword).toHaveValue(VALID_PASSWORD);
  });

  it('Testing if form inputs are valid', () => {
    renderWithRouter(<App />);

    const inputEmailEL = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const bntSubmit = screen.getByTestId(LOGIN_SUBMIT_BNT_TEST_ID);

    expect(bntSubmit).toBeDisabled();

    useEvent.type(inputEmailEL, VALID_EMAIL);
    useEvent.type(inputPassword, VALID_PASSWORD);

    expect(bntSubmit).not.toBeDisabled();
  });

  it('testing if you enter an invalid email button is not enabled', () => {
    renderWithRouter(<App />);

    const inputEmailEL = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const bntSubmit = screen.getByTestId(LOGIN_SUBMIT_BNT_TEST_ID);

    expect(bntSubmit).toBeDisabled();

    useEvent.type(inputEmailEL, INVALID_EMAIL);
    useEvent.type(inputPassword, INVALID_PASSWORD);

    expect(bntSubmit).toBeDisabled();
  });

  it('Testing Redirect to foods page', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const inputEmailEL = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const bntSubmit = screen.getByTestId(LOGIN_SUBMIT_BNT_TEST_ID);

    useEvent.type(inputEmailEL, VALID_EMAIL);
    useEvent.type(inputPassword, VALID_PASSWORD);
    useEvent.click(bntSubmit);

    expect(history.location.pathname).toBe('/foods');
  });
});
