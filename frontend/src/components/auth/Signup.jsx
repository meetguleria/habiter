import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleSignInButton from "../common/GoogleSignInButton";
import { signup, handleGoogleAuth } from "../../services/authService";

function SignUp({ onAuthenticate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    console.log("Attempting to sign up with name, email, and password.");
    const { success, message } = await signup({ name, email, password });

    if (success) {
      console.log("Sign-up successful. Redirecting to sign-in page.");
      navigate("/signin");
    } else {
      alert(message);
    }
  };

  const handleGoogleSignUp = () => {
    handleGoogleAuth("http://localhost:4000/api/users/google");
  };

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <hr />
      <GoogleSignInButton />
    </div>
  );
}

export default SignUp;
