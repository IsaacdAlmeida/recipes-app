import React from 'react';
import { render, screen } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const LOGIN_SUBMIT_BNT_TEST_ID = 'login-submit-btn';
const VALID_EMAIL = 'test@test.com';
const VALID_PASSWORD = 'test123';

describe('Testing page Login', () => {
  it('Testing componentes in screen, Requirement 2', () => {
    render(<Login />);

    expect(screen.getByTestId(EMAIL_INPUT_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(PASSWORD_INPUT_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(LOGIN_SUBMIT_BNT_TEST_ID)).toBeInTheDocument();
  });

  it('Testing writing in input field', () => {
    render(<Login />);

    const inputEmailEL = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    useEvent.type(inputEmailEL, VALID_EMAIL);
    useEvent.type(inputPassword, VALID_PASSWORD);

    expect(inputEmailEL).toHaveValue(VALID_EMAIL);
    expect(inputPassword).toHaveValue(VALID_PASSWORD);
  });

  it('Testing if form inputs are valid', () => {
    render(<Login />);

    const inputEmailEL = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const bntSubmit = screen.getByTestId(LOGIN_SUBMIT_BNT_TEST_ID);

    expect(bntSubmit).toBeDisabled();

    useEvent.type(inputEmailEL, VALID_EMAIL);
    useEvent.type(inputPassword, VALID_PASSWORD);

    expect(bntSubmit).not.toBeDisabled();
  });

  it.only('Testing Redirect to p p', () => {
    const { history, debug } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const inputEmailEL = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const bntSubmit = screen.getByTestId(LOGIN_SUBMIT_BNT_TEST_ID);

    useEvent.type(inputEmailEL, VALID_EMAIL);
    useEvent.type(inputPassword, VALID_PASSWORD);
    useEvent.click(bntSubmit);

    debug();
    expect(history.location.pathname).toBe('/foods');
  });
});
