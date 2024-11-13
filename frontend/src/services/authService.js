const BASE_URL = 'http://localhost:4000/api/users';

export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'applicati   on/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, token: data.token };
    } else {
      console.error(`Login failed with status: ${response.status}`);
      return { success: false, message: "Invalid login credentials." };
    }
  } catch (error) {
    console.error("Login API Error:", error);
    return { success: false, message: "An error occurred while logging in." };
  }
};

export const signup = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      return { success: true, message: "Registration successful." };
    } else {
      console.error(`Signup failed with status: ${response.status}`);
      return { success: false, message: "Unable to register user." };
    }
  } catch (error) {
    console.error("Signup API Error:", error);
    return { success: false, message: "An error occurred while signing up." };
  }
};

export const handleGoogleAuth = (endpoint) => {
  console.log("Redirecting to Google OAuth...");
  window.location.href = endpoint;
};
