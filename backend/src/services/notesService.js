import api from './api';

const notesService = {
  fetchNotes: async () => {
    try {
      const response = await api.get('/notes');
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể tải danh sách ghi chú');
    }
  },

  createNote: async (noteData) => {
    try {
      const response = await api.post('/notes', noteData);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể tạo ghi chú');
    }
  },

  updateNote: async (noteId, noteData) => {
    try {
      const response = await api.put(`/notes/${noteId}`, noteData);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể cập nhật ghi chú');
    }
  },

  deleteNote: async (noteId) => {
    try {
      await api.delete(`/notes/${noteId}`);
      return { success: true };
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể xóa ghi chú');
    }
  },
};

export default notesService;
