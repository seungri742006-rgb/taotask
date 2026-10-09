import React, { useState } from "react";
import Icon from "../components/Icon";

export default function Projects({
  projects = [],
  notes = [],
  selectedProjectId = null,
  taskLists = {},
  checkedTasks = {},
  onSelectProject,
  onAdd,
  onDelete,
  onEdit,
  onAddNote,
  onToggleTask,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  searchQuery = "",
}) {
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState({ projectId: null, index: null, value: "" });
  const [projectActionError, setProjectActionError] = useState("");
  const normalizedQuery = (searchQuery || "").trim().toLowerCase();
  const filtered = (projects || []).filter((project) => {
    if (!normalizedQuery) return true;
    const haystack = `${project.name || ""} ${project.desc || ""}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });
  const selectedProject = filtered.find((project) => Number(project.id) === Number(selectedProjectId));
  const fallbackTasks = ["Xác định công việc cần làm", "Cập nhật tiến độ project"];
  const selectedTasks = selectedProject ? (taskLists[selectedProject.id] || fallbackTasks) : [];

  const toggleTask = (projectId, taskIndex) => {
    onToggleTask?.(projectId, taskIndex);
  };

  const addTask = () => {
    const task = newTask.trim();
    if (!task || !selectedProject) return;
    onAddTask?.(selectedProject.id, task);
    setNewTask("");
  };

  const saveTaskEdit = () => {
    if (!editingTask.projectId || editingTask.index === null) return;
    const nextValue = editingTask.value.trim();
    if (!nextValue) return;
    onUpdateTask?.(editingTask.projectId, editingTask.index, nextValue);
    setEditingTask({ projectId: null, index: null, value: "" });
  };

  const cancelTaskEdit = () => {
    setEditingTask({ projectId: null, index: null, value: "" });
  };

  const deleteProject = async (project) => {
    if (!window.confirm(`Xóa project "${project.name}"?`)) return;

    setProjectActionError("");
    try {
      await onDelete?.(project.id);
    } catch (error) {
      setProjectActionError(error.message || "Không thể xóa project. Vui lòng thử lại.");
    }
  };

  return (
    <section className="projects-page">
      <div className="projects-recent-panel">
        <div className="projects-recent-head">
          <div>
            <h2>Project gần đây</h2>
            <p>Những dự án bạn đang theo dõi</p>
          </div>
          <div className="projects-head-actions">
          
            <button className="mini-add projects-add" type="button" onClick={onAdd} aria-label="Thêm project">
              <Icon type="plus" />
            </button>
          </div>
        </div>

        <div className="projects-recent-list">
          {projectActionError && <p className="project-action-error" role="alert">{projectActionError}</p>}
          {filtered.map((project) => {
            const isSelected = Number(project.id) === Number(selectedProjectId);
            const projectTasks = taskLists[project.id] || fallbackTasks;
            const completedCount = projectTasks.filter((_, index) => checkedTasks[`${project.id}-${index}`]).length;
            const completionPercent = projectTasks.length ? Math.round((completedCount / projectTasks.length) * 100) : 0;

            return (
              <div className="recent-project-group" key={project.id}>
                <div className={`recent-project ${isSelected ? "selected" : ""}`}>
                  <button
                    type="button"
                    className="recent-project-toggle"
                    onClick={() => onSelectProject?.(project.id)}
                    aria-expanded={isSelected}
                  >
                    <span className={`recent-project-marker ${project.color}`} />
                    <span className="recent-project-copy">
                      <span className="recent-project-title">{project.name}</span>
                      <span className="recent-project-desc">{project.desc}</span>
                      {completedCount > 0 && (
                        <span className="recent-project-task-progress">
                          <span>Công việc {completionPercent}%</span>
                          <i><b style={{ width: `${completionPercent}%` }} /></i>
                        </span>
                      )}
                    </span>
                    <span className={`recent-project-chevron ${isSelected ? "open" : ""}`}>⌄</span>
                  </button>
                  <div className="recent-project-actions" aria-label={`Thao tác với ${project.name}`}>
                    <button
                      type="button"
                      className="project-action-edit"
                      onClick={() => onEdit?.(project)}
                      aria-label={`Chỉnh sửa ${project.name}`}
                      title="Chỉnh sửa project"
                    >
                      ✎
                    </button>
                    <button
                      type="button"
                      className="project-action-delete"
                      onClick={() => deleteProject(project)}
                      aria-label={`Xóa ${project.name}`}
                      title="Xóa project"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {isSelected && (
                  <div className="project-checklist" aria-label={`Danh sách công việc của ${project.name}`}>
                    <div className="project-checklist-head">
                      <strong>Danh sách công việc</strong>
                      <span>{completedCount}/{selectedTasks.length} hoàn thành</span>
                    </div>
                   
                
                    <div className="project-checklist-items">
                      {selectedTasks.map((task, index) => {
                        const taskKey = `${project.id}-${index}`;
                        const isChecked = Boolean(checkedTasks[taskKey]);
                        const isEditingThisTask =
                          editingTask.projectId === project.id && editingTask.index === index;

                        return (
                          <div className="project-check-item-wrap" key={taskKey}>
                            {isEditingThisTask ? (
                              <div className="project-check-edit">
                                <input
                                  value={editingTask.value}
                                  onChange={(event) =>
                                    setEditingTask((prev) => ({ ...prev, value: event.target.value }))
                                  }
                                  onKeyDown={(event) => {
                                    if (event.key === "Enter") saveTaskEdit();
                                    if (event.key === "Escape") cancelTaskEdit();
                                  }}
                                  aria-label="Chỉnh sửa tên công việc"
                                />
                                <div className="project-check-actions">
                                  <button type="button" className="mini-save" onClick={saveTaskEdit} aria-label="Lưu công việc">
                                    ✓
                                  </button>
                                  <button type="button" className="mini-cancel" onClick={cancelTaskEdit} aria-label="Huỷ chỉnh sửa">
                                    ×
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <label className={`project-check-item ${isChecked ? "checked" : ""}`}>
                                  <input type="checkbox" checked={isChecked} onChange={() => toggleTask(project.id, index)} />
                                  <span className="project-check-box"><Icon type="check" /></span>
                                  <span>{task}</span>
                                </label>
                                <div className="project-check-actions">
                                  <button
                                    type="button"
                                    className="mini-edit"
                                    onClick={() => setEditingTask({ projectId: project.id, index, value: task })}
                                    aria-label="Chỉnh sửa công việc"
                                  >
                                    ✎
                                  </button>
                                  <button
                                    type="button"
                                    className="mini-delete"
                                    onClick={() => onDeleteTask?.(project.id, index)}
                                    aria-label="Xoá công việc"
                                  >
                                    🗑
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="project-add-task">
                      <input
                        value={newTask}
                        onChange={(event) => setNewTask(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") addTask();
                        }}
                        placeholder="Thêm công việc mới..."
                        aria-label="Tên công việc mới"
                      />
                      <button type="button" onClick={addTask} aria-label="Thêm công việc">
                        <Icon type="plus" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && <p className="projects-empty">{searchQuery ? "Không tìm thấy project nào phù hợp." : "Chưa có project nào."}</p>}
        </div>
      </div>
      </section>
  );
}
