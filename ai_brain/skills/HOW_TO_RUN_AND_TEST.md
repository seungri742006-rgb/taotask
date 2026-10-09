# 📖 HOW_TO_RUN_AND_TEST.md - Hướng dẫn Chạy và Kiểm thử Fullstack

Tài liệu này hướng dẫn cách khởi động, cấu hình và kiểm thử toàn bộ ứng dụng **Personal Notes Manager** (Frontend React + Backend Node.js/Express).

---

## 🛠️ 1. Cài đặt môi trường (Installation)

Bạn cần mở **2 cửa sổ Terminal** riêng biệt để chạy Backend và Frontend.

### **Terminal 1: Cài đặt Backend**
```bash
cd backend
npm install
```

### **Terminal 2: Cài đặt Frontend**
```bash
cd frontend
npm install
```

---

## 🚀 2. Khởi động ứng dụng (Running)

### **Bước A: Chạy Backend Server (Port 5000)**
Tại Terminal 1:
```bash
cd backend
npm run dev
```
- **Xác nhận thành công:** Terminal hiển thị `🚀 Server running at http://localhost:5000`
- **Kiểm tra Health Check:** Truy cập `http://localhost:5000/api/health` trả về JSON `{"status":"Server is running ✅", ...}`.

### **Bước B: Chạy Frontend App (Port 5173)**
Tại Terminal 2:
```bash
cd frontend
npm run dev
```
- **Xác nhận thành công:** Terminal hiển thị đường dẫn `http://localhost:5173/`.

---

## 🧪 3. Kiểm thử Backend API (Testing with cURL / Postman)

### **1. Đăng ký tài khoản mới (`POST /api/auth/register`)**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"SecurePassword123","name":"Demo User"}'
```

### **2. Đăng nhập lấy Token (`POST /api/auth/login`)**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"SecurePassword123"}'
```
*(Copy `token` trả về từ response để dùng cho các request tiếp theo)*

### **3. Lấy danh sách ghi chú (`GET /api/notes`)**
```bash
curl -X GET http://localhost:5000/api/notes \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

## 🌐 4. Kiểm thử trên Giao diện Web (Frontend)

1. Mở trình duyệt và truy cập: **`http://localhost:5173`**
2. **Xác thực:** 
   - Đăng ký tài khoản mới hoặc đăng nhập.
3. **Quản lý Ghi chú (Notes & Private Notes):**
   - Thêm, sửa, xóa ghi chú công khai.
   - Tạo ghi chú riêng tư có bảo vệ bằng mật khẩu (mã hóa AES-256-CBC phía backend).
4. **Cài đặt (Settings):**
   - Thay đổi Light/Dark theme, đổi màu sắc chủ đạo (Primary Color), đổi mật khẩu tài khoản.
   - Dữ liệu được lưu trữ tự động vào các file JSON tại `backend/data/users/`.
