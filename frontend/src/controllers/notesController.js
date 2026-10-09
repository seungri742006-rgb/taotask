/**
 * @file notesController.js
 * @description Controller xử lý CRUD ghi chú công khai của người dùng.
 */

const storageService = require('../services/storageService');

/**
 * Lấy tất cả ghi chú công khai của user đang đăng nhập
 * @param {import('express').Request} req - Request object chứa thông tin user từ token
 * @param {import('express').Response} res - Response object
 */
function getNotes(req, res) {
  const userId = req.user.userId;
  const notes = storageService.getUserNotes(userId);

  return res.status(200).json({
    success: true,
    data: notes,
  });
}

/**
 * Tạo ghi chú mới
 * @param {import('express').Request} req - Request object chứa title, content, category, color, projectId
 * @param {import('express').Response} res - Response object
 */
function createNote(req, res) {
  const userId = req.user.userId;
  const { title, content, text, category, color, projectId } = req.body;

  const noteContent = content || text || '';

  if (!title && !noteContent) {
    return res.status(400).json({
      success: false,
      error: 'Tiêu đề hoặc nội dung ghi chú là bắt buộc',
    });
  }

  const notes = storageService.getUserNotes(userId);
  const now = new Date().toISOString();

  const newNote = {
    id: `note_${Date.now()}`,
    projectId: projectId || null,
    title: title || 'Ghi chú mới',
    content: noteContent,
    text: noteContent,
    category: category || 'Ghi chú',
    color: color || 'yellow',
    createdAt: now,
    updatedAt: now,
    isArchived: false,
  };

  notes.unshift(newNote);
  storageService.saveUserNotes(userId, notes);

  return res.status(201).json({
    success: true,
    data: newNote,
  });
}

/**
 * Cập nhật ghi chú theo ID
 * @param {import('express').Request} req - Request object chứa note ID trong params và dữ liệu cập nhật trong body
 * @param {import('express').Response} res - Response object
 */
function updateNote(req, res) {
  const userId = req.user.userId;
  const { id } = req.params;
  const { title, content, text, category, color, projectId, isArchived } = req.body;

  const notes = storageService.getUserNotes(userId);
  const noteIndex = notes.findIndex((n) => String(n.id) === String(id));

  if (noteIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Không tìm thấy ghi chú',
    });
  }

  const note = notes[noteIndex];
  const updatedContent = content !== undefined ? content : text !== undefined ? text : note.content;

  const updatedNote = {
    ...note,
    title: title !== undefined ? title : note.title,
    content: updatedContent,
    text: updatedContent,
    category: category !== undefined ? category : note.category,
    color: color !== undefined ? color : note.color,
    projectId: projectId !== undefined ? projectId : note.projectId,
    isArchived: isArchived !== undefined ? isArchived : note.isArchived,
    updatedAt: new Date().toISOString(),
  };

  notes[noteIndex] = updatedNote;
  storageService.saveUserNotes(userId, notes);

  return res.status(200).json({
    success: true,
    data: updatedNote,
  });
}

/**
 * Xóa ghi chú theo ID
 * @param {import('express').Request} req - Request object chứa note ID trong params
 * @param {import('express').Response} res - Response object
 */
function deleteNote(req, res) {
  const userId = req.user.userId;
  const { id } = req.params;

  let notes = storageService.getUserNotes(userId);
  const initialLength = notes.length;

  notes = notes.filter((n) => String(n.id) !== String(id));

  if (notes.length === initialLength) {
    return res.status(404).json({
      success: false,
      error: 'Không tìm thấy ghi chú',
    });
  }

  storageService.saveUserNotes(userId, notes);

  return res.status(200).json({
    success: true,
    message: 'Xóa ghi chú thành công',
  });
}

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};

