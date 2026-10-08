import React, { useState } from "react";
import Icon from "./Icon";

export default function ProjectCard({ project, notes = [], onEdit, onDelete, onSelect, isSelected }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const relatedNotes = (notes || [])
    .filter((note) => Number(note.projectId) === Number(project.id))
    .slice(0, 2);

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  return (
    <article
      className={`project-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect?.(project.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect?.(project.id);
        }
      }}
    >
      <div className={`project-top ${project.color}`}>
        <div className="folder-icon">
          <Icon type="folder" />
        </div>

        <div className="project-menu-wrap">
          <button
            className="more"
            onClick={handleMenuClick}
            aria-label="More actions"
          >
            <Icon type="more" />
          </button>

          {menuOpen && (
            <div className="project-menu">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onEdit?.(project);
                  setMenuOpen(false);
                }}
              >
                Chỉnh sửa
              </button>
              <button
                type="button"
                className="danger"
                onClick={(event) => {
                  event.stopPropagation();
                  setConfirmDelete(true);
                  setMenuOpen(false);
                }}
              >
                Xóa
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="project-body">
        <div className="project-title-row">
          <h3>{project.name}</h3>
          <span className="status">Đang làm</span>
        </div>
        <p>{project.desc}</p>

        <div className="project-notes-inline">
          {relatedNotes.length > 0 ? (
            relatedNotes.map((note) => (
              <div key={note.id} className="project-mini-note">
                <span className={`mini-note-dot ${note.color || "green"}`} />
                <span>{note.title}</span>
              </div>
            ))
          ) : (
            <div className="project-mini-note empty">
              <span className="mini-note-dot gray" />
              <span>Chưa có ghi chú</span>
            </div>
          )}
        </div>

        
        <div className="project-footer">
          <span>◷ {project.date}</span>
          <span>•••</span>
        </div>
      </div>

      {confirmDelete && (
        <div className="delete-confirm" role="alertdialog" aria-label="Xác nhận xóa project">
          <strong>Bạn chắc chắn muốn xóa?</strong>
          <span>Project này sẽ bị xóa khỏi danh sách.</span>
          <div className="delete-confirm-actions">
            <button type="button" onClick={() => setConfirmDelete(false)}>Hủy</button>
            <button type="button" className="danger" onClick={() => onDelete?.(project.id)}>Xóa</button>
          </div>
        </div>
      )}
    </article>
  );
}
