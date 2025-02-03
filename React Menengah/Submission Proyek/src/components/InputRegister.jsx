import React, { useState } from 'react';
import PropTypes from 'prop-types';

function RegisterInput({ register }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Password dan Konfirmasi Password harus sama.');
      return;
    }

    setErrorMessage('');

    register({ name, email, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className='register-input'>
      <input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        autoComplete='current-password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Konfirmasi Password"
        autoComplete='current-password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {errorMessage && (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      )}
      <button>Register</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
