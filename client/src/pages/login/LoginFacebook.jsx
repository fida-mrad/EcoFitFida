import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

const LoginFacebook = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const responseFacebook = (response) => {
    axios.post('/auth/facebook', { access_token: response.accessToken })
      .then((res) => {
        setIsLoggedIn(true);
        setErrorMessage('');
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setErrorMessage('Failed to login with Facebook');
      });
  }

  return (
    <div>
      {isLoggedIn ? <p>You are logged in!</p> :
        <>
          <FacebookLogin
            appId="3726567494237129"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
          />
          {errorMessage && <p>{errorMessage}</p>}
        </>
      }
    </div>
  );
};

export default LoginFacebook;
