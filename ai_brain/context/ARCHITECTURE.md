# 🏗️ ARCHITECTURE.md - Kiến trúc Hệ thống

---

## 📐 Sơ đồ kiến trúc tổng thể

```
┌─────────────────────────────────────────────────────────────┐
│                    WEB BROWSER (Client)                     │
├─────────────────────────────────────────────────────────────┤
│  React App (Vite)                                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Pages Layer                                         │   │
│  │  - Dashboard, NotesPage, PrivateNotesPage,          │   │
│  │    SettingsPage, LoginPage                          │   │
│  └──────┬───────────────────────────────────────────────┘   │
│         │                                                    │
│  ┌──────▼──────────────────────────────────────────────┐   │
│  │  Components Layer                                   │   │
│  │  - Layout (Navbar, Sidebar)                         │   │
│  │  - Notes (NoteCard, NoteList, NoteForm)             │   │
│  │  - PrivateNotes (PrivateNoteModal, Form)            │   │
│  │  - Settings (ThemeToggle, ColorPicker)              │   │
│  │  - Common (Button, Modal, Loading)                  │   │
│  └──────┬───────────────────────────────────────────────┘   │
│         │                                                    │
│  ┌──────▼──────────────────────────────────────────────┐   │
│  │  State Management Layer (Context API)               │   │
│  │  - ThemeContext (light/dark)                        │   │
│  │  - UserContext (auth, profile)                      │   │
│  │  - NotesContext (notes list)                        │   │
│  │  - SettingsContext (primaryColor, user settings)    │   │
│  └──────┬───────────────────────────────────────────────┘   │
│         │                                                    │
│  ┌──────▼──────────────────────────────────────────────┐   │
│  │  Services Layer (API Calls)                         │   │
│  │  - api.js (Axios instance)                          │   │
│  │  - authService.js (login, register, logout)         │   │
│  │  - notesService.js (CRUD notes)                     │   │
│  │  - privateNotesService.js (CRUD private)            │   │
│  │  - settingsService.js (save theme, color)           │   │
│  └──────┬───────────────────────────────────────────────┘   │
│         │                                                    │
│         │ HTTP/REST API (JSON)                             │
└─────────┼──────────────────────────────────────────────────┘
          │
          │ Axios requests → GET/POST/PUT/DELETE
          │
┌─────────▼─────────────────────────────────────────────────┐
│              EXPRESS SERVER (Port 5000)                    │
├──────────────────────────────────────────────────────────┤
│  Route Layer (api/routes/)                               │
│  ┌────────────────────────────────────────────────────┐  │
│  │ POST   /auth/register                             │  │
│  │ POST   /auth/login                                │  │
│  │ POST   /auth/logout                               │  │
│  │ GET    /notes (get all notes for user)            │  │
│  │ POST   /notes (create note)                       │  │
│  │ PUT    /notes/:id (update note)                   │  │
│  │ DELETE /notes/:id (delete note)                   │  │
│  │ GET    /private-notes                             │  │
│  │ POST   /private-notes (with password)             │  │
│  │ PUT    /private-notes/:id                         │  │
│  │ DELETE /private-notes/:id                         │  │
│  │ GET    /settings (get user settings)              │  │
│  │ PUT    /settings (update theme, color)            │  │
│  └─────────┬──────────────────────────────────────────┘  │
│            │                                              │
│  ┌─────────▼──────────────────────────────────────────┐  │
│  │ Middleware Layer                                   │  │
│  │ - authMiddleware (JWT verification)                │  │
│  │ - errorHandler (try-catch wrapper)                 │  │
│  │ - validateInput (body validation)                  │  │
│  │ - corsMiddleware (CORS policy)                     │  │
│  └─────────┬──────────────────────────────────────────┘  │
│            │                                              │
│  ┌─────────▼──────────────────────────────────────────┐  │
│  │ Controller Layer                                   │  │
│  │ - authController (login, register logic)          │  │
│  │ - notesController (CRUD logic)                    │  │
│  │ - privateNotesController (encrypted CRUD)         │  │
│  │ - settingsController (user preferences)           │  │
│  └─────────┬──────────────────────────────────────────┘  │
│            │                                              │
│  ┌─────────▼──────────────────────────────────────────┐  │
│  │ Service Layer (Business Logic)                     │  │
│  │ - jsonStorageService (read/write JSON)            │  │
│  │ - authService (bcrypt, JWT)                       │  │
│  │ - encryptionService (AES-256 for private notes)   │  │
│  └─────────┬──────────────────────────────────────────┘  │
│            │                                              │
│            │ File I/O operations                          │
└────────────┼───────────────────────────────────────────┘
             │
┌────────────▼──────────────────────────────────────────┐
│     FILE SYSTEM (/backend/data/users/)               │
├─────────────────────────────────────────────────────┤
│                                                      │
│  users/                                             │
│  ├── user_001/                                      │
│  │   ├── profile.json (user info, theme, color)    │
│  │   ├── notes.json (array of public notes)        │
│  │   ├── privateNotes.json (encrypted)             │
│  │   └── settings.json (user preferences)          │
│  │                                                  │
│  ├── user_002/                                      │
│  │   ├── profile.json                              │
│  │   ├── notes.json                                │
│  │   ├── privateNotes.json                         │
│  │   └── settings.json                             │
│  │                                                  │
│  └── ... (more users)                              │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 🔄 Luồng dữ liệu chi tiết

### **1. Luồng Đăng ký (Register)**
```
User nhập email/password
        ↓
POST /auth/register { email, password }
        ↓
authController.register()
        ↓
authService.hashPassword(password) ← Bcrypt
        ↓
jsonStorageService.createUser()
        ↓
Tạo folder /data/users/[user_id]/
Tạo profile.json, notes.json, privateNotes.json, settings.json
        ↓
Return { userId, token }
        ↓
Frontend lưu token vào localStorage
        ↓
Redirect tới Dashboard
```

### **2. Luồng Đăng nhập (Login)**
```
User nhập email/password
        ↓
POST /auth/login { email, password }
        ↓
authController.login()
        ↓
jsonStorageService.findUserByEmail()
        ↓
authService.comparePassword(password, hash)
        ↓
JWT token generation (user_id, email, exp: 7 days)
        ↓
Return { token, user }
        ↓
Frontend lưu token vào localStorage
        ↓
Redirect tới Dashboard
```

### **3. Luồng Tạo Ghi chú (Create Note)**
```
User nhấp "New Note" → NoteForm component
        ↓
User nhập title, content, category
        ↓
POST /notes { title, content, category }
        ↓
authMiddleware (verify JWT)
        ↓
notesController.createNote()
        ↓
jsonStorageService.readNotes(user_id)
        ↓
Thêm note mới vào array
        ↓
jsonStorageService.writeNotes(user_id, updatedNotes)
        ↓
Return { id, title, content, ... }
        ↓
NotesContext.dispatch() update state
        ↓
Frontend re-render hiển thị note mới
```

### **4. Luồng Cài đặt Theme (Update Settings)**
```
User chọn Dark theme + màu #FF5733
        ↓
PUT /settings { theme: 'dark', primaryColor: '#FF5733' }
        ↓
authMiddleware verify
        ↓
settingsController.updateSettings()
        ↓
jsonStorageService.readProfile(user_id)
        ↓
Update theme + primaryColor
        ↓
jsonStorageService.writeProfile(user_id, updated)
        ↓
Return updated profile
        ↓
SettingsContext update → apply CSS variables
        ↓
Entire UI theme changes instantly
```

---

## 📁 File System Structure (Dữ liệu)

### **Ví dụ: User ID = "user_001"**

```
/backend/data/users/user_001/
├── profile.json
│   {
│     "id": "user_001",
│     "email": "john@example.com",
│     "passwordHash": "$2b$10$...",
│     "theme": "dark",
│     "primaryColor": "#3B82F6",
│     "createdAt": "2024-01-15T10:30:00Z",
│     "updatedAt": "2024-01-20T14:45:00Z"
│   }
│
├── notes.json
│   {
│     "notes": [
│       {
│         "id": "note_001",
│         "title": "Project Setup",
│         "content": "Initialize React...",
│         "category": "Development",
│         "createdAt": "2024-01-15T10:30:00Z",
│         "updatedAt": "2024-01-15T10:30:00Z",
│         "isArchived": false
│       },
│       ... more notes
│     ]
│   }
│
├── privateNotes.json
│   {
│     "privateNotes": [
│       {
│         "id": "pnote_001",
│         "title": "Secret Plan",
│         "contentEncrypted": "eyJhbGciOiJIUzI1NiI...",
│         "passwordHash": "$2b$10$...",
│         "createdAt": "2024-01-17T09:00:00Z"
│       },
│       ... more private notes
│     ]
│   }
│
└── settings.json
    {
      "userId": "user_001",
      "theme": "dark",
      "primaryColor": "#3B82F6",
      "language": "en",
      "notifications": true
    }
```

---

## 🔐 Bảo mật & Xác thực

### **JWT Token (authMiddleware)**
```javascript
// Header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Payload (decoded)
{
  "userId": "user_001",
  "email": "john@example.com",
  "iat": 1705333200,
  "exp": 1705937200  // 7 days later
}

// Verification
- Kiểm tra signature bằng JWT_SECRET
- Kiểm tra exp (expiry)
- Reject nếu không hợp lệ
```

### **Password Hashing (Bcrypt)**
```javascript
// Register
plainPassword = "SecurePass123"
hash = bcrypt.hashSync(plainPassword, saltRounds=10)
// stored in profile.json

// Login
inputPassword = "SecurePass123"
isValid = bcrypt.compareSync(inputPassword, hash) // true
```

### **Encryption Private Notes (AES-256-CBC)**
```javascript
// Create
plaintext = "Mật khẩu: XXX"
password = "myPrivatePassword"
encrypted = cipher.update(plaintext) + cipher.final()
// stored in privateNotes.json

// Read
user inputs password
decipher = crypto.createDecipher('aes-256-cbc', password)
decrypted = decipher.update(encrypted) + decipher.final()
```

---

## 📊 State Management (Frontend)

### **Context API Structure**

```
App.jsx
├── ThemeProvider
│   ├── State: { theme: 'light' | 'dark' }
│   └── Actions: toggleTheme()
│
├── UserProvider
│   ├── State: { user, isAuth, token, loading }
│   └── Actions: login(), logout(), register()
│
├── NotesProvider
│   ├── State: { notes: [], loading, error }
│   └── Actions: fetchNotes(), addNote(), updateNote(), deleteNote()
│
└── SettingsProvider
    ├── State: { theme, primaryColor, ...preferences }
    └── Actions: updateSettings(), updateTheme(), updateColor()
```

### **Custom Hooks**
```javascript
// useAuth() - access user & login/logout
const { user, isAuth, login, logout } = useAuth();

// useNotes() - access notes & CRUD
const { notes, addNote, updateNote, deleteNote } = useNotes();

// useTheme() - access theme & toggle
const { theme, toggleTheme } = useTheme();

// useFetch() - generic API fetching
const { data, loading, error } = useFetch(url);
```

---

## 🎯 Design Patterns

### **1. Service Layer Pattern**
```
Route → Controller → Service → File System
  ↓         ↓           ↓           ↓
Expose   Business    I/O Logic   Persistence
endpoint   Logic   (read/write)   (JSON files)
```

### **2. Middleware Chain (Express)**
```
Request
  ↓
CORS Middleware
  ↓
Auth Middleware (JWT verify)
  ↓
Validate Input Middleware
  ↓
Route Handler (Controller)
  ↓
Service Layer
  ↓
Response
```

### **3. Context + Hooks (React)**
```
Context Provider (holds state)
  ↓
useContext() + useCustomHook()
  ↓
Components consume state & dispatch actions
  ↓
Action updates context
  ↓
Components re-render
```

---

## 🔌 API Integration Points

| Frontend | Backend | Data Flow |
|----------|---------|-----------|
| `authService.login()` | `POST /auth/login` | Send credentials, receive token |
| `notesService.fetchNotes()` | `GET /notes` | Fetch all notes for user |
| `notesService.addNote()` | `POST /notes` | Create new note, receive ID |
| `notesService.updateNote()` | `PUT /notes/:id` | Update note content |
| `settingsService.updateTheme()` | `PUT /settings` | Save theme/color preference |

---

## 🚀 Skalabilitas & Mở rộng

### **Hiện tại (File-based)**
- ✅ Phù hợp với <10k users
- ✅ Zero devops complexity
- ✅ Development tốc độ cao

### **Tương lai (Database)**
```
File JSON → PostgreSQL / MongoDB
- Migrate data scripts
- Update Service Layer
- Controllers & Routes không thay đổi
```

---

