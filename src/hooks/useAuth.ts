import { useState, useCallback, useEffect } from 'react';
import { User as SupabaseUser, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { User, LoginFormData, RegisterFormData, AuthState } from '../types/auth';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  });

  // Convert Supabase user to our User type
  const convertSupabaseUser = useCallback(async (supabaseUser: SupabaseUser): Promise<User> => {
    // Get user profile from profiles table
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', supabaseUser.id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.warn('Error fetching user profile:', error);
    }

    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: profile?.name || supabaseUser.user_metadata?.name || '',
      companyName: profile?.company_name || supabaseUser.user_metadata?.company_name,
      phone: profile?.phone || supabaseUser.user_metadata?.phone,
      companySize: profile?.company_size || supabaseUser.user_metadata?.company_size,
      role: profile?.role || supabaseUser.user_metadata?.role || 'buyer',
      isVerified: profile?.is_verified || false,
      createdAt: supabaseUser.created_at
    };
  }, []);

  const login = useCallback(async (credentials: LoginFormData) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        const user = await convertSupabaseUser(data.user);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
        
        return { success: true, user };
      }

      throw new Error('Login failed - no user data returned');
    } catch (error) {
      const errorMessage = error instanceof AuthError 
        ? error.message 
        : error instanceof Error 
        ? error.message 
        : 'Login failed';
      
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      
      return { success: false, error: errorMessage };
    }
  }, [convertSupabaseUser]);

  const register = useCallback(async (userData: RegisterFormData) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            company_name: userData.companyName,
            phone: userData.phone,
            company_size: userData.companySize,
            role: userData.role,
          }
        }
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        const user = await convertSupabaseUser(data.user);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
        
        return { success: true, user };
      }

      throw new Error('Registration failed - no user data returned');
    } catch (error) {
      const errorMessage = error instanceof AuthError 
        ? error.message 
        : error instanceof Error 
        ? error.message 
        : 'Registration failed';
      
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      
      return { success: false, error: errorMessage };
    }
  }, [convertSupabaseUser]);

  const logout = useCallback(async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }

      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear local state
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    }
  }, []);

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  // Initialize auth state from Supabase session
  const initializeAuth = useCallback(async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        return;
      }

      if (session?.user) {
        const user = await convertSupabaseUser(session.user);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  }, [convertSupabaseUser]);

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const user = await convertSupabaseUser(session.user);
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } else if (event === 'SIGNED_OUT') {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
          });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [convertSupabaseUser]);

  return {
    ...authState,
    login,
    register,
    logout,
    clearError,
    initializeAuth
  };
};