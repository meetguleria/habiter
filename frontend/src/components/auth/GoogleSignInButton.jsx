import { GoogleLogin } from '@react-oauth/google';

function GoogleSignInButton({ onAuthenticate }) {
  return (
    <GoogleLogin
      onSuccess={credentialResponse => {
        console.log("Google sign-in successful. Handling response...");
        
        // Extract token from credentialResponse
        const token = credentialResponse.credential;
        if (token) {
          // Store token in local storage
          localStorage.setItem("token", token);
          // Authenticate user in your application context
          onAuthenticate(token);
        } else {
          console.error("No token received from Google sign-in.");
        }
      }}
      onError={() => {
        console.error("Google login failed.");
        alert("Google login failed. Please try again.");
      }}
    />
  );
}

export default GoogleSignInButton;
