import apiClient from './apiClient';

const DEMO_USER = {
  id: 'demo-user-123',
  email: 'demo@skillhub.com',
  name: 'Demo User',
  role: 'STUDENT',
  avatar: null,
};

const DEMO_TOKEN = 'demo-token-xyz';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  login: async (credentials: any) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.warn('Backend unreachable, switching to Demo Mode');
      await delay(1000); // Simulate network delay
      return {
        accessToken: DEMO_TOKEN,
        user: { ...DEMO_USER, email: credentials.email },
      };
    }
  },

  signup: async (userData: any) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.warn('Backend unreachable, switching to Demo Mode');
      await delay(1000);
      return {
        accessToken: DEMO_TOKEN,
        user: {
          ...DEMO_USER,
          email: userData.email,
          name: `${userData.firstName} ${userData.lastName}`
        },
      };
    }
  },

  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return Promise.resolve();
  },

  getMe: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error) {
      // If token is demo token, return demo user
      const token = localStorage.getItem('token');
      if (token === DEMO_TOKEN) {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : DEMO_USER;
      }
      throw error;
    }
  },
};
