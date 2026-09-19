# 📝 CODING_STANDARDS.md - Tiêu chuẩn Viết Code

---

## 📌 Quy tắc chung cho tất cả files

### **1. Indentation & Spacing**
```javascript
// ✅ ĐÚNG - 2 spaces
function login(email, password) {
  if (email) {
    return true;
  }
}

// ❌ SAI - 4 spaces hoặc tabs
function login(email, password) {
    if (email) {
        return true;
    }
}

// ✅ ĐÚNG - Dòng trống giữa các hàm
function login() {
  // logic
}

function logout() {
  // logic
}

// ❌ SAI - Không dòng trống
function login() {
  // logic
}
function logout() {
  // logic
}
```

### **2. Line Length**
- **Tối đa 100 ký tự mỗi dòng**
- Nếu dài hơn, ngắt thành nhiều dòng

```javascript
// ✅ ĐÚNG
const longFunctionName = (parameter1, parameter2, parameter3) => {
  return parameter1 + parameter2 + parameter3;
};

// ❌ SAI - Quá dài
const longFunctionName = (parameter1, parameter2, parameter3) => { return parameter1 + parameter2 + parameter3; };
```

### **3. Trailing Commas**
```javascript
// ✅ ĐÚNG
const user = {
  name: "John",
  email: "john@example.com",
  age: 30,  // Dấu phẩy ở cuối
};

// Acceptable (nhưng thống nhất với team)
const user = {
  name: "John",
  email: "john@example.com",
  age: 30
};
```

### **4. Semicolons**
```javascript
// ✅ ĐÚNG - Luôn có semicolon
const name = "John";
const age = 30;

function sayHello() {
  console.log("Hello");
}
```

---

## 🎯 **NAMING CONVENTIONS (Quy tắc đặt tên)**

### **Files & Folders**

| Loại | Convention | Ví dụ |
|------|-----------|-------|
| **React Components** | `PascalCase.jsx` | `NoteCard.jsx`, `UserProfile.jsx` |
| **JS Services** | `camelCase.js` | `authService.js`, `notesService.js` |
| **Utilities** | `camelCase.js` | `dateFormat.js`, `validation.js` |
| **Folders** | `kebab-case` hoặc `camelCase` | `src/components/`, `src/services/` |
| **CSS Files** | `kebab-case.css` | `global-styles.css`, `note-card.css` |

### **Variables & Constants**

```javascript
// ✅ ĐÚNG
const USER_MAX_LENGTH = 50;  // Hằng số toàn cục: UPPER_SNAKE_CASE
let currentUser = null;       // Biến: camelCase
const isLoading = true;       // Boolean: is/has prefix
const getUserName = () => {}; // Hàm: động từ + danh từ

// ❌ SAI
const UserMaxLength = 50;     // Không phải UPPER_CASE
let current_user = null;      // Không dùng snake_case
const loading = true;         // Không rõ là boolean
const getUser = () => {};     // Không rõ là getter

// ✅ ĐÚNG - Tiền tố cho boolean
const isAdmin = true;
const hasPermission = false;
const canEdit = true;
const shouldRefresh = false;
```

### **React Components**

```javascript
// ✅ ĐÚNG
const NoteCard = ({ note, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleDeleteClick = () => {
    onDelete(note.id);
  };
  
  return <div>{note.title}</div>;
};

export default NoteCard;

// ❌ SAI
const noteCard = ({ note, onDelete }) => {  // Component phải PascalCase
  const [editing, setEditing] = useState(false);  // Thiếu is prefix
  
  const deleteClick = () => {  // Thiếu handle prefix
    onDelete(note.id);
  };
};
```

### **Event Handlers**

```javascript
// ✅ ĐÚNG - handle + DOMEvent hoặc handleVerbNoun
const handleClick = () => {};
const handleSubmit = (e) => {};
const handleChangeTheme = (theme) => {};
const handleDeleteNote = (noteId) => {};

// Props naming
<NoteCard onDelete={handleDeleteNote} />  // on + VerbNoun

// ❌ SAI
const onClick = () => {};  // Không có handle
const deleteNote = () => {};  // Không rõ là event handler
```

---

## 🟢 **BACKEND (Node.js/Express)**

### **1. Cấu trúc Route**

```javascript
// ✅ ĐÚNG - routes/notes.routes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const notesController = require('../controllers/notesController');

const router = express.Router();

// GET all notes
router.get('/', authMiddleware, notesController.getNotes);

// POST create note
router.post('/', authMiddleware, notesController.createNote);

// PUT update note
router.put('/:id', authMiddleware, notesController.updateNote);

// DELETE note
router.delete('/:id', authMiddleware, notesController.deleteNote);

module.exports = router;
```

### **2. Controllers**

```javascript
// ✅ ĐÚNG - controllers/notesController.js
const jsonStorageService = require('../services/jsonStorageService');

const notesController = {
  // GET
  getNotes: async (req, res) => {
    try {
      const userId = req.user.id;  // từ authMiddleware
      const notes = await jsonStorageService.readNotes(userId);
      
      res.json({
        success: true,
        data: notes
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  // POST
  createNote: async (req, res) => {
    try {
      const { title, content, category } = req.body;
      const userId = req.user.id;

      // Validation
      if (!title || !content) {
        return res.status(400).json({
          success: false,
          error: 'Title and content are required'
        });
      }

      const note = await jsonStorageService.createNote(
        userId,
        { title, content, category }
      );

      res.status(201).json({
        success: true,
        data: note
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },
};

module.exports = notesController;
```

### **3. Services**

```javascript
// ✅ ĐÚNG - services/jsonStorageService.js
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const JSON_STORAGE_PATH = path.join(__dirname, '../data/users');

const jsonStorageService = {
  // Đọc notes
  readNotes: async (userId) => {
    const filePath = path.join(JSON_STORAGE_PATH, userId, 'notes.json');
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data).notes || [];
    } catch (error) {
      if (error.code === 'ENOENT') return [];
      throw error;
    }
  },

  // Ghi notes
  writeNotes: async (userId, notes) => {
    const filePath = path.join(JSON_STORAGE_PATH, userId, 'notes.json');
    const data = { notes };
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  },

  // Tạo note
  createNote: async (userId, noteData) => {
    const notes = await jsonStorageService.readNotes(userId);
    
    const newNote = {
      id: `note_${Date.now()}`,
      ...noteData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isArchived: false
    };

    notes.push(newNote);
    await jsonStorageService.writeNotes(userId, notes);
    
    return newNote;
  },
};

module.exports = jsonStorageService;
```

### **4. Error Handling**

```javascript
// ✅ ĐÚNG - Centralized error handling
router.post('/notes', async (req, res) => {
  try {
    // Logic
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

// ✅ ĐÚNG - Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

router.post('/notes', async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) {
      throw new AppError('Title is required', 400);
    }
    // ...
  } catch (error) {
    next(error);  // Pass to error middleware
  }
});
```

---

## ⚛️ **FRONTEND (React)**

### **1. Component Structure**

```javascript
// ✅ ĐÚNG - NoteCard.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './NoteCard.css';

const NoteCard = ({ note, onDelete, onEdit }) => {
  // State
  const [isHovering, setIsHovering] = useState(false);

  // Effects
  useEffect(() => {
    console.log('Note card mounted:', note.id);
  }, [note.id]);

  // Event handlers
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  const handleDeleteClick = () => onDelete(note.id);
  const handleEditClick = () => onEdit(note.id);

  // Render
  return (
    <div
      className="note-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3>{note.title}</h3>
      <p>{note.content.substring(0, 50)}...</p>
      
      {isHovering && (
        <div className="actions">
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
    </div>
  );
};

// PropTypes validation
NoteCard.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default NoteCard;
```

### **2. Custom Hooks**

```javascript
// ✅ ĐÚNG - hooks/useNotes.js
import { useContext, useCallback } from 'react';
import { NotesContext } from '../context/NotesContext';
import notesService from '../services/notesService';

const useNotes = () => {
  const { notes, dispatch } = useContext(NotesContext);

  const fetchNotes = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const data = await notesService.fetchNotes();
      dispatch({ type: 'SET_NOTES', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch]);

  const addNote = useCallback(async (noteData) => {
    try {
      const newNote = await notesService.createNote(noteData);
      dispatch({ type: 'ADD_NOTE', payload: newNote });
      return newNote;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  }, [dispatch]);

  return {
    notes,
    fetchNotes,
    addNote,
  };
};

export default useNotes;
```

### **3. Services / API Calls**

```javascript
// ✅ ĐÚNG - services/notesService.js
import api from './api';

const notesService = {
  fetchNotes: async () => {
    try {
      const response = await api.get('/notes');
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch notes');
    }
  },

  createNote: async (noteData) => {
    try {
      const response = await api.post('/notes', noteData);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to create note');
    }
  },

  updateNote: async (noteId, noteData) => {
    try {
      const response = await api.put(`/notes/${noteId}`, noteData);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update note');
    }
  },

  deleteNote: async (noteId) => {
    try {
      await api.delete(`/notes/${noteId}`);
      return { success: true };
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to delete note');
    }
  },
};

export default notesService;
```

---

## 📋 **COMMENTS & DOCUMENTATION**

### **Khi viết comments:**

```javascript
// ✅ ĐÚNG - Comments rõ ràng, ngắn gọn
// Verify user is authenticated before processing
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }
  // ...
};

// ✅ ĐÚNG - JSDoc cho functions quan trọng
/**
 * Encrypt content using AES-256-CBC
 * @param {string} plaintext - Content to encrypt
 * @param {string} password - Encryption password
 * @returns {string} Encrypted content
 */
const encryptContent = (plaintext, password) => {
  // ...
};

// ❌ SAI - Comments mô tả hiển nhiên
const age = 30; // Set age to 30

// ❌ SAI - Comments viết tiếng Việt không chuẩn (nên viếng Anh)
// Lấy token từ header
const token = req.headers.authorization;
```

---

## ✅ **DO'S & DON'TS**

### **Backend**

| ✅ DO | ❌ DON'T |
|------|---------|
| Lấy userId từ JWT token (req.user.id) | Hardcode user ID |
| Return standard response format | Trả về data không consistent |
| Validate input trước xử lý | Skip validation |
| Lưu password hash, không plaintext | Lưu password plaintext |
| Use async/await, không callback hell | Callback nested sâu |
| Centralized error handling | Throw errors bừa bãi |

### **Frontend**

| ✅ DO | ❌ DON'T |
|------|---------|
| Dùng Context API + Hooks | Props drilling quá sâu |
| Component tái sử dụng nhỏ, focused | Mega component 500+ dòng |
| Fetch data trong useEffect | Fetch directly in render |
| PropTypes validation | Skip type checking |
| Loading/Error states | Không handle async states |

---

## 🔍 **QUICK CHECKLIST**

- [ ] Indentation: 2 spaces
- [ ] Line length: < 100 characters
- [ ] Naming: camelCase (biến), PascalCase (Component), UPPER_SNAKE_CASE (const)
- [ ] Event handlers: handle + Verb + Noun
- [ ] Comments: English, concise, meaningful
- [ ] Error handling: try-catch + standard response
- [ ] PropTypes: All components có validation
- [ ] No console.log (hoặc dùng logger)
- [ ] No hardcoded values (dùng constants)
- [ ] Consistent response format từ API

---

