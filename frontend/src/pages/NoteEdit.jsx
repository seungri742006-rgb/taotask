import React, { useState } from "react";
import Header from "../components/Header";
import Icon from "../components/Icon";

const NOTE_COLORS = [
  { id: "yellow", label: "Vàng" },
  { id: "green", label: "Xanh lá" },
  { id: "blue", label: "Xanh dương" },
  { id: "red", label: "Đỏ" },
  { id: "purple", label: "Tím" },
  { id: "orange", label: "Cam" },
  { id: "pink", label: "Hồng" },
  { id: "gray", label: "Xám" },
  { id: "cyan", label: "Xanh cyan" },
  { id: "emerald", label: "Xanh ngọc" },
  { id: "indigo", label: "Chàm" },
];

export default function NoteEdit({ note, onSave, onCancel }) {
  const [draft, setDraft] = useState({
    title: note?.title || "",
    text: note?.text || "",
    color: note?.color || "yellow",
    isPrivate: Boolean(note?.isPrivate),
  });

  const updateDraft = (field, value) => {
    setDraft((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = draft.title.trim();
    const text = draft.text.trim();

    if (!title || !text || !note) return;

    onSave({ ...note, title, text, color: draft.color, isPrivate: draft.isPrivate });
  };

  if (!note) {
    return (
      <div className="note-edit-page">
        <Header title="Chỉnh sửa ghi chú" subtitle="Không tìm thấy ghi chú cần chỉnh sửa" />
        <button className="secondary" type="button" onClick={onCancel}>
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="note-edit-page">
      <Header title="Chỉnh sửa ghi chú" subtitle="Cập nhật nội dung ghi chú của bạn" />

      <form className="note-edit-form" onSubmit={handleSubmit}>
        <div className="note-edit-topbar">
          <button className="back-button" type="button" onClick={onCancel}>
            <Icon type="arrow-left" /> Quay lại tổng quan
          </button>
          <span className={`note-edit-preview ${draft.color}`}>Đang chỉnh sửa</span>
        </div>

        <label>
          Tiêu đề
          <input
            value={draft.title}
            onChange={(event) => updateDraft("title", event.target.value)}
            placeholder="Nhập tiêu đề ghi chú..."
            autoFocus
          />
        </label>

        <label>
          Nội dung
          <textarea
            value={draft.text}
            onChange={(event) => updateDraft("text", event.target.value)}
            placeholder="Viết ghi chú của bạn..."
          />
        </label>

        <label>
          Màu ghi chú
          <div className="note-color-row">
            {NOTE_COLORS.map((color) => (
              <button
                key={color.id}
                type="button"
                className={`note-color ${color.id} ${draft.color === color.id ? "active" : ""}`}
                onClick={() => updateDraft("color", color.id)}
                aria-label={`Chọn màu ${color.label}`}
              />
            ))}
          </div>
        </label>

        <label className="private-note-toggle">
          <input
            type="checkbox"
            checked={draft.isPrivate}
            onChange={(event) => updateDraft("isPrivate", event.target.checked)}
          />
          <span>
            <b>Khóa quyền riêng tư</b>
            <small>Chỉ bạn có thể xem ghi chú này</small>
          </span>
        </label>

        <div className="note-edit-actions">
          <button className="secondary" type="button" onClick={onCancel}>
            Hủy
          </button>
          <button className="primary" type="submit">
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}
