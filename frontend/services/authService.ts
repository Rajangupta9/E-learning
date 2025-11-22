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
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  signup: async (userData: any) => {
    // Transform frontend data to match backend expectations
    const payload = {
      email: userData.email,
      password: userData.password,
      name: userData.firstName && userData.lastName
        ? `${userData.firstName} ${userData.lastName}`
        : userData.name || userData.firstName || userData.lastName || 'User'
    };
    const response = await apiClient.post('/auth/register', payload);
    return response.data;
  },

  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return Promise.resolve();
  },

  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};
