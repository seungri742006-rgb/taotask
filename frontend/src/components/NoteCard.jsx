import React, { useState } from "react";
import Icon from "./Icon";

export default function NoteCard({ note, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <article className={`note-card ${note.color}`}>
      <div className="note-pin">●</div>
      <button
        type="button"
        className="note-more"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="More actions"
      >
        <Icon type="more" />
      </button>

      {menuOpen && (
        <div className="note-menu">
          <button
            type="button"
            onClick={() => {
              onEdit?.(note);
              setMenuOpen(false);
            }}
          >
            Chỉnh sửa
          </button>
          <button
            type="button"
            className="danger"
            onClick={() => {
              setConfirmDelete(true);
              setMenuOpen(false);
            }}
          >
            Xóa
          </button>
        </div>
      )}

      <h3>{note.title}</h3>
      <p>{note.text}</p>
      <div className="note-footer">
        20/09/2026 <span>•••</span>
      </div>

      {confirmDelete && (
        <div className="delete-confirm" role="alertdialog" aria-label="Xác nhận xóa ghi chú">
          <strong>Bạn chắc chắn muốn xóa?</strong>
          <span>Ghi chú này sẽ bị xóa khỏi danh sách.</span>
          <div className="delete-confirm-actions">
            <button type="button" onClick={() => setConfirmDelete(false)}>Hủy</button>
            <button type="button" className="danger" onClick={() => onDelete?.(note.id)}>Xóa</button>
          </div>
        </div>
      )}
    </article>
  );
}
