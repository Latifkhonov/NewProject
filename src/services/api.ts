class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = this.getApiUrl();
    console.log('API Service initialized with URL:', this.baseURL);
  }

  private getApiUrl(): string {
    // Check for environment variable first
    if (import.meta.env.VITE_API_URL) {
      return import.meta.env.VITE_API_URL;
    }

    // In browser environment
    if (typeof window !== 'undefined') {
      const currentUrl = window.location;
      const hostname = currentUrl.hostname;
      const protocol = currentUrl.protocol;
      
      console.log('Current URL details:', {
        hostname,
        protocol,
        port: currentUrl.port,
        origin: currentUrl.origin
      });

      // WebContainer environment detection
      if (hostname.includes('webcontainer-api.io') || 
          hostname.includes('local-credentialless') ||
          hostname.includes('github.dev') ||
          hostname.includes('gitpod.io') ||
          hostname.includes('replit.dev') ||
          hostname.includes('stackblitz.io')) {
        
        // For WebContainer, use the same hostname but port 3001
        // Replace the port in the hostname if it exists
        const baseHostname = hostname.replace(/--\d+--/, '--3001--');
        const apiUrl = `${protocol}//${baseHostname}/api`;
        console.log('WebContainer detected, using API URL:', apiUrl);
        return apiUrl;
      }

      // Local development
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        const apiUrl = `${protocol}//localhost:3001/api`;
        console.log('Local development detected, using API URL:', apiUrl);
        return apiUrl;
      }
    }

    // Fallback
    const fallbackUrl = 'http://localhost:3001/api';
    console.log('Using fallback API URL:', fallbackUrl);
    return fallbackUrl;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('authToken');
    const url = `${this.baseURL}${endpoint}`;
    
    // Enhanced fetch configuration to bypass Service Worker
    const config: RequestInit = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Service-Worker': 'bypass', // Custom header to signal Service Worker bypass
        'X-Requested-With': 'XMLHttpRequest',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      mode: 'cors',
      credentials: 'include',
      cache: 'no-cache', // Prevent Service Worker caching
      redirect: 'follow',
      referrerPolicy: 'no-referrer-when-downgrade',
      ...options,
    };

    console.log('Making API request:', {
      url,
      method: config.method,
      headers: config.headers,
      hasBody: !!config.body
    });

    try {
      // Add a small delay to ensure Service Worker doesn't interfere
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const response = await fetch(url, config);
      
      console.log('API response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
        console.error('API error response:', errorData);
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('API success response:', data);
      return data;
    } catch (error) {
      console.error('API request failed:', {
        error: error.message,
        url,
        config
      });
      
      // If it's a network error, try alternative approaches
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        console.log('Network error detected, attempting fallback...');
        throw new Error('Network connection failed. Please check your connection and try again.');
      }
      
      throw error;
    }
  }

  async login(credentials: { email: string; password: string; rememberMe?: boolean }) {
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

  async register(userData: any) {
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

  async logout() {
    const response = await this.request('/auth/logout', {
      method: 'POST',
    });
    
    // Clear stored token
    localStorage.removeItem('authToken');
    
    return response;
  }
}

export const apiService = new ApiService();