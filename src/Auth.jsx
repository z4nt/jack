// src/auth.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = async (email, password) => {
    console.log('aaaaaaaaaaaaaaaaaaa', email, password)
    try {
      const response = await fetch("http://localhost:10000/user/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login falhou");
      }

      const data = await response.json();
      const token = data.token;
      setToken(data);
      console.log(data)
      localStorage.setItem("token", data);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
