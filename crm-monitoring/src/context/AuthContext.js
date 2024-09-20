import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "https://smart-grouse-gladly.ngrok-free.app/api/v1/auth/login",
        { email, password }
      );
      const { accessToken, role } = response.data;
      setToken(accessToken);
      setUserRole(role);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("role", role);
      return role; // Kembalikan peran untuk navigasi
    } catch (error) {
      throw new Error(error.response?.data?.msg || "Login failed");
    }
  };

  const logout = () => {
    setToken(null);
    setUserRole(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ userRole, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
