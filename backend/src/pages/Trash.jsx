import React from "react";
import { useState } from "react";

export default function Trash({ items = [], onRestore, onPermanentDelete }) {
  const [confirmItem, setConfirmItem] = useState(null);
  const [actionError, setActionError] = useState("");

  const restoreItem = async (trashItem) => {
    setActionError("");
    try {
      await onRestore?.(trashItem);
    } catch (error) {
      setActionError(error.message || "Không thể khôi phục mục này.");
    }
  };

  if (items.length > 0) {
    return (
      <section className="trash-page">
        <div className="section-head">
          <div><h2>Thùng rác</h2><p>Nội dung đã xóa tạm thời</p></div>
          <span className="private-note-count">{items.length} mục</span>
        </div>
        {actionError && <p className="project-action-error" role="alert">{actionError}</p>}
        <div className="trash-list">
          {items.map((trashItem) => (
            <article className="trash-item" key={`${trashItem.type}-${trashItem.item.id}`}>
              <div className="trash-item-icon">{trashItem.type === "note" ? "▤" : "▣"}</div>
              <div className="trash-item-copy">
                <b>{trashItem.type === "note" ? trashItem.item.title : trashItem.item.name}</b>
                <small>{trashItem.type === "note" ? "Ghi chú" : "Project"}</small>
              </div>
              <div className="trash-item-actions">
                <button type="button" onClick={() => restoreItem(trashItem)}>Khôi phục</button>
                <button type="button" className="danger" onClick={() => setConfirmItem(trashItem)}>Xóa vĩnh viễn</button>
              </div>
              {confirmItem === trashItem && (
                <div className="trash-confirm">
                  <strong>Xóa vĩnh viễn?</strong>
                  <span>Không thể khôi phục mục này.</span>
                  <div className="delete-confirm-actions">
                    <button type="button" onClick={() => setConfirmItem(null)}>Hủy</button>
                    <button type="button" className="danger" onClick={() => { onPermanentDelete?.(trashItem); setConfirmItem(null); }}>Xóa</button>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="empty-trash">
        <div className="empty-icon">♲</div>
        <h2>Thùng rác trống</h2>
        <p>Các nội dung bạn xóa sẽ xuất hiện ở đây.</p>
      </div>
    </>
  );
}
