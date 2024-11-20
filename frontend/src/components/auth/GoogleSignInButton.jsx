import React from 'react';
import { handleGoogleAuth } from "../../services/authService";

function GoogleSignInButton() {
  const handleGoogleSignIn = () => {
    console.log("Redirecting to Google sign-in...");
    handleGoogleAuth('http://localhost:4000/api/users/google');
  };

  return (
    <button onClick={handleGoogleSignIn}>
      Sign in with Google
    </button>
  );
}

export default GoogleSignInButton;
