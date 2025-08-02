export interface User {
  id: string;
  email: string;
  name: string;
  companyName?: string;
  phone?: string;
  companySize?: string;
  role: 'buyer' | 'supplier' | 'admin';
  isVerified: boolean;
  createdAt: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  companyName: string;
  phone: string;
  companySize: string;
  role: 'buyer' | 'supplier';
  agreeToTerms: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}