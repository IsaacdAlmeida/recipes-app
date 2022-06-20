import React from 'react';

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('test');
  };

  return (
    <form onSubmit={ handleSubmit }>
      <h2>Login</h2>
      <input type="text" placeholder="Email" data-testid="email-input" />
      <input type="text" placeholder="Password" data-testid="password-input" />
      <button type="submit" data-testid="login-submit-btn">Enviar</button>
    </form>
  );
}

export default Login;
