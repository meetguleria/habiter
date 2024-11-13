import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from "./components/common/Header";
import HomePage from "./components/pages/Homepage";
import SignUp from "./components/auth/Signup";
import SignIn from "./components/auth/Login";
import Dashboard from "./components/habits/Dashboard";


function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check localStorage for authentication status on mount
  useEffect(() => {
    console.log("App Component Mounted: Checking authentication status from localStorage...");
    const token = localStorage.getItem("token");

    if (token) {
      console.log("Token found in localStorage. Setting user as authenticated.");
      setIsAuthenticated(true);
    } else {
      console.log("No token found in localStorage. User is not authenticated.");
    }
  }, []);

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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn onAuthenticate={() => setIsAuthenticated(true)} />} />
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
