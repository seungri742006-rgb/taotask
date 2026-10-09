# TaskNote - React Frontend

Giao diện React mô phỏng theo ảnh tham khảo: sidebar màu tím, Dashboard, Project, Note, Thùng rác và Quyền riêng tư.

## Chạy project

```bash
npm install
npm run dev
```

Sau đó mở địa chỉ Vite hiển thị trong terminal, thường là:
http://localhost:5173

## Cấu trúc

- `src/main.jsx`: toàn bộ component giao diện và dữ liệu demo.
- `src/styles.css`: CSS giao diện.
- `index.html`: file HTML gốc.

Bạn cần đổi GitHub account trong GitHub Desktop/VS Code sang account có quyền ghi, hoặc cấp quyền Write cho 0306241018-cpu, rồi push commit main lên GitHub. Sau đó vào Render Blueprints, chọn repo ManLeVan1055/my-notes-app và deploy cấu hình render.yaml. Render sẽ tạo URL https://…onrender.com dùng được trên điện thoại và laptop.

Cấu hình deploy đã build và chạy thử thành công. Bạn đã chọn gói miễn phí nên lưu ý dữ liệu JSON có thể mất khi dịch vụ khởi động lại hoặc deploy lại.
