import React from 'react';
import { render, screen } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import Login from '../pages/Login';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const LOGIN_SUBMIT_BNT_TEST_ID = 'login-submit-btn';
const VALID_EMAIL = 'test@test.com';
const VALID_PASSWORD = '123456';

describe('Testing page Login', () => {
  it('Testing componentes in screen, Requirement 2', () => {
    render(<Login />);

    expect(screen.getByTestId(EMAIL_INPUT_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(PASSWORD_INPUT_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(LOGIN_SUBMIT_BNT_TEST_ID)).toBeInTheDocument();
  });

  it('Testing write in camp input', () => {
    render(<Login />);

    const inputEmailEL = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    useEvent.type(inputEmailEL, VALID_EMAIL);
    useEvent.type(inputPassword, VALID_PASSWORD);

    expect(inputEmailEL).toHaveValue(VALID_EMAIL);
    expect(inputPassword).toHaveValue(VALID_PASSWORD);
  });
});
