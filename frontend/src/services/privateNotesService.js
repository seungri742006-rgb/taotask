import api from './api';

const privateNotesService = {
  fetchPrivateNotes: async () => {
    try {
      const response = await api.get('/private-notes');
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể tải ghi chú riêng tư');
    }
  },

  createPrivateNote: async (noteData) => {
    try {
      const response = await api.post('/private-notes', noteData);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể tạo ghi chú riêng tư');
    }
  },

  unlockPrivateNote: async (noteId, password) => {
    try {
      const response = await api.post(`/private-notes/${noteId}/decrypt`, { password });
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Mật khẩu giải mã không chính xác');
    }
  },

  updatePrivateNote: async (noteId, noteData) => {
    try {
      const response = await api.put(`/private-notes/${noteId}`, noteData);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể cập nhật ghi chú riêng tư');
    }
  },

  deletePrivateNote: async (noteId) => {
    try {
      await api.delete(`/private-notes/${noteId}`);
      return { success: true };
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể xóa ghi chú riêng tư');
    }
  },
};

export default privateNotesService;
