import React from 'react';
import { render, screen } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import Login from '../pages/Login';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const LOGIN_SUBMIT_BNT_TEST_ID = 'login-submit-btn';

describe('Testing page Login', () => {
  it('Testing componentes in screen, Requirement 2', () => {
    render(<Login />);

    expect(screen.getByTestId(EMAIL_INPUT_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(PASSWORD_INPUT_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(LOGIN_SUBMIT_BNT_TEST_ID)).toBeInTheDocument();
  });
});
