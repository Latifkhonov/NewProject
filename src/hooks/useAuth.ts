import { useState, useCallback } from 'react';
import { User, LoginFormData, RegisterFormData, AuthState } from '../types/auth';

// Mock API functions - replace with actual API calls
// API service instance
const apiService = new (class {
  private baseURL = 'http://localhost:3001/api';

  async login(credentials: LoginFormData) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Store token
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }

    return data;
  }

  async register(userData: RegisterFormData) {
    const response = await fetch(`${this.baseURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    // Store token
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }

    return data;
  }
})();

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
      const response = await apiService.login(credentials);
      setAuthState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('isAuthenticated', 'true');
      
      return { success: true, user: response.user };
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
      const response = await apiService.register(userData);
      setAuthState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('isAuthenticated', 'true');
      
      return { success: true, user: response.user };
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
    localStorage.removeItem('authToken');
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