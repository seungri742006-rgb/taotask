# 🧠 HOW_TO_USE_AI_BRAIN.md - Hướng dẫn Sử dụng để Tối ưu Token

---

## 🎯 Mục đích AI Brain

**AI Brain** là một thư mục chứa tất cả thông tin ngữ cảnh (context) của dự án, được thiết kế để:

1. ✅ **Tiết kiệm token** - Tóm tắt thay vì repeat code dài
2. ✅ **Tăng tốc độ onboarding** - AI hiểu project nhanh
3. ✅ **Đảm bảo consistency** - Code luôn tuân thủ standards
4. ✅ **Tái sử dụng prompts** - Sử dụng template thay vì viết từ đầu

---

## 📊 Cấu trúc AI_BRAIN

```
ai_brain/
├── context/              # Tóm tắt & kiến trúc
├── rules/                # Quy tắc & tiêu chuẩn
├── roles/                # Vai trò AI
├── skills/               # Kỹ năng & quy trình mẫu
└── prompts/              # Template prompts
```

---

## 🚀 **SCENARIO 1: Lần đầu tiên làm việc với AI**

### **Step 1: Share Context với AI**

Gửi một prompt **duy nhất** như sau:

```
Tôi có một dự án Web Fullstack. 
Hãy đọc những file sau để hiểu project structure & architecture:

1. ai_brain/context/PROJECT_OVERVIEW.md
2. ai_brain/context/ARCHITECTURE.md
3. ai_brain/context/API_ENDPOINTS.md
4. ai_brain/rules/CODING_STANDARDS.md

Sau khi đọc xong, hãy xác nhận rằng bạn đã hiểu project.
```

**Lợi ích:**
- AI nắm bắt architecture toàn bộ từ đầu
- Tiết kiệm token vì không phải repeat nhiều lần
- Đảm bảo mọi code tuân thủ standards

---

## 🚀 **SCENARIO 2: Yêu cầu feature mới**

### **Cách 1: Reference đến Architecture (TIẾT KIỆM)**

```
Theo ARCHITECTURE.md:
- Frontend: React Context API quản lý global state
- Backend: Express server với JSON file storage
- Data flow: Component → Service → API → Controller → File System

Tôi muốn thêm tính năng "Export notes as PDF".
Hãy design architecture cho feature này:
1. Frontend: Thêm component nào?
2. Backend: Thêm route/controller nào?
3. Luồng dữ liệu: Như thế nào?
```

**Lợi ích:**
- Không cần dán code dài
- AI trực tiếp theo context đã biết
- Tiết kiệm ~500-1000 tokens

### **Cách 2: Reference đến API (TIẾT KIỆM)**

```
Theo API_ENDPOINTS.md, API structure là GET/POST/PUT/DELETE.

Thêm endpoint mới: POST /notes/export-pdf
- Request: { noteIds: [...] }
- Response: { success, pdfUrl }

Giúp tôi implement controller này.
```

---

## 🚀 **SCENARIO 3: Code Review**

### **Yêu cầu Review**

```
Hãy review file này theo CODING_STANDARDS.md & DO_DONT.md:

[Paste file code]

Cần cải thiện gì?
```

**AI sẽ check:**
- ✅ Naming convention (camelCase, PascalCase)
- ✅ Indentation (2 spaces)
- ✅ Error handling
- ✅ Component structure
- ✅ PropTypes validation

---

## 🚀 **SCENARIO 4: Bug Fix**

### **Instead of:**

```
❌ SAI (Lãng phí token)
Có lỗi trong file src/components/NoteCard.jsx:
const NoteCard = ({ note, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  ... (50 dòng code)
  
Giúp tôi fix lỗi "Cannot read property 'id' of undefined".
```

### **Use:**

```
✅ ĐÚNG (Tiết kiệm token)
Lỗi trong NoteCard.jsx: "Cannot read property 'id' of undefined"
- Theo ARCHITECTURE.md, note object phải có structure: { id, title, content, ... }
- PropTypes validation trong component: PropTypes.shape({ id: PropTypes.string.isRequired })

Giúp tôi trace và fix lỗi này.
```

---

## 🎯 **SCENARIO 5: Thêm State Management**

### **Yêu cầu**

```
Theo react-state-patterns.md, tôi cần thêm global state cho "PrivateNotes".

Hướng dẫn:
1. Tạo PrivateNotesContext.jsx - Cấu trúc giống NotesContext.jsx
2. Custom hook usePrivateNotes() - Pattern giống useNotes()
3. Wrap App.jsx với <PrivateNotesProvider>

Giúp tôi implement.
```

---

## 📝 **SCENARIO 6: Tối ưu/Refactor Code**

### **Yêu cầu**

```
Theo CODING_STANDARDS.md, cần refactor service này:

[Paste code]

Hãy tối ưu theo best practices:
- Tránh callback hell
- Error handling centralized
- Naming conventions consistent
```

---

## 🔍 **SCENARIO 7: Tìm hiểu JSON Schema**

### **Thay vì dán file JSON dài:**

```
❌ Sai
"Cấu trúc file notes.json là:
{ "notes": [ { "id": ..., "title": ..., ... }, ... ] }

Giúp tôi query note theo category..."
```

### **Reference đến schema:**

```
✅ Đúng
Theo JSON_SCHEMA.md, file notes.json có cấu trúc:
- Array of notes
- Mỗi note có: id, title, content, category, createdAt, updatedAt, isArchived

Giúp tôi implement filter theo category.
```

---

## 💡 **BEST PRACTICES - 7 Tips to Save Tokens**

### **Tip 1: Dùng Reference thay vì Paste**

| ❌ LÃNG PHÍ | ✅ TIẾT KIỆM |
|------------|------------|
| "Tôi có React component 150 dòng, giúp tôi..." | "Theo component structure trong CODING_STANDARDS.md, giúp tôi..." |
| "API response format là `{ success, data, error }`" | "Theo API format trong API_ENDPOINTS.md..." |

### **Tip 2: Dùng Prompts Template**

Thay vì viết prompt từ đầu, dùng template từ `ai_brain/prompts/`:

```
[From prompts/code-review-prompt.md]

"Review code này:
[Code]

Theo standards ở CODING_STANDARDS.md"
```

### **Tip 3: Chia nhỏ requests**

```
❌ SAI - 1 prompt dài
"Thêm feature X, Y, Z cùng lúc..."

✅ ĐÚNG - 3 prompts nhỏ
1. "Thêm feature X theo ARCHITECTURE.md"
2. "Thêm feature Y"
3. "Thêm feature Z"
```

### **Tip 4: Xác nhận AI đã hiểu project**

Sau lần đầu share context:

```
"Tôi muốn kiểm tra bạn đã hiểu project:
- Frontend dùng gì để quản lý state?
- Backend lưu data ở đâu?
- Luồng dữ liệu từ User action tới File System là gì?"
```

### **Tip 5: Reference file names, không dán code**

```
❌ "Hãy create middleware auth:
const authMiddleware = (req, res, next) => {
  ...
}

Sửa lỗi này..."

✅ "Hãy tạo authMiddleware tương tự errorHandler.js structure,
theo CODING_STANDARDS.md middleware section"
```

### **Tip 6: Group related features**

```
"Theo ARCHITECTURE.md, User authentication flow gồm:
1. Register endpoint
2. Login endpoint
3. JWT verification middleware
4. useAuth() hook

Giúp tôi implement tất cả cùng lúc."
```

### **Tip 7: Dùng roles định nghĩa trong ai_brain/roles/**

```
"Bạn đóng vai Fullstack Architect (xem fullstack-architect.md).
Đề xuất cách tốt nhất để implement feature X, xem xét:
- Performance
- Scalability
- Maintainability
- Code reusability"
```

---

## 📋 **CHECKLIST: Chuẩn bị AI Brain**

Trước khi sử dụng AI để code, hãy chắc chắn đã có:

- [ ] `PROJECT_OVERVIEW.md` - Tóm tắt 1 trang dự án
- [ ] `ARCHITECTURE.md` - Sơ đồ & kiến trúc chi tiết
- [ ] `API_ENDPOINTS.md` - Danh sách endpoint đầy đủ
- [ ] `JSON_SCHEMA.md` - Cấu trúc file JSON
- [ ] `CODING_STANDARDS.md` - Quy tắc code
- [ ] `DO_DONT.md` - Lỗi phổ biến cần tránh
- [ ] `roles/*.md` - Định nghĩa vai trò
- [ ] `skills/*.md` - Mẫu code/workflow

---

## 🎯 **QUICK START - First Interaction**

### **Message 1: Onboarding**

```
"Dự án tôi có cấu trúc ai_brain/ với context đầy đủ.

Hãy đọc những file sau:
- ai_brain/context/PROJECT_OVERVIEW.md
- ai_brain/context/ARCHITECTURE.md
- ai_brain/rules/CODING_STANDARDS.md

Sau đó, xác nhận bạn đã sẵn sàng giúp project."
```

### **Message 2: Yêu cầu cụ thể**

```
"Dựa trên architecture và coding standards đã học,
tôi muốn thêm feature [X].

Chi tiết:
- Input: [...]
- Output: [...]
- Liên quan đến: [component/endpoint]

Giúp tôi implement."
```

---

## 📊 **Token Savings Estimate**

Khi sử dụng AI Brain:

| Scenario | Không dùng AI Brain | Dùng AI Brain | Tiết kiệm |
|----------|-------------------|--------------|-----------|
| **Onboarding AI** | 3000-5000 tokens | 500-1000 tokens | 70-80% |
| **Bug fix** | 2000 tokens | 500 tokens | 75% |
| **Code review** | 1500 tokens | 300 tokens | 80% |
| **Feature design** | 2500 tokens | 800 tokens | 68% |
| **Per month (10 interactions)** | ~20,000 tokens | ~4,000 tokens | **80% saving** |

---

## 🚀 **Real Example: Token Optimization**

### **Without AI Brain (❌ LÃNG PHÍ)**

```
User: "Hãy thêm feature export notes as PDF.
Hiện tại frontend có:
- NotesPage.jsx (300 dòng)
- NoteCard.jsx (100 dòng)
- NotesContext.jsx (150 dòng)
- notesService.js (200 dòng)

Backend có:
- notesController.js (250 dòng)
- notes.routes.js (50 dòng)
- jsonStorageService.js (300 dòng)

[PASTE tất cả code trên]

Giúp tôi implement..."

❌ Token: ~5000 tokens cho code
```

### **With AI Brain (✅ TIẾT KIỆM)**

```
User: "Theo ARCHITECTURE.md:
- Frontend: React component + NotesContext (state)
- Backend: Express route + controller + service

Thêm feature export PDF:
1. Frontend: Button "Export" → call /api/notes/export-pdf
2. Backend: Route POST /notes/export-pdf → controller → generate PDF file

Giúp tôi implement theo cấu trúc hiện tại."

✅ Token: ~500 tokens (reference đến architecture)
✅ Tiết kiệm: 90% token!
```

---

## 📞 **Support & Questions**

Nếu AI hỏi "Project structure là gì?", trả lời:

```
"Tất cả thông tin trong thư mục ai_brain/:
- Architecture: ai_brain/context/ARCHITECTURE.md
- API: ai_brain/context/API_ENDPOINTS.md
- Code style: ai_brain/rules/CODING_STANDARDS.md
- JSON structure: ai_brain/context/JSON_SCHEMA.md"
```

---

## ✅ **Final Checklist**

- [ ] Đã đọc PROJECT_OVERVIEW.md
- [ ] Đã hiểu ARCHITECTURE.md
- [ ] Đã học CODING_STANDARDS.md
- [ ] Có file API_ENDPOINTS.md để reference
- [ ] Có file JSON_SCHEMA.md để reference
- [ ] Team biết cách reference files này
- [ ] Sử dụng roles/ + skills/ khi cần
- [ ] Sử dụng prompts/ template cho requests thường xuyên

---

