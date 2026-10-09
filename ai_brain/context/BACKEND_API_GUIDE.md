# 🔌 BACKEND_API_GUIDE.md - Hướng dẫn API & Kết nối Backend

## 📋 Tổng quan
Backend được xây dựng bằng **Node.js + Express**, sử dụng hệ thống **File-based JSON Storage** lưu tại thư mục `backend/data/users/[user_id]/`.

---

## 🚀 Các Endpoints Đã Triển Khai

### 1. Authentication (`/api/auth`)
- `POST /api/auth/register` - Đăng ký tài khoản (mật khẩu mã hóa bằng Bcrypt)
- `POST /api/auth/login` - Đăng nhập, trả về JWT Token (hạn 7 ngày)
- `POST /api/auth/logout` - Đăng xuất (Yêu cầu Bearer Token)

### 2. Public Notes (`/api/notes`)
- `GET /api/notes` - Lấy toàn bộ ghi chú của user
- `POST /api/notes` - Tạo ghi chú mới
- `PUT /api/notes/:id` - Cập nhật ghi chú
- `DELETE /api/notes/:id` - Xóa ghi chú

### 3. Private Notes (`/api/private-notes`)
- `GET /api/private-notes` - Lấy danh sách ghi chú riêng tư (đã mã hóa)
- `POST /api/private-notes` - Tạo ghi chú riêng tư (mã hóa AES-256-CBC)
- `POST /api/private-notes/:id/unlock` - Giải mã ghi chú riêng tư bằng mật khẩu
- `PUT /api/private-notes/:id` - Cập nhật ghi chú riêng tư
- `DELETE /api/private-notes/:id` - Xóa ghi chú riêng tư

### 4. Settings & Account (`/api/settings`)
- `GET /api/settings` - Lấy cài đặt theme & màu sắc
- `PUT /api/settings` - Cập nhật cài đặt
- `PUT /api/settings/password` - Đổi mật khẩu tài khoản

---

## 🛠️ Chạy Backend Server
```bash
cd backend
npm run dev
# Server chạy tại http://localhost:5000
```
