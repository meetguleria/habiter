import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleSignInButton from "../common/GoogleSignInButton";
import { login, handleGoogleAuth } from "../../services/authService";

function Login({ onAuthenticate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Effect to check if a token is present and redirect if authenticated
  useEffect(() => {
    console.log("Checking URL for OAuth token or localStorage token...");
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token") || localStorage.getItem("token");

    if (token) {
      console.log("Token found. Storing in localStorage and authenticating user.");
      localStorage.setItem("token", token);
      onAuthenticate();
      navigate("/dashboard");

      // Remove token from URL after processing
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      console.log("No OAuth token found in URL.");
    }
  }, [navigate, onAuthenticate]);

  const handleSignIn = async () => {
    console.log("Attempting to sign in with email:", email);
    const { success, token, message } = await login(email, password);

    if (success) {
      console.log("Login successful.");
      localStorage.setItem("token", token);
      onAuthenticate();
      navigate("/dashboard");
    } else {
      alert(message);
    }
  };

  const handleGoogleLogin = () => {
    handleGoogleAuth("http://localhost:4000/api/users/google");
  };

  return (
    <div className="auth-form">
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>
      <hr />
      <GoogleSignInButton onSuccess={handleGoogleLogin} onError={() => {
        console.error("Google login failed.");
        alert("Google login failed. Please try again.");
      }} />
    </div>
  );
}

export default Login;
