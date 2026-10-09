import api from './api';

const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Đăng nhập thất bại');
    }
  },

  register: async (email, password, name) => {
    try {
      const response = await api.post('/auth/register', { email, password, name });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Đăng ký thất bại');
    }
  },

  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      localStorage.removeItem('token');
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      throw new Error(error.response?.data?.error || 'Đăng xuất thất bại');
    }
  },
};

export default authService;
