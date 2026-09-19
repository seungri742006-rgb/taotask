# 🔌 API_ENDPOINTS.md - Danh sách tất cả Endpoints

**Base URL:** `http://localhost:5000/api`  
**Header cần thiết:** `Content-Type: application/json`  

---

## 🔐 **AUTHENTICATION ENDPOINTS**

### 1. Đăng ký (Register)
```http
POST /auth/register
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "password": "SecurePass123"
}

Response 201:
{
  "success": true,
  "userId": "user_001",
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "User registered successfully"
}

Response 400:
{
  "success": false,
  "error": "Email already exists" | "Password too short"
}
```

### 2. Đăng nhập (Login)
```http
POST /auth/login
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "password": "SecurePass123"
}

Response 200:
{
  "success": true,
  "userId": "user_001",
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_001",
    "email": "user@example.com",
    "theme": "light",
    "primaryColor": "#3B82F6"
  }
}

Response 401:
{
  "success": false,
  "error": "Invalid email or password"
}
```

### 3. Đăng xuất (Logout)
```http
POST /auth/logout
Authorization: Bearer {token}

Request Body: {}

Response 200:
{
  "success": true,
  "message": "Logged out successfully"
}

Response 401:
{
  "success": false,
  "error": "Unauthorized"
}
```

---

## 📝 **PUBLIC NOTES ENDPOINTS**

### 4. Lấy tất cả ghi chú (Get All Notes)
```http
GET /notes
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": [
    {
      "id": "note_001",
      "title": "Project Setup",
      "content": "Initialize React project with Vite...",
      "category": "Development",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z",
      "isArchived": false
    },
    {
      "id": "note_002",
      "title": "Meeting Notes",
      "content": "Discussed roadmap...",
      "category": "Meeting",
      "createdAt": "2024-01-16T14:00:00Z",
      "updatedAt": "2024-01-16T14:00:00Z",
      "isArchived": false
    }
  ]
}

Response 401:
{
  "success": false,
  "error": "Unauthorized - Invalid or missing token"
}
```

### 5. Tạo ghi chú (Create Note)
```http
POST /notes
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "title": "New Project",
  "content": "Start a new React project...",
  "category": "Development"
}

Response 201:
{
  "success": true,
  "data": {
    "id": "note_003",
    "title": "New Project",
    "content": "Start a new React project...",
    "category": "Development",
    "createdAt": "2024-01-17T11:00:00Z",
    "updatedAt": "2024-01-17T11:00:00Z",
    "isArchived": false
  }
}

Response 400:
{
  "success": false,
  "error": "Title and content are required"
}

Response 401:
{
  "success": false,
  "error": "Unauthorized"
}
```

### 6. Sửa ghi chú (Update Note)
```http
PUT /notes/:id
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "title": "Updated Title",
  "content": "Updated content...",
  "category": "Development",
  "isArchived": false
}

Example: PUT /notes/note_001

Response 200:
{
  "success": true,
  "data": {
    "id": "note_001",
    "title": "Updated Title",
    "content": "Updated content...",
    "category": "Development",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-17T12:00:00Z",
    "isArchived": false
  }
}

Response 404:
{
  "success": false,
  "error": "Note not found"
}

Response 401:
{
  "success": false,
  "error": "Unauthorized"
}
```

### 7. Xóa ghi chú (Delete Note)
```http
DELETE /notes/:id
Authorization: Bearer {token}

Example: DELETE /notes/note_001

Response 200:
{
  "success": true,
  "message": "Note deleted successfully"
}

Response 404:
{
  "success": false,
  "error": "Note not found"
}

Response 401:
{
  "success": false,
  "error": "Unauthorized"
}
```

---

## 🔒 **PRIVATE NOTES ENDPOINTS** (Password Protected)

### 8. Lấy tất cả ghi chú riêng tư (Get All Private Notes)
```http
GET /private-notes
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": [
    {
      "id": "pnote_001",
      "title": "Encrypted Secret",
      "contentEncrypted": "eyJhbGciOiJIUzI1NiI...",
      "createdAt": "2024-01-17T09:00:00Z",
      "updatedAt": "2024-01-17T09:00:00Z",
      "isPasswordProtected": true
    }
  ]
}

Notes:
- Content không được trả về plaintext
- User phải gửi password khi muốn xem nội dung
```

### 9. Tạo ghi chú riêng tư (Create Private Note)
```http
POST /private-notes
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "title": "Secret Plan",
  "content": "This is encrypted content",
  "password": "myPrivatePassword"
}

Response 201:
{
  "success": true,
  "data": {
    "id": "pnote_002",
    "title": "Secret Plan",
    "contentEncrypted": "encrypted_string_here",
    "createdAt": "2024-01-17T10:00:00Z",
    "updatedAt": "2024-01-17T10:00:00Z"
  }
}

Response 400:
{
  "success": false,
  "error": "Title, content, and password are required"
}
```

### 10. Xem nội dung ghi chú riêng tư (Get Private Note Content)
```http
POST /private-notes/:id/decrypt
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "password": "myPrivatePassword"
}

Example: POST /private-notes/pnote_001/decrypt

Response 200:
{
  "success": true,
  "data": {
    "id": "pnote_001",
    "title": "Encrypted Secret",
    "content": "This is the decrypted content",
    "createdAt": "2024-01-17T09:00:00Z"
  }
}

Response 401:
{
  "success": false,
  "error": "Incorrect password"
}

Response 404:
{
  "success": false,
  "error": "Note not found"
}
```

### 11. Sửa ghi chú riêng tư (Update Private Note)
```http
PUT /private-notes/:id
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "title": "Updated Secret",
  "content": "Updated encrypted content",
  "password": "newPassword"  // hoặc old password
}

Example: PUT /private-notes/pnote_001

Response 200:
{
  "success": true,
  "data": {
    "id": "pnote_001",
    "title": "Updated Secret",
    "contentEncrypted": "new_encrypted_string",
    "updatedAt": "2024-01-17T11:00:00Z"
  }
}

Response 401:
{
  "success": false,
  "error": "Unauthorized or incorrect password"
}
```

### 12. Xóa ghi chú riêng tư (Delete Private Note)
```http
DELETE /private-notes/:id
Authorization: Bearer {token}

Example: DELETE /private-notes/pnote_001

Response 200:
{
  "success": true,
  "message": "Private note deleted successfully"
}

Response 404:
{
  "success": false,
  "error": "Note not found"
}
```

---

## ⚙️ **SETTINGS ENDPOINTS**

### 13. Lấy cài đặt người dùng (Get User Settings)
```http
GET /settings
Authorization: Bearer {token}

Response 200:
{
  "success": true,
  "data": {
    "userId": "user_001",
    "theme": "dark",
    "primaryColor": "#3B82F6",
    "language": "en",
    "notifications": true,
    "email": "user@example.com",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-20T14:45:00Z"
  }
}

Response 401:
{
  "success": false,
  "error": "Unauthorized"
}
```

### 14. Cập nhật cài đặt (Update Settings)
```http
PUT /settings
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "theme": "dark",            # "light" | "dark"
  "primaryColor": "#FF5733",  # Hex color
  "language": "en",           # "en" | "vi"
  "notifications": false
}

Response 200:
{
  "success": true,
  "data": {
    "userId": "user_001",
    "theme": "dark",
    "primaryColor": "#FF5733",
    "language": "en",
    "notifications": false,
    "updatedAt": "2024-01-20T15:00:00Z"
  }
}

Response 400:
{
  "success": false,
  "error": "Invalid color format" | "Invalid theme value"
}

Response 401:
{
  "success": false,
  "error": "Unauthorized"
}
```

### 15. Cập nhật mật khẩu (Update Password)
```http
PUT /settings/password
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "currentPassword": "OldPass123",
  "newPassword": "NewPass456"
}

Response 200:
{
  "success": true,
  "message": "Password updated successfully"
}

Response 400:
{
  "success": false,
  "error": "Current password is incorrect" | "New password is too short"
}

Response 401:
{
  "success": false,
  "error": "Unauthorized"
}
```

---

## 🔑 Token Authentication

### **Cách sử dụng JWT Token:**

```javascript
// Sau khi login, lưu token
localStorage.setItem('token', token);

// Gửi token trong mỗi request (qua Axios header)
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};

// Axios instance (services/api.js)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### **Token Expiry:**
- Thời gian hết hạn: **7 days**
- Khi hết hạn: Backend trả về `401 Unauthorized`
- Frontend redirect tới LoginPage

---

## 📊 Response Format (Tiêu chuẩn)

Tất cả API responses tuân theo format này:

```json
{
  "success": true,           // boolean
  "data": { ... },           // response data (nếu thành công)
  "error": "Error message",  // string (nếu thất bại)
  "message": "Success message" // string (optional)
}
```

---

## ❌ Error Codes

| Status | Meaning | Giải pháp |
|--------|---------|----------|
| **200** | OK - Request thành công | - |
| **201** | Created - Resource tạo thành công | - |
| **400** | Bad Request - Dữ liệu không hợp lệ | Kiểm tra request body |
| **401** | Unauthorized - Cần xác thực hoặc token hết hạn | Login lại hoặc kiểm tra token |
| **404** | Not Found - Resource không tồn tại | Kiểm tra ID hoặc path |
| **500** | Server Error - Lỗi server | Kiểm tra logs, liên hệ admin |

---

## 🧪 Testing với cURL / Postman

### **1. Register**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"SecurePass123"}'
```

### **2. Login (Lấy token)**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"SecurePass123"}'
```

### **3. Get Notes (Cần token)**
```bash
curl -X GET http://localhost:5000/api/notes \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### **4. Create Note**
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title":"New Note","content":"Content here","category":"Development"}'
```

---

