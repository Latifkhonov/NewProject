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
  
  private baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';