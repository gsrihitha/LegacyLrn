import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null); // 'student' or 'mentor'

  useEffect(() => {
    // Check for stored token on mount
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    const storedEmail = localStorage.getItem('email');
    
    if (token && storedRole && storedEmail) {
      setUser({ email: storedEmail });
      setRole(storedRole);
    } else {
      // Dev bypass: seed a default user so the UI works without login.
      const defaultRole = 'student';
      const defaultEmail = 'dev@example.com';
      localStorage.setItem('token', 'dev');
      localStorage.setItem('role', defaultRole);
      localStorage.setItem('email', defaultEmail);
      setUser({ email: defaultEmail });
      setRole(defaultRole);
    }
    setLoading(false);
  }, []);

  const login = async (email, password, userRole) => {
    try {
      let response;
      if (userRole === 'student') {
        response = await authAPI.loginStudent(email, password);
      } else {
        response = await authAPI.loginMentor(email, password);
      }

      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      localStorage.setItem('role', userRole);
      localStorage.setItem('email', email);
      
      setUser({ email });
      setRole(userRole);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Login failed',
      };
    }
  };

  const register = async (data, userRole) => {
    try {
      if (userRole === 'student') {
        await authAPI.registerStudent(data);
      } else {
        await authAPI.registerMentor(data);
      }
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Registration failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
