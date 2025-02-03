import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { login } from '../utils/api';
import { LocaleConsumer } from '../contexts/LocaleContext';

function LoginPage({ loginSuccess }) {
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  async function onLogin({ email, password }) {
    setIsLoading(true);
    const { error, data } = await login({ email, password });
    setIsLoading(false);

    if (!error) {
      loginSuccess(data);
      setAlert({ message: 'Login successful!', type: 'success' });
    } else {
      setAlert({ message: 'Login failed. Please try again.', type: 'error' });
    }
  }

  return (
    <LocaleConsumer>
      {({ locale }) => (
        <section className='login-page'>
          <h2>{locale === 'id' ? 'Silakan login untuk mulai menggunakan aplikasi...' : 'Please log in to start using the application...'}</h2>
          <LoginInput login={onLogin} />
          <p>
            {locale === 'id' ? 'Belum punya akun?' : "Don't have an account?"} <Link to="/register">{locale === 'id' ? 'Daftar di sini.' : 'Register here.'}</Link>
          </p>

          {alert.message && (
            <div className={`alert alert-${alert.type}`}>
              <p>{alert.message}</p>
            </div>
          )}

          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
              <p>{locale === 'id' ? 'Sedang memproses...' : 'Processing...'}</p>
            </div>
          )}
        </section>
      )}
    </LocaleConsumer>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
