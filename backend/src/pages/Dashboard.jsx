import React from "react";
import Header from "../components/Header";
import Icon from "../components/Icon";
import NoteCard from "../components/NoteCard";

const overviewHighlights = [
  { label: "Tổng Project", value: "03", tone: "purple", icon: "▣" },
  { label: "Đang thực hiện", value: "02", tone: "blue", icon: "✓" },
  { label: "Ghi chú", value: "03", tone: "green", icon: "✦" },
  { label: "Hoàn thành", value: "01", tone: "orange", icon: "↻" },
];

export default function Dashboard({
  setPage,
  projects = [],
  notes = [],
  taskLists = {},
  checkedTasks = {},
  onEditNote,
  onDeleteNote,
  searchQuery = "",
  onSearchChange,
}) {
  const normalizedQuery = (searchQuery || "").trim().toLowerCase();
  const filteredProjects = (projects || []).filter((project) => {
    if (!normalizedQuery) return true;
    const haystack = `${project.name || ""} ${project.desc || ""}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });

  const filteredNotes = (notes || []).filter((note) => {
    if (!normalizedQuery) return true;
    const haystack = `${note.title || ""} ${note.text || ""}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });

  const recentProjects = filteredProjects.slice(0, 3);
  const latestNotes = filteredNotes.slice(0, 3);

  const totalTasks = recentProjects.reduce((sum, project) => sum + (taskLists[project.id]?.length || 0), 0);
  const completedTasks = recentProjects.reduce((sum, project) => {
    const tasks = taskLists[project.id] || [];
    return sum + tasks.filter((_, index) => Boolean(checkedTasks[`${project.id}-${index}`])).length;
  }, 0);
  const completionPercent = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const overviewHighlights = [
    { label: "Tổng Project", value: String(filteredProjects.length), tone: "purple", icon: "▣" },
    { label: "Đang thực hiện", value: String(Math.max(filteredProjects.length - completedTasks, 0)), tone: "blue", icon: "✓" },
    { label: "Ghi chú", value: String(filteredNotes.length), tone: "green", icon: "✦" },
    { label: "Hoàn thành", value: `${completionPercent}%`, tone: "orange", icon: "↻" },
  ];

  return (
    <>
      <Header
        title="Tổng quan"
        subtitle="Chào mừng bạn quay trở lại 👋"
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />

      <section className="overview-hero">
        <div className="overview-hero-card">
          <div className="overview-badge">Hôm nay</div>
          <h2>Xu hướng công việc tuần này</h2>
          <p>
            Bạn đang đi đúng tiến độ. Hãy hoàn thiện {Math.max(2 - completedTasks, 0)} nhiệm vụ trọng tâm để giữ nhịp làm việc ổn định.
          </p>
          <div className="overview-hero-actions">
            <button className="primary" onClick={() => setPage("projects")}>Quản lý dự án</button>
            <button className="secondary" onClick={() => setPage("notes")}>Ghi chú của bạn</button>
          </div>
        </div>
      </section>

      <section className="stats">
        {overviewHighlights.map((item) => (
          <div key={item.label} className="stat-card">
            <div className={`stat-icon ${item.tone}`}>{item.icon}</div>
            <div>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          </div>
        ))}
      </section>

      <div className="overview-panels">
        <div className="overview-panel">
          <div className="section-head">
            <div>
              <h2>Project gần đây</h2>
              <p>Những dự án bạn đang theo dõi</p>
            </div>
            <button className="text-button" onClick={() => setPage("projects")}>Xem tất cả →</button>
          </div>

          <div className="overview-project-list">
            {recentProjects.length > 0 ? (
              recentProjects.map((project, index) => (
                <div key={project.id || index} className="overview-project-item" onClick={() => setPage("projects")}>
                  <div className={`overview-project-flag ${project.color || "purple"}`} />
                  <div className="overview-project-copy">
                    <div className="overview-project-top">
                      <strong>{project.name}</strong>
                      <span>{Math.round(((taskLists[project.id] || []).filter((_, index) => Boolean(checkedTasks[`${project.id}-${index}`])).length / Math.max((taskLists[project.id] || []).length, 1)) * 100)}%</span>
                    </div>
                    <p>{project.desc}</p>
                    <div className="progress small-progress">
                      <i
                        style={{
                          width: `${
                            ((taskLists[project.id] || []).filter((_, index) => Boolean(checkedTasks[`${project.id}-${index}`])).length /
                              Math.max((taskLists[project.id] || []).length, 1)) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-note-message">Không tìm thấy project nào phù hợp.</div>
            )}
          </div>
        </div>

        <div className="overview-panel">
          <div className="section-head">
            <div>
              <h2>Ghi chú mới nhất</h2>
              <p>Các ghi chú được cập nhật gần đây</p>
            </div>
            <button className="text-button" onClick={() => setPage("notes")}>Xem tất cả →</button>
          </div>

          <section className="overview-note-list">
            {latestNotes.length > 0 ? (
              latestNotes.map((note, i) => (
                <div key={note.id || i} className={`overview-note-card ${note.color || "purple"}`} onClick={() => onEditNote?.(note)}>
                  <div className="overview-note-head">
                    <span className="overview-note-dot" />
                    <strong>{note.title}</strong>
                  </div>
                  <p>{note.text}</p>
                </div>
              ))
            ) : (
              <div className="empty-note-message">Không tìm thấy ghi chú nào phù hợp.</div>
            )}
          </section>
        </div>
      </div>

    </>
  );
}
