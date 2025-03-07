import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Optionally, validate the token with the backend or retrieve user info
      axios.get('/auth/validate', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          setAuthUser(response.data.user);
        })
        .catch(error => {
          console.error("Token validation failed:", error);
          // Clear invalid token from localStorage
          localStorage.removeItem("token");
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
