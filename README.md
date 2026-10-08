# 📝 Personal Notes Manager

Ứng dụng quản lý ghi chú cá nhân Fullstack (React + Express + File-based JSON Storage).

---

## 🚀 Tính năng chính
1. **Xác thực người dùng:** Đăng ký, Đăng nhập, Đăng xuất sử dụng JWT Token và Bcrypt.
2. **Ghi chú công khai (Public Notes):** CRUD đầy đủ, phân loại theo danh mục, tìm kiếm và gắn nhãn màu sắc.
3. **Ghi chú riêng tư (Private Notes):** Bảo mật nâng cao với mã hóa AES-256-CBC, yêu cầu mật khẩu khi giải mã xem nội dung.
4. **Cài đặt & Giao diện:** Tùy chỉnh chủ đề sáng/tối (Light/Dark mode) và màu sắc chủ đạo.
5. **Lưu trữ tệp JSON:** Dữ liệu lưu trữ gọn nhẹ tại `backend/data/users/` mà không cần cài đặt CSDL phức tạp.

---

## 🛠️ Cấu trúc Dự án
- **`frontend/`**: Ứng dụng React chạy với Vite (`http://localhost:5173`), sử dụng Axios gọi API qua tầng dịch vụ (`src/services/`).
- **`backend/`**: Ứng dụng Node.js + Express (`http://localhost:5000`), cung cấp các RESTful API endpoints.
- **`ai_brain/`**: Tài liệu kiến trúc hệ thống, API endpoints và trạng thái tích hợp chi tiết dành cho AI và lập trình viên.

---

## 🏃 Hướng dẫn Khởi động Nhanh

### 1. Khởi động Backend
```bash
cd backend
npm install
npm run dev
```

### 2. Khởi động Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Deploy lên Render

1. Push repository lên GitHub để Render có thể đọc source mới nhất.
2. Trong Render, chọn **New → Blueprint**, kết nối repository và deploy `render.yaml`.
3. Render sẽ tạo một dịch vụ web và cấp cho ứng dụng một URL `https://...onrender.com`.
4. Mở URL đó trên laptop hoặc điện thoại; cả giao diện và API được phục vụ từ cùng một địa chỉ.

Gói miễn phí có thể đưa dịch vụ vào trạng thái ngủ khi không dùng, và hệ thống file của dịch vụ không bền vững. Vì ứng dụng lưu tài khoản, ghi chú và project bằng tệp JSON, dữ liệu có thể mất khi dịch vụ khởi động lại hoặc deploy lại. Không dùng gói miễn phí cho dữ liệu cần giữ lâu dài.

---

## 📖 Tài liệu chi tiết cho AI & Developer
- Xem [INTEGRATION_STATUS.md](./ai_brain/context/INTEGRATION_STATUS.md) để nắm bắt nhanh các thay đổi kết nối Frontend ➔ Backend.
- Xem [ARCHITECTURE.md](./ai_brain/context/ARCHITECTURE.md) để hiểu sâu về kiến trúc hệ thống.
- Xem [API_ENDPOINTS.md](./ai_brain/context/API_ENDPOINTS.md) để tra cứu chi tiết các API routes.

---

\# 📝 Personal Notes Manager



A fullstack web application for managing personal notes with React \& Express.



\## 🚀 Quick Start



\### Frontend



cd frontend

npm install

npm run dev





Open http://localhost:5173



\### Backend



cd backend

npm install

npm run dev





Server runs at http://localhost:5000



\## 📁 Project Structure

\- `ai\_brain/` - AI context \& knowledge base

\- `frontend/` - React + Vite

\- `backend/` - Express server

\- `backend/data/` - JSON file storage



\## 🧠 AI Brain

See `ai\_brain/README.md` for how to use AI context files.
