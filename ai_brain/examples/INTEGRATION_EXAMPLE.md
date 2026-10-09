# 💡 examples/INTEGRATION_EXAMPLE.md - Ví dụ Mẫu Tích hợp API

## 📌 Mục đích
Cung cấp ví dụ thực tế về cách một Service phía Frontend gọi API xuống Backend Express, tuân thủ đúng chuẩn kiến trúc của dự án.

---

## 💻 Code Example: Notes Service & Component Integration

### 1. Service Layer (`frontend/src/services/notesService.js`)
```javascript
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
  }
};

export default notesService;
```

### 2. Controller Layer (`backend/src/controllers/notesController.js`)
```javascript
const jsonStorageService = require('../services/jsonStorageService');

function getNotes(req, res) {
  try {
    const userId = req.user.id;
    const notes = jsonStorageService.readNotes(userId);
    res.json({ success: true, data: notes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { getNotes };
```
