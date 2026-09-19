# 📋 PROJECT_OVERVIEW.md

**Dự án:** Personal Notes Manager  
**Loại:** Web Fullstack (Frontend + Backend)  
**Ngôn ngữ:** JavaScript (Frontend: React, Backend: Node.js/Express)  
**Database:** JSON Files on File System  

---

## 🎯 Mục đích Dự án

Xây dựng ứng dụng quản lý ghi chú cá nhân với các tính năng:
1. **Ghi chú công khai** - Tổ chức theo thể loại
2. **Ghi chú riêng tư** - Bảo vệ bằng mật khẩu
3. **Cài đặt cá nhân** - Chọn theme (Light/Dark), màu sắc Primary
4. **Xác thực** - Đăng ký / Đăng nhập

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React 18+ | Vite |
| **State** | Context API / Custom Hooks | - |
| **API Client** | Axios | Latest |
| **Backend** | Node.js + Express | v18+ |
| **Auth** | JWT + Bcrypt | Standard |
| **Storage** | JSON Files | File System |
| **Encryption** | Crypto (Node.js built-in) | - |

---

## 📊 Dataflow (Sơ đồ tổng quát)

```
┌─────────────────┐
│   React App     │
│  (Frontend)     │
└────────┬────────┘
         │ HTTP Request (Axios)
         ▼
┌─────────────────────────┐
│  Express Server (Port 5000) │
│  - Routes                   │
│  - Controllers              │
│  - Middleware               │
└────────┬────────────────────┘
         │ Read/Write
         ▼
┌──────────────────────────┐
│  File System (/data)     │
│  - users/[user_id]/      │
│    - profile.json        │
│    - notes.json          │
│    - privateNotes.json   │
│    - settings.json       │
└──────────────────────────┘
```

---

## 👥 Người dùng & Quyền

| Trạng thái | Quyền |
|-----------|-------|
| **Chưa đăng nhập** | Xem landing page, đăng ký, đăng nhập |
| **Đã đăng nhập** | Tạo/sửa/xóa ghi chú, cài đặt theme/màu |
| **Riêng tư** | Tất cả ghi chú riêng tư phải nhập mật khẩu |

---

## 📝 Các tính năng chính

### 1. **Authentication**
- Đăng ký (Register) - Tạo user mới
- Đăng nhập (Login) - Cấp JWT token
- Đăng xuất (Logout) - Xóa token ở client

### 2. **Ghi chú công khai (Public Notes)**
- CRUD operations (Create, Read, Update, Delete)
- Phân loại theo Category/Tags
- Tìm kiếm, lọc theo category
- Sắp xếp theo ngày

### 3. **Ghi chú riêng tư (Private Notes)**
- Tương tự công khai nhưng mã hóa nội dung
- Yêu cầu mật khẩu khi xem
- Lưu password hash (không lưu plaintext)

### 4. **Cài đặt (Settings)**
- Toggle Light/Dark theme
- Chọn Primary Color (#HEX)
- Lưu user profile info
- Lưu preferences vào profile.json

---

## 🔐 Bảo mật

- ✅ Mật khẩu user: Bcrypt (salt rounds: 10)
- ✅ Token: JWT (secret từ .env, expiry: 7 days)
- ✅ Private notes: Mã hóa AES-256-CBC
- ✅ CORS: Chỉ cho phép frontend domain
- ✅ Input validation: Trim, length check, type check

---

## 📚 Dependencies chính

### Frontend
```json
{
  "react": "^18.x",
  "react-router-dom": "^6.x",
  "axios": "^1.x",
  "vite": "^4.x"
}
```

### Backend
```json
{
  "express": "^4.x",
  "bcrypt": "^5.x",
  "jsonwebtoken": "^9.x",
  "cors": "^2.x",
  "dotenv": "^16.x"
}
```

---

## 🚀 Deployment

- **Frontend**: Vercel, Netlify (Static hosting)
- **Backend**: Heroku, Railway, DigitalOcean (Node.js hosting)
- **Storage**: Backend server file system (hoặc migrate sang MongoDB/PostgreSQL sau)

---

## 📞 Liên hệ & Support

- Hướng dẫn đầy đủ: Xem `ARCHITECTURE.md`
- API endpoints: Xem `API_ENDPOINTS.md`
- Code standards: Xem `CODING_STANDARDS.md`

