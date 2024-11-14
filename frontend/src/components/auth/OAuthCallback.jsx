import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OAuthCallback({ onAuthenticate }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("OAuth callback component mounted. Checking URL for token...");
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      console.log("Token found in URL. Authenticating user...");
      localStorage.setItem("token", token);
      onAuthenticate(token);
      navigate("/dashboard");
    } else {
      console.error("No token found in URL. Redirecting to sign in.");
      navigate('/signin');
    }
  }, [navigate, onAuthenticate]);

  return <div>Processing authentication...</div>;
}

export default OAuthCallback;
