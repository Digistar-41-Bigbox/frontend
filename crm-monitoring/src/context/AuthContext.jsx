import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");

    if (storedRole) {
      setUserRole(storedRole);
    }

    if (storedName && storedEmail) {
      setUserInfo({ name: storedName, email: storedEmail });
    }
  }, []);

  const login = async (emailInput, password) => {
    try {
      const response = await axios.post(
        "https://backend-dev-eosin.vercel.app/api/v1/auth/login",
        { email: emailInput, password }
      );
      const accessToken = response.data.data.accessToken;
      const decoded = jwtDecode(accessToken);

      const responseGetUser = await axios.get(
        "https://backend-dev-eosin.vercel.app/api/v1/auth/get-user",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const name = responseGetUser.data.data.name;
      const userEmail = responseGetUser.data.data.email; // Changed variable name to userEmail
      setToken(accessToken);
      setUserRole(decoded.role);
      setUserInfo({ name, email: userEmail });
      console.log(userInfo);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("role", decoded.role);
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", userEmail);

      return decoded.role; // Return the role for navigation
    } catch (error) {
      // Tangani error dan berikan pesan spesifik berdasarkan response dari server
      if (error.response) {
        if (error.response.status === 404) {
          throw new Error("Email tidak ditemukan");
        } else if (error.response.status === 401) {
          throw new Error("Password salah");
        }
      }
      console.log(error);
      throw new Error("Login gagal. Silakan coba lagi.");
    }
  };

  const logout = async () => {
    try {
      // Panggil API untuk logout jika diperlukan
      await axios.delete(
        "https://backend-dev-eosin.vercel.app/api/v1/auth/logout"
      );
      // Hapus token dan role dari localStorage
      setToken(null);
      setUserRole(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ userRole, token, login, userInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
