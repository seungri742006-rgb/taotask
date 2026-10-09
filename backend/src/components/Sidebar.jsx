import React from "react";
import Icon from "./Icon";
import notebookLogo from "../assets/notebook-logo.svg";
const NAV_ITEMS = [
  ["home", "Tổng quan", "dashboard"],
  ["project", "Project", "projects"],
  ["note", "Note", "notes"],
 ["users", "Quyền riêng tư", "privacy"],
  ["trash", "Thùng rác", "trash"],
];

export default function Sidebar({ page, setPage, accountName = "Dương", collapsed = false, onToggleSidebar, onLogout }) {
  return (
    <aside className={`sidebar ${collapsed ? "is-collapsed" : ""}`}>
      <div className="sidebar-top-row">
        <div className="brand" onClick={onToggleSidebar} role="button" tabIndex={0} onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onToggleSidebar?.();
          }
        }}>
          <div className="brand-mark">
            <img src={notebookLogo} alt="NoteBook Creative logo" />
          </div>
          {!collapsed && (
            <div>
              <div className="brand-name">TaskNote</div>
              <div className="brand-sub">Quản lý công việc</div>
            </div>
          )}
        </div>
        <button
          type="button"
          className="sidebar-toggle"
          onClick={onToggleSidebar}
          aria-label={collapsed ? "Mở sidebar" : "Thu gọn sidebar"}
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      <nav>
        {NAV_ITEMS.map(([icon, label, key]) => (
          <button
            key={key}
            className={`nav-item ${page === key ? "active" : ""}`}
            onClick={() => setPage(key)}
          >
            <Icon type={icon} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button className={`nav-item ${page === "settings" ? "active" : ""}`} onClick={() => setPage("settings")}>
          <Icon type="settings" />
          <span>Cài đặt</span>
        </button>
        <button
          className={`profile-mini profile-button ${page === "account" ? "active" : ""}`}
          type="button"
          onClick={() => setPage("account")}
          aria-label="Mở thông tin tài khoản"
        >
          <div className="avatar">{accountName.charAt(0).toUpperCase()}</div>
          <div>
            <b>{accountName}</b>
            <small>Tài khoản</small>
          </div>
        </button>
        <button className="nav-item logout-item" type="button" onClick={onLogout}>
          <Icon type="close" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}
