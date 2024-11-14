import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from "./components/common/Header";
import HomePage from "./components/pages/Homepage";
import SignUp from "./components/auth/Signup";
import Login from "./components/auth/Login"; // Corrected import name
import Dashboard from "./components/habits/Dashboard";
import OAuthCallback from "./components/auth/OAuthCallback";

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Unified function to check authentication and set state
  const checkAuthentication = useCallback(() => {
    console.log("Checking authentication status...");
    const token = localStorage.getItem("token");

    if (token) {
      console.log("Token found in localStorage. User is authenticated.");
      setIsAuthenticated(true);
    } else {
      console.log("No token found. User is not authenticated.");
      setIsAuthenticated(false);
    }
  }, []);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  // Function to handle successful authentication
  const handleAuthenticationSuccess = (token) => {
    console.log("Authentication successful. Storing token and setting user as authenticated.");
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  // Function to clear the token when user signs out
  const handleSignOut = () => {
    console.log("Signing out user...");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  // A wrapper component to handle protected routes
  const RequireAuth = ({ children }) => {
    const location = useLocation();
    if (!isAuthenticated) {
      console.log("User is not authenticated. Redirecting to sign in page.");
      return <Navigate to="/signin" state={{ from: location }} />;
    }
    return children;
  };

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        <Header onSignOut={handleSignOut} isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp onAuthenticate={handleAuthenticationSuccess} />} />
          <Route path="/signin" element={<Login onAuthenticate={handleAuthenticationSuccess} />} />
          <Route path="/oauth-callback" element={<OAuthCallback onAuthenticate={handleAuthenticationSuccess} />} />
          <Route path="/dashboard" element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          } />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
