import React, { useEffect, useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    const REGEX_EMAIL_VALID = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
    const MIN_PASSWORD = 6;

    if (REGEX_EMAIL_VALID.test(email) && password.length > MIN_PASSWORD) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const handleInput = ({ target: { name, value } }) => {
    switch (name) {
    case 'email': {
      setEmail(value);
      break;
    } case 'password': {
      setPassword(value);
      break;
    } default: {
      break;
    }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('test');
  };

  return (
    <form onSubmit={ handleSubmit }>
      <h2>Login</h2>
      <input
        data-testid="email-input"
        name="email"
        placeholder="Email"
        type="text"
        onChange={ handleInput }
        value={ email }
      />
      <input
        data-testid="password-input"
        name="password"
        placeholder="Password"
        type="text"
        onChange={ handleInput }
        value={ password }
      />
      <button
        data-testid="login-submit-btn"
        disabled={ isDisabled }
        type="submit"
      >
        Enviar
      </button>
    </form>
  );
}

export default Login;
