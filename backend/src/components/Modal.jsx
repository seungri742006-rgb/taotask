import React, { useEffect, useState } from "react";
import Icon from "./Icon";

const COLORS = [
  { id: "blue", label: "Xanh" },
  { id: "green", label: "Xanh lá" },
  { id: "yellow", label: "Vàng" },
  { id: "purple", label: "Tím" },
  { id: "red", label: "Đỏ" },
  { id: "pink", label: "Hồng" },
  { id: "orange", label: "Cam" },
  { id: "gray", label: "Xám" },
];

export default function Modal({ onClose, onAddProject, onUpdateProject, editingProject = null }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    desc: "",
    date: "",
    color: "blue",
  });

  useEffect(() => {
    if (!editingProject) {
      setForm({
        name: "",
        desc: "",
        date: "",
        color: "blue",
      });
      return;
    }

    setForm({
      name: editingProject.name || "",
      desc: editingProject.desc || "",
      date: editingProject.date ? editingProject.date.split("/").reverse().join("-") : "",
      color: editingProject.color || "blue",
    });
  }, [editingProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event?.preventDefault?.();

    const name = form.name.trim();
    if (!name) return;

    setSaving(true);
    setError("");
    const nextDate = form.date
      ? new Date(`${form.date}T00:00:00`).toLocaleDateString("vi-VN")
      : new Date().toLocaleDateString("vi-VN");

    try {
      if (editingProject) {
        await onUpdateProject?.({
          ...editingProject,
          name,
          desc: form.desc.trim() || "Dự án mới được thêm vào",
          color: form.color,
          date: nextDate,
        });
      } else {
        await onAddProject?.({
          name,
          desc: form.desc.trim() || "Dự án mới được thêm vào",
          progress: 0,
          color: form.color,
          date: nextDate,
        });
      }
      onClose?.();
    } catch (submitError) {
      setError(submitError.message || "Không thể lưu project. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-bg" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="modal-head">
            <h2>{editingProject ? "Chỉnh sửa Project" : "Thêm Project"}</h2>
            <button type="button" onClick={onClose}>
              <Icon type="close" />
            </button>
          </div>

          <label>
            Tên Project
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nhập tên project..."
            />
          </label>

          <label>
            Mô tả
            <textarea
              name="desc"
              value={form.desc}
              onChange={handleChange}
              placeholder="Mô tả project..."
            />
          </label>

          <label>
            Ngày bắt đầu
            <input type="date" name="date" value={form.date} onChange={handleChange} />
          </label>

          <label>
            Màu sắc
            <div className="project-color-row">
              {COLORS.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  className={`project-color ${color.id} ${form.color === color.id ? "active" : ""}`}
                  onClick={() => setForm((prev) => ({ ...prev, color: color.id }))}
                  title={color.label}
                  aria-label={color.label}
                />
              ))}
            </div>
          </label>

            {error && <p className="auth-message" role="alert">{error}</p>}

            <div className="modal-actions">
              <button className="secondary" type="button" onClick={onClose} disabled={saving}>Hủy</button>
              <button className="primary" type="submit" disabled={!form.name.trim() || saving}>
                {saving ? "Đang lưu..." : editingProject ? "Lưu thay đổi" : "Lưu Project"}
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}
