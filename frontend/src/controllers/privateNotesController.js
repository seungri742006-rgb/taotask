const storageService = require('../services/storageService');
const { encryptText, decryptText } = require('../services/encryption');

function getPrivateNotes(req, res) {
  const userId = req.user.userId;
  const privateNotes = storageService.getUserPrivateNotes(userId);

  return res.status(200).json({
    success: true,
    data: privateNotes.map((note) => ({
      id: note.id,
      title: note.title,
      category: note.category,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
      isEncrypted: true,
    })),
  });
}

function createPrivateNote(req, res) {
  const userId = req.user.userId;
  const { title, content, text, category, password } = req.body;

  const rawContent = content || text || '';

  if (!rawContent || !password) {
    return res.status(400).json({
      success: false,
      error: 'Nội dung ghi chú và mật khẩu bảo mật là bắt buộc',
    });
  }

  const encryptedContent = encryptText(rawContent, password);
  const privateNotes = storageService.getUserPrivateNotes(userId);
  const now = new Date().toISOString();

  const newNote = {
    id: `pnote_${Date.now()}`,
    title: title || 'Ghi chú riêng tư',
    encryptedContent,
    category: category || 'Riêng tư',
    createdAt: now,
    updatedAt: now,
  };

  privateNotes.unshift(newNote);
  storageService.saveUserPrivateNotes(userId, privateNotes);

  return res.status(201).json({
    success: true,
    data: {
      id: newNote.id,
      title: newNote.title,
      category: newNote.category,
      createdAt: newNote.createdAt,
      updatedAt: newNote.updatedAt,
      content: rawContent,
    },
  });
}

function unlockPrivateNote(req, res) {
  const userId = req.user.userId;
  const { id } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      success: false,
      error: 'Mật khẩu mở khóa là bắt buộc',
    });
  }

  const privateNotes = storageService.getUserPrivateNotes(userId);
  const note = privateNotes.find((n) => String(n.id) === String(id));

  if (!note) {
    return res.status(404).json({
      success: false,
      error: 'Không tìm thấy ghi chú riêng tư',
    });
  }

  try {
    const decryptedContent = decryptText(note.encryptedContent, password);
    return res.status(200).json({
      success: true,
      data: {
        id: note.id,
        title: note.title,
        content: decryptedContent,
        text: decryptedContent,
        category: note.category,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: 'Mật khẩu giải mã không chính xác',
    });
  }
}

function updatePrivateNote(req, res) {
  const userId = req.user.userId;
  const { id } = req.params;
  const { title, content, text, category, password } = req.body;

  const privateNotes = storageService.getUserPrivateNotes(userId);
  const noteIndex = privateNotes.findIndex((n) => String(n.id) === String(id));

  if (noteIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Không tìm thấy ghi chú riêng tư',
    });
  }

  const existingNote = privateNotes[noteIndex];
  const rawContent = content !== undefined ? content : text;

  let encryptedContent = existingNote.encryptedContent;
  if (rawContent && password) {
    encryptedContent = encryptText(rawContent, password);
  }

  const updatedNote = {
    ...existingNote,
    title: title !== undefined ? title : existingNote.title,
    encryptedContent,
    category: category !== undefined ? category : existingNote.category,
    updatedAt: new Date().toISOString(),
  };

  privateNotes[noteIndex] = updatedNote;
  storageService.saveUserPrivateNotes(userId, privateNotes);

  return res.status(200).json({
    success: true,
    data: {
      id: updatedNote.id,
      title: updatedNote.title,
      category: updatedNote.category,
      updatedAt: updatedNote.updatedAt,
    },
  });
}

function deletePrivateNote(req, res) {
  const userId = req.user.userId;
  const { id } = req.params;

  let privateNotes = storageService.getUserPrivateNotes(userId);
  const initialLength = privateNotes.length;

  privateNotes = privateNotes.filter((n) => String(n.id) !== String(id));

  if (privateNotes.length === initialLength) {
    return res.status(404).json({
      success: false,
      error: 'Không tìm thấy ghi chú riêng tư',
    });
  }

  storageService.saveUserPrivateNotes(userId, privateNotes);

  return res.status(200).json({
    success: true,
    message: 'Xóa ghi chú riêng tư thành công',
  });
}

module.exports = {
  getPrivateNotes,
  createPrivateNote,
  unlockPrivateNote,
  updatePrivateNote,
  deletePrivateNote,
};
