import { useState, useCallback } from 'react';
import { User, LoginFormData, RegisterFormData, AuthState } from '../types/auth';

// Mock API functions - replace with actual API calls
const mockLogin = async (credentials: LoginFormData): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
    return {
      id: '1',
      email: credentials.email,
      name: 'Demo User',
      companyName: 'Demo Company',
      phone: '+998901234567',
      companySize: '11-50 employees',
      role: 'buyer',
      isVerified: true,
      createdAt: new Date().toISOString()
    };
  }
  
  throw new Error('Invalid email or password');
};

const mockRegister = async (userData: RegisterFormData): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock validation
  if (userData.email === 'existing@example.com') {
    throw new Error('Email already exists');
  }
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    email: userData.email,
    name: userData.name,
    companyName: userData.companyName,
    phone: userData.phone,
    companySize: userData.companySize,
    role: userData.role,
    isVerified: false,
    createdAt: new Date().toISOString()
  };
};

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  });

  const login = useCallback(async (credentials: LoginFormData) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const user = await mockLogin(credentials);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      
      return { success: true, user };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  const register = useCallback(async (userData: RegisterFormData) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const user = await mockRegister(userData);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      
      return { success: true, user };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  const logout = useCallback(() => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
    
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  }, []);

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  // Initialize auth state from localStorage
  const initializeAuth = useCallback(() => {
    const storedUser = localStorage.getItem('user');
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (storedUser && isAuthenticated) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      }
    }
  }, []);

  return {
    ...authState,
    login,
    register,
    logout,
    clearError,
    initializeAuth
  };
};