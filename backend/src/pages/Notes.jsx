import React, { useEffect, useMemo, useState } from "react";
import Icon from "../components/Icon";

const NOTE_COLORS = [
  { id: "yellow", hex: "#fef08a" },
  { id: "green", hex: "#bbf7d0" },
  { id: "blue", hex: "#bfdbfe" },
  { id: "red", hex: "#fecaca" },
  { id: "purple", hex: "#e9d5ff" },
  { id: "orange", hex: "#fed7aa" },
  { id: "pink", hex: "#fbcfe8" },
  { id: "gray", hex: "#e5e7eb" },
  { id: "cyan", hex: "#a5f3fc" },
  { id: "emerald", hex: "#a7f3d0" },
  { id: "indigo", hex: "#c7d2fe" },
];

const CATEGORY_OPTIONS = [
  { id: "all", label: "Tất cả" },
  { id: "hoc-tap", label: "Học tập" },
  { id: "y-tuong", label: "Ý tưởng" },
  { id: "cong-viec", label: "Công việc" },
  { id: "sang-tao", label: "Sáng tạo" },
    {id: "Uoc-mo", label: "Ước mơ"},
   {id: "suc-khoe", label: "Sức khỏe"},
  {id : "giai-tri", label: "Giải trí"},
  {id: "khac", label: "Khác" },
];

const getCategoryLabel = (category) =>
  CATEGORY_OPTIONS.find((item) => item.id === category)?.label || "Học tập";

const getLocalDateTimeValue = (value) => {
  const date = value ? new Date(value) : new Date();
  const pad = (num) => String(num).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const formatDateText = (value, mode = "created") => {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return mode === "reminder" ? "Hôm nay" : "Hôm nay";

  const timeText = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  const dateText = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  if (mode === "reminder") return `${dateText} ${timeText}`;

  return `${dateText}`;
};

export default function Notes({ notes = [], onAddNote, onUpdateNote, onDeleteNote, onOpenNoteDetail, searchQuery = "" }) {
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [draft, setDraft] = useState({ title: "", text: "", color: "yellow", category: "hoc-tap", isPrivate: false, reminderAt: new Date().toISOString() });

  const normalizedQuery = (searchQuery || "").trim().toLowerCase();

  const filteredNotes = useMemo(
    () =>
      (notes || []).filter((note) => {
        if (note.isPrivate) return false;
        const haystack = `${note.title || ""} ${note.text || ""}`.toLowerCase();
        const matchesQuery = haystack.includes(normalizedQuery);
        const matchesCategory = activeCategory === "all" || (note.category || "hoc-tap") === activeCategory;
        return matchesQuery && matchesCategory;
      }),
    [notes, normalizedQuery, activeCategory]
  );

  useEffect(() => {
    if (!selectedNoteId) return;
    if (!filteredNotes.some((note) => note.id === selectedNoteId)) {
      setSelectedNoteId(null);
    }
  }, [filteredNotes, selectedNoteId]);

  const selectedNote = filteredNotes.find((note) => note.id === selectedNoteId) || null;

  const openAddForm = () => {
    setEditingNote(null);
    setDraft({ title: "", text: "", color: "yellow", category: "hoc-tap", isPrivate: false, reminderAt: new Date().toISOString() });
    setShowForm(true);
  };

  const openEditForm = (note) => {
    setEditingNote(note);
    setSelectedNoteId(note.id);
    setDraft({
      title: note.title,
      text: note.text,
      color: note.color,
      category: note.category || "hoc-tap",
      isPrivate: Boolean(note.isPrivate),
      reminderAt: note.reminderAt || note.createdAt || new Date().toISOString(),
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingNote(null);
    setDraft({ title: "", text: "", color: "yellow", category: "hoc-tap", isPrivate: false, reminderAt: new Date().toISOString() });
  };

  const handleSave = () => {
    const title = draft.title.trim();
    const text = draft.text.trim();

    if (!title || !text) return;

    if (editingNote) {
      onUpdateNote?.({
        ...editingNote,
        title,
        text,
        color: draft.color,
        category: draft.category || "hoc-tap",
        isPrivate: draft.isPrivate,
        reminderAt: draft.reminderAt || new Date().toISOString(),
        createdAt: editingNote.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      setSelectedNoteId(editingNote.id);
    } else {
      const createdAt = new Date().toISOString();
      const newNote = {
        id: Date.now(),
        title,
        text,
        color: draft.color,
        category: draft.category || "hoc-tap",
        isPrivate: draft.isPrivate,
        createdAt,
        updatedAt: createdAt,
        reminderAt: draft.reminderAt || createdAt,
      };

      onAddNote?.(newNote);
      setSelectedNoteId(newNote.id);
    }

    closeForm();
  };

  const handleDeleteNote = (noteId) => {
    onDeleteNote?.(noteId);
    if (selectedNoteId === noteId) {
      setSelectedNoteId(null);
    }
  };

  return (
    <>
      {showForm && (
        <div className="modal-bg" onMouseDown={closeForm}>
          <div className="modal note-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2>{editingNote ? "Chỉnh sửa Note" : "Thêm Note"}</h2>
              
              <button type="button" onClick={closeForm} aria-label="Đóng">
                <Icon type="close" />
              </button>
            </div>
            <label>
              Tiêu đề
              <input
                value={draft.title}
                onChange={(e) => setDraft((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Nhập tiêu đề ghi chú..."
              />
            </label>

            <label>
              Nội dung
              <textarea
                value={draft.text}
                onChange={(e) => setDraft((prev) => ({ ...prev, text: e.target.value }))}
                placeholder="Viết ghi chú của bạn..."
              />
            </label>

            <div className="note-form-inline">
              <label className="compact-field">
                Thời gian nhắc
                <input
                  type="datetime-local"
                  value={getLocalDateTimeValue(draft.reminderAt)}
                  onChange={(e) => setDraft((prev) => ({ ...prev, reminderAt: new Date(e.target.value).toISOString() }))}
                />
              </label>

              <label className="compact-field color-field">
                Màu
                <div className="note-color-row">
                  {NOTE_COLORS.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      className={`note-color ${color.id} ${draft.color === color.id ? "active" : ""}`}
                      onClick={() => setDraft((prev) => ({ ...prev, color: color.id }))}
                      aria-label={`Chọn màu ${color.id}`}
                    />
                  ))}
                </div>
              </label>
            </div>

            <label className="category-field">
              Chủ đề
              <div className="category-picker">
                {CATEGORY_OPTIONS.filter((option) => option.id !== "all").map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`category-option ${draft.category === option.id ? "active" : ""}`}
                    onClick={() => setDraft((prev) => ({ ...prev, category: option.id }))}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </label>

            <label className="private-note-toggle">
              <input
                type="checkbox"
                checked={draft.isPrivate}
                onChange={(e) => setDraft((prev) => ({ ...prev, isPrivate: e.target.checked }))}
              />
              <span>
                <b>Khóa quyền riêng tư</b>
                <small>Chỉ bạn có thể xem ghi chú này</small>
              </span>
            </label>

            <div className="modal-actions">
              <button className="secondary" type="button" onClick={closeForm}>
                Hủy
              </button>
              <button className="primary" type="button" onClick={handleSave}>
                {editingNote ? "Lưu thay đổi" : "Lưu Note"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="notes-layout notes-layout-single">
        <main className="notes-editor-panel notes-editor-panel-single">
          <div className="notes-toolbar-row notes-toolbar-row-right">
            <button type="button" className="primary note-add-button" onClick={openAddForm}>
              <Icon type="plus" /> Thêm ghi chú
            </button>
          </div>

          <div className="category-filter-row">
            {CATEGORY_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`category-filter ${activeCategory === option.id ? "active" : ""}`}
                onClick={() => setActiveCategory(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>

          {filteredNotes.length > 0 ? (
            <>
              <div className="note-grid note-grid-compact">
                {filteredNotes.map((note) => (
                  <article
                    key={note.id}
                    className={`note-card ${note.color || "yellow"} ${selectedNoteId === note.id ? "selected" : ""}`}
                    onClick={() => {
                      setSelectedNoteId(note.id);
                      onOpenNoteDetail?.(note);
                    }}
                  >
                    <div className="note-card-head">
                      <span className="mini-mark" data-color={note.color || "yellow"} />
                      <span className="note-card-date">{formatDateText(note.createdAt || note.reminderAt)}</span>
                    </div>
                    <div className="note-category-chip">{getCategoryLabel(note.category)}</div>
                    <h3>{note.title}</h3>
                    <p>{note.text}</p>
                    <div className="note-card-footer">
                      <span>{formatDateText(note.reminderAt || note.createdAt, "reminder")}</span>
                    </div>
                    <div className="note-card-actions">
                      <button type="button" onClick={(e) => { e.stopPropagation(); openEditForm(note); }} aria-label="Sửa ghi chú">✎</button>
                      <button type="button" onClick={(e) => { e.stopPropagation(); handleDeleteNote(note.id); }} aria-label="Xóa ghi chú">🗑</button>
                    </div>
                  </article>
                ))}
              </div>

            </>
          ) : (
            <div className="empty-note large">
              <div className="empty-note-message">{searchQuery ? "Không tìm thấy ghi chú nào phù hợp." : "Chưa có ghi chú nào."}</div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
    
