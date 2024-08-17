// AuthContext.js
import React, { createContext, useState, useContext } from "react";

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap your application and provide authentication state and functions
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const usernameValue = usernameDoc.current.value;
    const firstValue = firstnameDoc.current.value;
    const lastValue = lastnameDoc.current.value;
    const emailValue = emailDoc.current.value;
    const passValue = passwordDoc.current.value;
    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passValue
    ) {
      setErrorMessage("Please provide all required information");
      return;
    }
    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });
      setSuccessMessage("Registration successful");
      navigator("/home");
    } catch (error) {
      setErrorMessage("Something went wrong");
      console.log(error.response);
    }
  };
  // Function to login the user
  const login = () => {
    // Your login logic here...
    setIsAuthenticated(true);
  };

  // Function to logout the user
  const logout = () => {
    // Your logout logic here...
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleSubmit, logout }}>
      {children}
    </AuthContext.Provider>
  );
};