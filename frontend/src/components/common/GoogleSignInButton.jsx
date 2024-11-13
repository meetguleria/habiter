import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

function GoogleSignInButton({ onSuccess, onError }) {
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onError}
    />
  );
}

export default GoogleSignInButton;
