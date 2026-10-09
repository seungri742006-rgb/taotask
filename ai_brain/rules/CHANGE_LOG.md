# 📝 CHANGE_LOG.md - Nhật ký Thay đổi & Sửa đổi Mã nguồn

**Cập nhật mới nhất:** Ngày 02/10/2026  
**Mục đích:** Ghi nhận toàn bộ các file đã thêm, đã sửa, nguyên nhân và kết quả kiểm thử để AI khác nắm bắt lịch sử thay đổi tức thì.

---

## 📅 Nhật ký các phiên bản (Changelog)

### **Phiên bản hiện tại: v1.1.0 - Kết nối Fullstack API (02/10/2026)**

#### **1. Các tệp tin đã thêm mới (Added Files):**
- **`frontend/src/services/api.js`**: Cấu hình Axios instance chung, tự động đính kèm JWT token từ `localStorage`.
- **`frontend/src/services/authService.js`**: Service xử lý đăng nhập, đăng ký, đăng xuất qua `/api/auth`.
- **`frontend/src/services/notesService.js`**: Service xử lý CRUD ghi chú công khai qua `/api/notes`.
- **`frontend/src/services/privateNotesService.js`**: Service xử lý CRUD và giải mã ghi chú riêng tư qua `/api/private-notes`.
- **`frontend/src/services/settingsService.js`**: Service xử lý cài đặt người dùng qua `/api/settings`.
- **`ai_brain/context/INTEGRATION_STATUS.md`**: Báo cáo trạng thái tích hợp Frontend & Backend.
- **`ai_brain/context/PROCESS_GUIDE.md`**: Tài liệu quy trình phát triển và kiểm thử chuẩn.
- **`ai_brain/context/CHANGE_LOG.md`**: Nhật ký thay đổi mã nguồn này.

#### **2. Các tệp tin đã chỉnh sửa (Modified Files):**
- **`frontend/package.json`**:
  - Thêm thư viện `axios` (^1.x).
  - Khắc phục xung đột version giữa Vite và `@vitejs/plugin-react`.
- **`frontend/src/pages/Auth.jsx`**:
  - Thay thế logic xác thực mock bằng gọi thật `authService.login()` và `authService.register()`.
  - Lưu JWT token vào `localStorage` thành công.
- **`README.md`**:
  - Viết lại toàn bộ bằng tiếng Việt, bổ sung hướng dẫn chi tiết cho AI và Developer.

---

## 🔍 Trạng thái Kiểm thử (Verification Status)
- **Backend Build/Run:** ✅ Chạy thành công trên `http://localhost:5000`.
- **Frontend Build:** ✅ Chạy lệnh `npm run build` thành công 100% không lỗi.
- **Frontend Run:** ✅ Chạy mượt mà trên `http://localhost:5173` với dữ liệu được lưu thực tế xuống hệ thống tệp JSON của backend (`backend/data/users/`).
- **Giao diện UI:** ✅ Giữ nguyên 100% bố cục ban đầu theo đúng yêu cầu.
