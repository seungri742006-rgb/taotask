import React, { useEffect, useState } from "react";
import Icon from "../components/Icon";
import ProjectCard from "../components/ProjectCard";
import NoteCard from "../components/NoteCard";

const NOTE_COLORS = [
  { id: "yellow", hex: "#fef08a" },
  { id: "green", hex: "#bbf7d0" },
  { id: "blue", hex: "#bfdbfe" },
  { id: "red", hex: "#fecaca" },
  { id: "purple", hex: "#e9d5ff" },
  { id: "orange", hex: "#fed7aa" },
  { id: "pink", hex: "#fbcfe8" },
  { id: "gray", hex: "#e5e7eb" },
];

export default function Projects({
  projects = [],
  notes = [],
  selectedProjectId = null,
  onSelectProject,
  onAdd,
  onDelete,
  onEdit,
  onAddNote,
}) {
  const [query, setQuery] = useState("");
  const [showComposer, setShowComposer] = useState(false);
  const [draft, setDraft] = useState({ title: "", text: "", color: "yellow" });
  const [selectedTaskKey, setSelectedTaskKey] = useState(null);

  useEffect(() => {
    if (selectedProjectId) {
      setShowComposer(true);
      setDraft((prev) => ({ ...prev, title: "", text: "" }));
    }
  }, [selectedProjectId]);

  const filtered = (projects || []).filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const selectedProject = (projects || []).find(
    (project) => Number(project.id) === Number(selectedProjectId)
  );

  const selectedNotes = selectedProjectId
    ? (notes || []).filter((note) => Number(note.projectId) === Number(selectedProjectId))
    : [];

  const handleDelete = (projectId) => {
    onDelete?.(projectId);
  };

  const handleEdit = (project) => {
    onEdit?.(project);
  };

  const handleSaveNote = () => {
    if (!selectedProjectId) return;

    const title = draft.title.trim();
    const text = draft.text.trim();
    if (!title || !text) return;

    onAddNote?.({
      id: Date.now(),
      projectId: Number(selectedProjectId),
      title,
      text,
      color: draft.color,
      isPrivate: false,
    });

    setDraft({ title: "", text: "", color: "yellow" });
    setShowComposer(false);
  };

  const boardColumns = [
    {
      id: "plan",
      title: "Kế hoạch Q4 2026",
      accent: "blue",
      tasks: [
        { title: "Bộ Phận sản xuất", meta: "" },
        { title: "Phòng Hành Chính", meta: "" },
      ],
    },
    {
      id: "task",
      title: "Công việc",
      accent: "green",
      tasks: [
        { title: "Bộ Phận sản xuất", meta: "" },
        { title: "Phòng Hành Chính", meta: "" },
      ],
    },
    {
      id: "goal",
      title: "Mục tiêu",
      accent: "yellow",
      tasks: [
        { title: "Bộ Phận sản xuất", meta: "" },
        { title: "Phòng Hành Chính", meta: "" },
      ],
    },
    {
      id: "study",
      title: "Học tập",
      accent: "purple",
      tasks: [
        { title: "Bộ Phận sản xuất", meta: "" },
        { title: "Phòng Hành Chính", meta: "" },
      ],
    },
  ];

  const taskNotesMap = {
    "plan-0": [
      { title: "Ghi chú sản xuất", text: "Tăng năng suất dây chuyền, kiểm tra nguyên liệu và bắt đầu sản xuất theo lịch mới." },
      { title: "Hạn chót", text: "Hoàn tất giao hàng phần 1 trước ngày 30/09." },
    ],
    "plan-1": [
      { title: "Ghi chú hành chính", text: "Cập nhật báo cáo nhân sự và chuẩn bị lịch họp tuần." },
      { title: "Vấn đề cần xử lý", text: "Duyệt hồ sơ hợp đồng và xác nhận phê duyệt với ban lãnh đạo." },
    ],
    "task-0": [
      { title: "Công việc sản xuất", text: "Theo dõi tiến độ từng đơn vị, đồng bộ dữ liệu sản xuất với kế hoạch." },
      { title: "Mức ưu tiên", text: "Đặt ưu tiên cao cho đơn hàng lớn và sản phẩm mới." },
    ],
    "task-1": [
      { title: "Công việc hành chính", text: "Rà soát lịch trình, cập nhật hồ sơ và mở hội nghị nội bộ." },
      { title: "Lưu ý", text: "Các quyết định cần được xác nhận trước khi triển khai." },
    ],
    "goal-0": [
      { title: "Mục tiêu sản xuất", text: "Tăng hiệu suất 15% trong quý IV và giảm lỗi vận hành." },
      { title: "Chỉ số đo lường", text: "Số đơn hàng đúng tiến độ và tỷ lệ lỗi trên mỗi ca làm việc." },
    ],
    "goal-1": [
      { title: "Mục tiêu hành chính", text: "Hoàn tất báo cáo hàng quý và cải thiện quy trình phê duyệt." },
      { title: "Kết quả mong muốn", text: "Giảm thời gian xử lý hồ sơ xuống còn 2 ngày." },
    ],
    "study-0": [
      { title: "Học tập sản xuất", text: "Nghiên cứu phương pháp tối ưu dây chuyền và kỹ thuật kiểm soát chất lượng." },
      { title: "Tài liệu tham khảo", text: "Đọc bài báo về quy trình sản xuất thông minh và giảm lãng phí." },
    ],
    "study-1": [
      { title: "Học tập hành chính", text: "Nâng cao kỹ năng tổ chức thời gian và quản lý dự án cá nhân." },
      { title: "Lộ trình", text: "Thực hành với checklist và theo dõi hiệu quả sau mỗi tuần." },
    ],
  };

  const selectedTask = (() => {
    if (!selectedTaskKey) return null;
    const [columnId, index] = selectedTaskKey.split("-");
    const column = boardColumns.find((item) => item.id === columnId);
    const task = column?.tasks?.[Number(index)] || column?.tasks?.[0];
    return { column, task, notes: taskNotesMap[selectedTaskKey] || [] };
  })();

  return (
    <div className="projects-layout board-only">
      <main className="projects-panel board-only-panel">
        <div className="project-board-header">
          <span className="project-board-title">Thêm project</span>
          <button className="mini-add board-add" type="button" onClick={onAdd} aria-label="Thêm project">
            <Icon type="plus" />
          </button>
        </div>

        <div className="project-board-grid">
          {boardColumns.map((column) => (
            <div
              key={column.id}
              className={`project-column ${column.accent}`}
              onClick={() => setSelectedTaskKey(`${column.id}-0`)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedTaskKey(`${column.id}-0`);
                }
              }}
            >
              <div className="project-column-header">
                <span className="column-title">{column.title}</span>
                <button type="button" className="column-plus" aria-label={`Thêm ${column.title}`}>+</button>
              </div>

              <div className="search board-search">
                <Icon type="search" />
                <input placeholder="Search......" />
              </div>

              <div className="project-task-list">
                {column.tasks.map((task, idx) => {
                  const key = `${column.id}-${idx}`;
                  const isActive = selectedTaskKey === key;

                  return (
                    <button
                      key={key}
                      type="button"
                      className={`project-task-card ${isActive ? "active" : ""}`}
                      onClick={() => setSelectedTaskKey(key)}
                    >
                      <div className="task-line">
                        <span className="task-bullet" />
                        <span className="task-text">{task.title}</span>
                      </div>
                      <div className="task-track" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {selectedTask && selectedTask.notes.length > 0 && (
          <div className="project-note-panel">
            <div className="project-note-header">
              <span className="project-note-label">Ghi chú</span>
              <strong>{selectedTask.task?.title}</strong>
            </div>

            <div className="project-note-list">
              {selectedTask.notes.map((note, index) => (
                <div key={`${selectedTask.task?.title}-${index}`} className="project-note-item">
                  <h4>{note.title}</h4>
                  <p>{note.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
