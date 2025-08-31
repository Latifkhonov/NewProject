@@ .. @@
   async login(credentials: LoginFormData) {
     const response = await this.request('/auth/login', {
       method: 'POST',
       body: JSON.stringify(credentials),
     });
    
    // Store token if provided
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }
    
     return response;
   }

@@ .. @@
   async register(userData: RegisterFormData) {
     const response = await this.request('/auth/register', {
       method: 'POST',
       body: JSON.stringify(userData),
     });
    
    // Store token if provided
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }
    
     return response;
   }

@@ .. @@
   async logout() {
    const response = await this.request('/auth/logout', {
       method: 'POST',
     });
    
    // Clear stored token
    localStorage.removeItem('authToken');
    
    return response;
   }

@@ .. @@
   private async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('authToken');
    
     const config: RequestInit = {
       headers: {
         'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
         ...options.headers,
       },
      mode: 'cors',
       ...options,
     };

     try {
       const response = await fetch(`${this.baseURL}${endpoint}`, config);
       
       if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
       }
       
       return await response.json();
     } catch (error) {
      console.error('API request failed:', error);
      console.error('Request URL:', `${this.baseURL}${endpoint}`);
      console.error('Request config:', config);
       throw error;
     }
   }
  
  private baseURL = (() => {
    // Check if we have a custom API URL from environment
    if (import.meta.env.VITE_API_URL) {
      return import.meta.env.VITE_API_URL;
    }
    
    // In WebContainer environment, use the same origin with port 3001
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname.includes('webcontainer-api.io') || hostname.includes('local-credentialless')) {
        // Use the same protocol and hostname but port 3001
        return `${window.location.protocol}//${hostname.replace('5173', '3001')}/api`;
      }
    }
    
    // Default to localhost for local development
    return 'http://localhost:3001/api';
  })();