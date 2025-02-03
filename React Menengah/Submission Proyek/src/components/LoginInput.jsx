import React, { useState } from 'react';
import PropTypes from 'prop-types';

function LoginInput({ login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();

    login({
      email,
      password,
    });
  };

  return (
    <form onSubmit={onSubmitHandler} className='login-input'>
      <input
        type="email"
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id='email'
      />
      <input
        type="password"
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;