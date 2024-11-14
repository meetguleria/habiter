import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

function GoogleSignInButton({ onSuccess, onError }) {
  return (
    <GoogleLogin
      onSuccess={credentialResponse => {
        console.log("Google sign-in successful. Handling response...");
        if (onSuccess) {
          onSuccess(credentialResponse);
        }
      }}
      onError={() => {
        console.error("Google login failed.");
        if (onError) {
          onError();
        }
      }}
    />
  );
}

export default GoogleSignInButton;
