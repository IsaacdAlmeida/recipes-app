import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';

function Login(props) {
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

  const handleSubmit = () => {
    const { history } = props;
    const userJson = JSON.stringify({ email });

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', userJson);

    history.push('/foods');
  };

  return (
    <form onSubmit={ handleSubmit }>
      <h2>Login</h2>
      <input
        data-testid="email-input"
        name="email"
        placeholder="Email"
        type="email"
        onChange={ handleInput }
        value={ email }
      />
      <input
        data-testid="password-input"
        name="password"
        placeholder="Password"
        type="password"
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

Login.propTypes = {
  history: PropType.shape({
    push: PropType.func.isRequired,
  }).isRequired,
};

export default Login;
