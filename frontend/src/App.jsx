import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Notes from "./pages/Notes";
import NoteEdit from "./pages/NoteEdit";
import NoteDetail from "./pages/NoteDetail";
import Trash from "./pages/Trash";
import Privacy from "./pages/Privacy";
import PasswordLock from "./pages/PasswordLock";
import Settings from "./pages/Settings";
import PrivateNotes from "./pages/PrivateNotes";
import Account from "./pages/Account";
import Auth from "./pages/Auth";
import authService from "./services/authService";
import notesService from "./services/notesService";
import projectsService from "./services/projectsService";
import { normalizeNote, buildNotePayload } from "./utils/noteStorage";
import { projects as initialProjects, notes as initialNotes } from "./data/sampleData";

const INITIAL_TASKS = {
  1: ["Chốt giao diện trang chủ", "Hoàn thiện giỏ hàng", "Kiểm tra responsive", "Deploy bản thử nghiệm"],
  2: ["Thiết kế component", "Kết nối API", "Viết test cho chức năng chính", "Hoàn thiện Dashboard"],
  3: ["Tạo schema database", "Viết truy vấn SQL", "Kiểm tra các mối quan hệ", "Tạo bản backup dữ liệu"],
};

export default function App() {
  const getStoredUser = () => {
    try {
      const savedUser = localStorage.getItem("tasknote-user");
      return savedUser ? JSON.parse(savedUser) : { name: "Dương", email: "" };
    } catch {
      return { name: "Dương", email: "" };
    }
  };

  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem("token")));
  const [page, setPage] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [detailNoteId, setDetailNoteId] = useState(null);
  const [privacyLockEnabled, setPrivacyLockEnabled] = useState(false);
  const [privacyPassword, setPrivacyPassword] = useState("");
  const [privateNotesUnlocked, setPrivateNotesUnlocked] = useState(false);
  const [account, setAccount] = useState(getStoredUser);
  const [projects, setProjects] = useState(initialProjects);
  const [notes, setNotes] = useState(initialNotes);
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjects[0]?.id ?? null);
  const [taskLists, setTaskLists] = useState(INITIAL_TASKS);
  const [checkedTasks, setCheckedTasks] = useState({});
  const [trashItems, setTrashItems] = useState([]);
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.warn("Đăng xuất thất bại, vẫn tiếp tục xoá session cục bộ.", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("tasknote-user");
      setIsAuthenticated(false);
      setPage("dashboard");
      setAccount({ name: "Dương", email: "" });
      setPrivateNotesUnlocked(false);
      setPrivacyLockEnabled(false);
      setPrivacyPassword("");
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const serverProjects = await projectsService.fetchProjects();
        if (Array.isArray(serverProjects)) setProjects(serverProjects);
      } catch (error) {
        console.error("Không thể tải project từ server:", error);
      }

      try {
        const serverNotes = await notesService.fetchNotes();
        if (Array.isArray(serverNotes)) setNotes(serverNotes.map(normalizeNote));
      } catch (error) {
        console.error("Không thể tải ghi chú từ server:", error);
      }
    };

    loadUserData();
  }, [isAuthenticated]);

  const handlePageChange = (nextPage) => {
    if (nextPage !== "private-notes") setPrivateNotesUnlocked(false);
    setPage(nextPage);
  };

  const handleAddProject = async (project) => {
    const savedProject = await projectsService.createProject(project);
    setProjects((prev) => [savedProject, ...prev]);
    setTaskLists((prev) => ({ ...prev, [savedProject.id]: [] }));
    setSelectedProjectId(savedProject.id);
    setShowModal(false);
    setEditingProject(null);
  };

  const handleDeleteProject = async (projectId) => {
    const project = projects.find((item) => item.id === projectId);
    await projectsService.deleteProject(projectId);
    if (project) {
      const projectCheckedTasks = Object.fromEntries(
        Object.entries(checkedTasks).filter(([key]) => key.startsWith(`${projectId}-`))
      );
      setTrashItems((items) => [{
        type: "project",
        item: project,
        tasks: taskLists[projectId] || [],
        checkedTasks: projectCheckedTasks,
      }, ...items]);
    }
    setProjects((prev) => prev.filter((item) => item.id !== projectId));
    setTaskLists((prev) => {
      const next = { ...prev };
      delete next[projectId];
      return next;
    });
    setCheckedTasks((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((key) => {
        if (key.startsWith(`${projectId}-`)) delete next[key];
      });
      return next;
    });
    setSelectedProjectId((prev) => (Number(prev) === Number(projectId) ? null : prev));
  };

  const handleSelectProject = (projectId) => {
    setSelectedProjectId((prev) => (Number(prev) === Number(projectId) ? null : Number(projectId)));
  };

  const handleUpdateProject = async (updatedProject) => {
    const savedProject = await projectsService.updateProject(updatedProject.id, updatedProject);
    setProjects((prev) =>
      prev.map((project) =>
        project.id === savedProject.id ? savedProject : project
      )
    );
    setShowModal(false);
    setEditingProject(null);
  };

  const handleToggleTask = (projectId, taskIndex) => {
    const taskKey = `${projectId}-${taskIndex}`;
    setCheckedTasks((prev) => ({ ...prev, [taskKey]: !prev[taskKey] }));
  };

  const handleAddTask = (projectId, taskText) => {
    const trimmed = taskText.trim();
    if (!trimmed) return;
    setTaskLists((prev) => ({
      ...prev,
      [projectId]: [...(prev[projectId] || []), trimmed],
    }));
  };

  const handleUpdateTask = (projectId, taskIndex, nextText) => {
    const trimmed = nextText.trim();
    if (!trimmed) return;

    setTaskLists((prev) => {
      const tasks = [...(prev[projectId] || [])];
      if (!tasks[taskIndex]) return prev;
      tasks[taskIndex] = trimmed;
      return { ...prev, [projectId]: tasks };
    });
  };

  const handleDeleteTask = (projectId, taskIndex) => {
    setTaskLists((prev) => {
      const tasks = [...(prev[projectId] || [])];
      if (!tasks[taskIndex]) return prev;
      return {
        ...prev,
        [projectId]: tasks.filter((_, index) => index !== taskIndex),
      };
    });

    setCheckedTasks((prev) => {
      const next = {};
      Object.keys(prev).forEach((key) => {
        const [currentProjectId, currentIndex] = key.split("-");
        if (Number(currentProjectId) !== Number(projectId)) {
          next[key] = prev[key];
          return;
        }

        const numericIndex = Number(currentIndex);
        if (numericIndex < taskIndex) {
          next[key] = prev[key];
        } else if (numericIndex > taskIndex) {
          next[`${projectId}-${numericIndex - 1}`] = prev[key];
        }
      });
      return next;
    });
  };

  const handleAddNote = async (note) => {
    const payload = buildNotePayload(note);
    const normalized = normalizeNote(payload);

    setNotes((prev) => [normalized, ...prev]);
    if (payload.projectId) setSelectedProjectId(Number(payload.projectId));

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const savedNote = await notesService.createNote({
        title: payload.title,
        text: payload.text,
        content: payload.content,
        category: payload.category,
        color: payload.color,
        projectId: payload.projectId,
        isPrivate: payload.isPrivate,
        reminderAt: payload.reminderAt,
      });
      setNotes((prev) => [normalizeNote(savedNote), ...prev.filter((item) => String(item.id) !== String(payload.id))]);
    } catch (error) {
      console.error("Lưu ghi chú thất bại:", error);
    }
  };

  const handleUpdateNote = async (updatedNote) => {
    const normalized = normalizeNote(updatedNote);
    setNotes((prev) =>
      prev.map((note) =>
        note.id === normalized.id
          ? {
              ...note,
              ...normalized,
              updatedAt: new Date().toISOString(),
            }
          : note
      )
    );

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const savedNote = await notesService.updateNote(normalized.id, {
        title: normalized.title,
        text: normalized.text,
        content: normalized.content,
        category: normalized.category,
        color: normalized.color,
        projectId: normalized.projectId,
        isPrivate: normalized.isPrivate,
        reminderAt: normalized.reminderAt,
      });
      setNotes((prev) =>
        prev.map((note) =>
          String(note.id) === String(savedNote?.id ?? normalized.id)
            ? normalizeNote({ ...note, ...savedNote, updatedAt: new Date().toISOString() })
            : note
        )
      );
    } catch (error) {
      console.error("Cập nhật ghi chú thất bại:", error);
    }
  };

  const openEditNote = (note) => {
    setEditingNote(note);
    setPage("note-edit");
  };

  const saveEditedNote = (updatedNote) => {
    handleUpdateNote(updatedNote);
    setEditingNote(null);
    setPage("notes");
  };

  const openNoteDetail = (note) => {
    setDetailNoteId(note?.id ?? null);
    setPage("note-detail");
  };

  const handleDeleteNote = async (noteId, confirmed = false) => {
    if (!confirmed && !window.confirm("Bạn có muốn xóa ghi chú này không?")) {
      return false;
    }

    const note = notes.find((item) => String(item.id) === String(noteId));
    if (note) setTrashItems((items) => [{ type: "note", item: note }, ...items]);
    setNotes((prev) => prev.filter((item) => String(item.id) !== String(noteId)));

    const token = localStorage.getItem("token");
    if (!token) return true;

    try {
      await notesService.deleteNote(noteId);
    } catch (error) {
      console.error("Xóa ghi chú thất bại:", error);
    }
    return true;
  };

  const restoreTrashItem = async (trashItem) => {
    if (trashItem.type === "project") {
      const { id: deletedProjectId, ...projectData } = trashItem.item;
      const restoredProject = await projectsService.createProject(projectData);
      setProjects((prev) => [restoredProject, ...prev]);
      setTaskLists((prev) => ({
        ...prev,
        [restoredProject.id]: trashItem.tasks || [],
      }));
      setCheckedTasks((prev) => {
        const next = { ...prev };
        Object.entries(trashItem.checkedTasks || {}).forEach(([key, isChecked]) => {
          if (key.startsWith(`${deletedProjectId}-`)) {
            next[`${restoredProject.id}${key.slice(String(deletedProjectId).length)}`] = isChecked;
          }
        });
        return next;
      });
    }
    if (trashItem.type === "note") setNotes((prev) => [trashItem.item, ...prev]);
    setTrashItems((prev) => prev.filter((item) => item !== trashItem));
  };

  const permanentlyDeleteTrashItem = (trashItem) => {
    setTrashItems((prev) => prev.filter((item) => item !== trashItem));
  };

  const openAddProject = () => {
    setEditingProject(null);
    setShowModal(true);
  };

  const openEditProject = (project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  const content = {
    dashboard: (
      <Dashboard
        setPage={setPage}
        projects={projects}
        notes={notes}
        taskLists={taskLists}
        checkedTasks={checkedTasks}
        onEdit={openEditProject}
        onDelete={handleDeleteProject}
        onEditNote={openEditNote}
        onDeleteNote={handleDeleteNote}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    ),
    "note-edit": (
      <NoteEdit
        note={editingNote}
        onSave={saveEditedNote}
        onCancel={() => {
          setEditingNote(null);
          setPage("notes");
        }}
      />
    ),
    "note-detail": (
      <NoteDetail
        note={notes.find((note) => note.id === detailNoteId) || null}
        categoryOptions={[
          { id: "all", label: "Tất cả" },
          { id: "hoc-tap", label: "Học tập" },
          { id: "y-tuong", label: "Ý tưởng" },
          { id: "cong-viec", label: "Công việc" },
          { id: "sang-tao", label: "Sáng tạo" },
          { id: "Uoc-mo", label: "Ước mơ" },
          { id: "suc-khoe", label: "Sức khỏe" },
          { id: "giai-tri", label: "Giải trí" },
          { id: "khac", label: "Khác" },
        ]}
        onBack={() => setPage("notes")}
        onEdit={(note) => {
          setEditingNote(note);
          setPage("note-edit");
        }}
        onDelete={(noteId) => {
          handleDeleteNote(noteId).then((deleted) => {
            if (deleted) setPage("notes");
          });
        }}
      />
    ),
    projects: (
      <Projects
        projects={projects}
        notes={notes}
        selectedProjectId={selectedProjectId}
        taskLists={taskLists}
        checkedTasks={checkedTasks}
        onSelectProject={handleSelectProject}
        onAdd={openAddProject}
        onDelete={handleDeleteProject}
        onEdit={openEditProject}
        onAddNote={handleAddNote}
        onToggleTask={handleToggleTask}
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    ),
    notes: (
      <Notes
        notes={notes}
        onAddNote={handleAddNote}
        onUpdateNote={handleUpdateNote}
        onDeleteNote={handleDeleteNote}
        onOpenNoteDetail={openNoteDetail}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    ),
    "private-notes": (
      <PrivateNotes
        notes={notes}
        setPage={handlePageChange}
        onDeleteNote={handleDeleteNote}
        lockEnabled={privacyLockEnabled}
        privacyPassword={privacyPassword}
        initiallyUnlocked={privateNotesUnlocked}
      />
    ),
    trash: (
      <Trash
        items={trashItems}
        onRestore={restoreTrashItem}
        onPermanentDelete={permanentlyDeleteTrashItem}
      />
    ),
    settings: <Settings theme={theme} setTheme={setTheme} />,
    account: <Account account={account} onLogout={handleLogout} />,
    privacy: (
      <Privacy
        setPage={handlePageChange}
        lockEnabled={privacyLockEnabled}
        privacyPassword={privacyPassword}
        onUnlock={() => setPrivateNotesUnlocked(true)}
      />
    ),
    "privacy-password": (
      <PasswordLock
        enabled={privacyLockEnabled}
        currentPassword={privacyPassword}
        onSave={(enabled, password) => {
          setPrivacyLockEnabled(enabled);
          setPrivacyPassword(password);
          setPage("privacy");
        }}
        onCancel={() => setPage("privacy")}
      />
    ),
  };

  if (!isAuthenticated) {
    return (
      <Auth
        onAuthenticated={(user) => {
          localStorage.setItem("tasknote-user", JSON.stringify(user));
          setAccount(user);
          setIsAuthenticated(true);
        }}
      />
    );
  }

  return (
    <div className={`app theme-${theme} ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar
        page={page}
        setPage={handlePageChange}
        accountName={account.name}
        collapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
        onLogout={handleLogout}
      />
      {sidebarCollapsed && (
        <button
          type="button"
          className="sidebar-open-button"
          onClick={() => setSidebarCollapsed(false)}
          aria-label="Mở sidebar"
        >
          ☰
        </button>
      )}
      <main className="main">{content[page]}</main>
      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
            setEditingProject(null);
          }}
          onAddProject={handleAddProject}
          onUpdateProject={handleUpdateProject}
          editingProject={editingProject}
        />
      )}
    </div>
  );
}
