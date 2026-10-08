import api from './api';

const settingsService = {
  fetchSettings: async () => {
    try {
      const response = await api.get('/settings');
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể tải cài đặt');
    }
  },

  updateSettings: async (settingsData) => {
    try {
      const response = await api.put('/settings', settingsData);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể lưu cài đặt');
    }
  },
};

export default settingsService;
