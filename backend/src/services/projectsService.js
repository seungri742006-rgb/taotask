import api from './api';

const projectsService = {
  fetchProjects: async () => {
    try {
      const response = await api.get('/projects');
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể tải danh sách project');
    }
  },

  createProject: async (projectData) => {
    try {
      const response = await api.post('/projects', projectData);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể lưu project');
    }
  },

  updateProject: async (projectId, projectData) => {
    try {
      const response = await api.put(`/projects/${projectId}`, projectData);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể cập nhật project');
    }
  },

  deleteProject: async (projectId) => {
    try {
      await api.delete(`/projects/${projectId}`);
      return { success: true };
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Không thể xóa project');
    }
  },
};

export default projectsService;
