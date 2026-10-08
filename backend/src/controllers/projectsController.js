const storageService = require('../services/storageService');

function getProjects(req, res) {
  const projects = storageService.getUserProjects(req.user.userId);

  return res.status(200).json({
    success: true,
    data: projects,
  });
}

function createProject(req, res) {
  const { name, desc, date, color } = req.body;

  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Tên project là bắt buộc',
    });
  }

  const projects = storageService.getUserProjects(req.user.userId);
  const project = {
    id: Date.now(),
    name: name.trim(),
    desc: typeof desc === 'string' && desc.trim() ? desc.trim() : 'Dự án mới được thêm vào',
    progress: 0,
    color: typeof color === 'string' ? color : 'blue',
    date: typeof date === 'string' && date ? date : new Date().toLocaleDateString('vi-VN'),
    createdAt: new Date().toISOString(),
  };

  if (!storageService.saveUserProjects(req.user.userId, [project, ...projects])) {
    return res.status(500).json({
      success: false,
      error: 'Không thể lưu project',
    });
  }

  return res.status(201).json({
    success: true,
    data: project,
  });
}

function updateProject(req, res) {
  const { id } = req.params;
  const { name, desc, date, color } = req.body;
  const projects = storageService.getUserProjects(req.user.userId);
  const projectIndex = projects.findIndex((project) => String(project.id) === String(id));

  if (projectIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Không tìm thấy project',
    });
  }

  if (name !== undefined && (typeof name !== 'string' || !name.trim())) {
    return res.status(400).json({
      success: false,
      error: 'Tên project là bắt buộc',
    });
  }

  const currentProject = projects[projectIndex];
  const updatedProject = {
    ...currentProject,
    name: name !== undefined ? name.trim() : currentProject.name,
    desc: desc !== undefined ? desc : currentProject.desc,
    date: date !== undefined ? date : currentProject.date,
    color: color !== undefined ? color : currentProject.color,
    updatedAt: new Date().toISOString(),
  };
  projects[projectIndex] = updatedProject;

  if (!storageService.saveUserProjects(req.user.userId, projects)) {
    return res.status(500).json({
      success: false,
      error: 'Không thể cập nhật project',
    });
  }

  return res.status(200).json({
    success: true,
    data: updatedProject,
  });
}

function deleteProject(req, res) {
  const projects = storageService.getUserProjects(req.user.userId);
  const remainingProjects = projects.filter((project) => String(project.id) !== String(req.params.id));

  if (remainingProjects.length === projects.length) {
    return res.status(404).json({
      success: false,
      error: 'Không tìm thấy project',
    });
  }

  if (!storageService.saveUserProjects(req.user.userId, remainingProjects)) {
    return res.status(500).json({
      success: false,
      error: 'Không thể xóa project',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Xóa project thành công',
  });
}

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};
