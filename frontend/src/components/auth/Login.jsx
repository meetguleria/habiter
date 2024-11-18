import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleSignInButton from "../auth/GoogleSignInButton";
import { login } from "../../services/authService";

function Login({ onAuthenticate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // useNavigate inside the component rendered by a route

  useEffect(() => {
    console.log("Checking URL for OAuth token or localStorage token...");
    const token = localStorage.getItem("token");

    if (token) {
      console.log("Token found in localStorage. Authenticating user.");
      onAuthenticate(token);
      navigate("/dashboard");
    } else {
      console.log("No token found in localStorage.");
    }
  }, [navigate, onAuthenticate]);

  const handleSignIn = async () => {
    console.log("Attempting to sign in with email:", email);
    const { success, token, message } = await login(email, password);

    if (success) {
      console.log("Login successful.");
      localStorage.setItem("token", token);
      onAuthenticate(token);
      navigate("/dashboard"); // Navigate to dashboard after successful login
    } else {
      alert(message);
    }
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
      <GoogleSignInButton onAuthenticate={onAuthenticate} />
    </div>
  );
}

export default Login;
