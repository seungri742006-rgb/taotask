# 🧠 CLAUDE_AI_MEMORY_RULES.md - Quy tắc Bắt buộc & Ghi nhớ cho AI

> **LƯU Ý QUAN TRỌNG:** File này được tạo ra để ghi nhớ vĩnh viễn các quy tắc làm việc cho AI trong dự án này, tránh việc lặp lại lỗi quên đọc context hoặc không chú thích code.

---

## 📌 1. QUY TẮC ĐỌC AI BRAIN (MANDATORY)
- **Luôn luôn** đọc và tham chiếu các file trong thư mục `ai_brain/` trước khi thiết kế hoặc viết code:
  - `ai_brain/context/PROJECT_OVERVIEW.md` - Tổng quan dự án.
  - `ai_brain/context/ARCHITECTURE.md` - Kiến trúc hệ thống & data flow.
  - `ai_brain/context/API_ENDPOINTS.md` - Danh sách API endpoints chuẩn.
  - `ai_brain/rules/CODING_STANDARDS.md` - Tiêu chuẩn code (naming conventions, indentation, error handling...).
  - `ai_brain/skills/*.md` - Các kỹ năng, hướng dẫn thực thi và quy trình.

---

## 📌 2. QUY TẮC CHÚ THÍCH CODE (CODE COMMENTS RULE)
- **Tất cả** các file code được viết mới hoặc chỉnh sửa (Backend, Frontend, Services, Controllers, Middleware, Config, v.v.) **bắt buộc phải có chú thích (JSDoc hoặc comments)** bằng tiếng Việt giải thích rõ ràng:
  - Mục đích của file (`@file`, `@description`).
  - Mục đích, tham số (`@param`) và giá trị trả về (`@returns`) của từng hàm.
  - Các bước xử lý phức tạp bên trong logic.

---

## 📌 3. QUY TẮC TẠO FILE TÀI LIỆU MARKDOWN (`.md`)
- Bất kỳ tài liệu hướng dẫn, ghi chú hoặc quy trình mới nào cần tạo ở định dạng `.md` **phải được đặt đúng thư mục trong `ai_brain/`**:
  - `ai_brain/context/` - Dành cho tài liệu kiến trúc, tổng quan, API.
  - `ai_brain/skills/` - Dành cho tài liệu hướng dẫn quy trình, cách chạy/kiểm thử (`HOW_TO_RUN_AND_TEST.md`).
  - `ai_brain/rules/` - Dành cho các quy tắc code.


---

## 📌 4. QUY TẮC TỰ ĐỘNG NHẬN DIỆN VÀ CẬP NHẬT TÀI LIỆU (`AUTO-UPDATE RULE`)
- Khi thực hiện các thay đổi lớn (thêm tính năng, đổi API, sửa đổi kiến trúc, thêm quy trình mới), AI **chủ động nhận diện** và tự động cập nhật hoặc tạo mới các file `.md` tương ứng trong hệ thống `ai_brain/`:
  - Thêm tính năng/API mới ➔ Cập nhật `API_ENDPOINTS.md`, `INTEGRATION_STATUS.md`.
  - Sửa đổi/Thêm mã nguồn ➔ Cập nhật `CHANGE_LOG.md` trong `ai_brain/rules/`.
  - Thay đổi quy trình ➔ Cập nhật `PROCESS_GUIDE.md` trong `ai_brain/skills/`.
- Ngôn ngữ viết bằng **Tiếng Việt**, súc tích, rõ ràng, giúp AI tiếp theo đọc hiểu cực nhanh và tiết kiệm token tối đa.

---
*Được ghi nhớ và tuân thủ tuyệt đối trong mọi phiên làm việc.*
