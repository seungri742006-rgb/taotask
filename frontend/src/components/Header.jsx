import React from "react";
import Icon from "./Icon";

const notifications = [
  { id: 1, title: "Hoàn thành đánh giá UI", time: "Hôm nay · 09:30" },
  { id: 2, title: "Chỉnh sửa note cho dự án React", time: "Hôm nay · 12:15" },
  { id: 3, title: "Review tiến độ website bán hàng", time: "Hôm qua · 17:40" },
];

export default function Header({ title, subtitle, searchQuery = "", onSearchChange }) {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="header-actions">
        <div className="search">
          <Icon type="search" />
          <input
            value={searchQuery}
            onChange={(event) => onSearchChange?.(event.target.value)}
            placeholder="Tìm kiếm..."
            aria-label="Tìm kiếm"
          />
        </div>

        <div className="notification-wrap">
          <button className={`bell ${open ? "active" : ""}`} onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Thông báo">
            ♢
          </button>

          {open && (
            <div className="notification-panel">
              <div className="notification-head">
                <strong>Thông báo</strong>
                <span>3 mới</span>
              </div>

              <div className="notification-list">
                {notifications.map((item) => (
                  <div key={item.id} className="notification-item">
                    <div className="notification-copy">
                      <strong>{item.title}</strong>
                      <small>{item.time}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

     
      </div>
    </header>
  );
}
