# 💬 prompts/FULLSTACK_IMPLEMENTATION_PROMPT.md - Mẫu Prompt Chuẩn cho AI

## 📌 Mục đích
Sử dụng mẫu prompt này khi cần giao việc cho AI tiếp theo để phát triển tính năng, kết nối API hoặc fix bug mà vẫn đảm bảo an toàn tuyệt đối cho kiến trúc hệ thống và giao diện UI.

---

## 📝 Mẫu Prompt (Copy & Paste)

```text
Bạn là Senior Fullstack AI Engineer theo định nghĩa trong `ai_brain/roles/DEVELOPER_ROLE.md`.
Hãy thực hiện yêu cầu sau cho dự án Personal Notes Manager:

[MÔ TẢ YÊU CẦU CỦA BẠN Ở ĐÂY, ví dụ: Thêm tính năng xuất ghi chú ra file PDF]

Quy tắc bắt buộc:
1. Đọc kỹ các tài liệu trong `ai_brain/context/` và `ai_brain/rules/` trước khi code.
2. Tuân thủ mô hình phân tầng: Frontend Services ➔ Express Routes ➔ Controllers ➔ JSON Storage.
3. TUYỆT ĐỐI KHÔNG làm thay đổi hoặc phá vỡ bố cục giao diện UI hiện tại của Frontend.
4. Viết code hoàn chỉnh, không dùng placeholder (comment "// code here").
5. Sau khi hoàn thành, bắt buộc chạy kiểm thử (`npm run build` ở frontend) và báo cáo chi tiết các file đã thêm/sửa.
```
