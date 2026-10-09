import React from "react";
import Header from "../components/Header";
import Icon from "../components/Icon";

const getCategoryLabel = (category, options) =>
  options.find((item) => item.id === category)?.label || "Khác";

export default function NoteDetail({ note, categoryOptions = [], onBack, onEdit, onDelete }) {
  if (!note) {
    return (
      <div className="note-edit-page">
        <Header title="Chi tiết ghi chú" subtitle="Không tìm thấy ghi chú" />
        <button className="secondary" type="button" onClick={onBack}>
          Quay lại
        </button>
      </div>
    );
  }

  const formatDateTime = (value) => {
    if (!value) return "Chưa có";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Chưa có";
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const colorClass = note.color || "yellow";

  return (
    <div className="note-edit-page">
      <Header title="Chi tiết ghi chú" subtitle="Xem nội dung chi tiết của ghi chú" />

      <div className={`note-detail-card ${colorClass}`}>
        <div className="note-detail-head">
          <button className="back-button" type="button" onClick={onBack}>
            <Icon type="arrow-left" /> Quay lại
          </button>

          <div className="note-detail-actions">
            <button className="secondary" type="button" onClick={() => onEdit?.(note)}>
              Chỉnh sửa
            </button>
            <button className="primary" type="button" onClick={() => onDelete?.(note.id)}>
              Xóa
            </button>
          </div>
        </div>

        <div className="note-detail-content">
          <span className="note-detail-badge">{getCategoryLabel(note.category, categoryOptions)}</span>
          <h2>{note.title}</h2>
          <div className="note-detail-meta">
            <span>Thời gian tạo: {formatDateTime(note.createdAt)}</span>
            <span>Thời gian cập nhật: {formatDateTime(note.updatedAt || note.createdAt)}</span>
          </div>
          <div className="note-detail-body">
            <p>{note.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
