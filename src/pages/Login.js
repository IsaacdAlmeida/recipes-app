import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        type="submit"
        data-testid="login-submit-btn"
      >
        Enviar
      </button>
    </form>
  );
}

export default Login;
