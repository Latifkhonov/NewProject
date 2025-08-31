import { createClient } from '@supabase/supabase-js';

// Environment variables - these should be set in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

// Custom fetch function for WebContainer environment
const customFetch = (url: RequestInfo | URL, options?: RequestInit) => {
  const enhancedOptions: RequestInit = {
    ...options,
    credentials: 'include',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Service-Worker': 'bypass',
      'X-Requested-With': 'XMLHttpRequest',
      ...options?.headers,
    },
  };

  return fetch(url, enhancedOptions);
};

// Create Supabase client with WebContainer-optimized configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    // Disable email confirmation for development
    confirmationUrl: undefined,
  },
  global: {
    fetch: customFetch,
    headers: {
      'Cache-Control': 'no-cache',
      'Service-Worker': 'bypass',
    },
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Database types (will be generated from your schema)
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          company_name: string | null;
          phone: string | null;
          company_size: string | null;
          role: 'buyer' | 'supplier' | 'admin';
          is_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          company_name?: string | null;
          phone?: string | null;
          company_size?: string | null;
          role?: 'buyer' | 'supplier' | 'admin';
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          company_name?: string | null;
          phone?: string | null;
          company_size?: string | null;
          role?: 'buyer' | 'supplier' | 'admin';
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};