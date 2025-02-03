import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/InputRegister';
import { register } from '../utils/api';
import { LocaleConsumer } from '../contexts/LocaleContext';

function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);  
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    setIsLoading(true);  
    const { error } = await register(user);
    setIsLoading(false);  

    if (!error) {
      navigate('/');
    }
  }

  return (
    <LocaleConsumer>
      {({ locale }) => (
        <section className='register-page'>
          <h2>
            {locale === 'id' 
              ? 'Isi data Anda untuk membuat akun baru..' 
              : 'Fill in your details to create a new account..'}
          </h2>
          <RegisterInput register={onRegisterHandler} />
          <p>
            {locale === 'id' 
              ? 'Kembali ke ' 
              : 'Back to '}

            <Link to="/">{locale === 'id' ? 'Masuk' : 'Login'}</Link>
          </p>

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

export default RegisterPage;
