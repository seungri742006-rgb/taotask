# 🔄 PROCESS_GUIDE.md - Quy trình Phát triển & Triển khai

**Cập nhật mới nhất:** Ngày 02/10/2026  
**Mục đích:** Hướng dẫn từng bước quy trình làm việc, kiểm thử và mở rộng tính năng cho AI hoặc Lập trình viên mới tham gia dự án mà không tốn nhiều token đọc hiểu.

---

## 1. 📐 Quy trình Kiến trúc & Phân tầng (Architecture & Layering)
Dự án tuân thủ nghiêm ngặt mô hình phân tầng:
```
React Components (UI)
  ↓
Context / State Hooks
  ↓
Services Layer (Axios /api.js)
  ↓ HTTP REST API (JSON)
Express Server Routes (backend/src/routes/)
  ↓
Controller Layer (backend/src/controllers/)
  ↓
JSON Storage Service (backend/data/users/)
```

---

## 2. 🧪 Quy trình Kiểm thử & Chạy ứng dụng (Test & Run)
Trước khi bàn giao hoặc deploy bất kỳ thay đổi nào, bắt buộc phải thực hiện các bước kiểm thử sau:

### **Bước A: Chạy Backend API**
```bash
cd backend
npm install
npm run dev
# Kiểm tra health check: GET http://localhost:5000/api/health
```

### **Bước B: Chạy Frontend & Build Check**
```bash
cd frontend
npm install
npm run build
npm run dev
# Kiểm tra app tại http://localhost:5173
```

---

## 3. 🛠️ Quy trình Thêm tính năng Mới (Feature Implementation Workflow)
Khi cần thêm một tính năng mới (ví dụ: Thêm quản lý thẻ tags cho ghi chú):
1. **Xác định API Endpoint (Backend):**
   - Thêm route trong `backend/src/routes/`.
   - Viết logic xử lý trong `backend/src/controllers/`.
   - Đọc/ghi dữ liệu thông qua `jsonStorageService`.
2. **Cập nhật Service Layer (Frontend):**
   - Thêm hàm gọi API tương ứng vào `frontend/src/services/` (ví dụ: `tagsService.js`).
3. **Cập nhật State / UI (Frontend):**
   - Gọi service từ các Custom Hooks hoặc Components hiện có.
   - **Lưu ý tối quan trọng:** **Không thay đổi bố cục giao diện UI** đã có sẵn.
4. **Kiểm thử (Build Test):**
   - Chạy `npm run build` ở frontend để đảm bảo không có lỗi cú pháp hoặc import thiếu.
