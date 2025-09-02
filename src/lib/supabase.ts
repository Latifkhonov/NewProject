import { createClient } from '@supabase/supabase-js';

// Environment variables - these should be set in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Provide default values for development if environment variables are not set
const defaultUrl = 'https://your-project-ref.supabase.co';
const defaultKey = 'your-anon-key-here';

// Create Supabase client with WebContainer-optimized configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    flowType: 'implicit'
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