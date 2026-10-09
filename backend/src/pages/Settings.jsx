import React from "react";
import Icon from "../components/Icon";

export default function Settings({ theme, setTheme }) {
  return (
    <>
      <section className="settings-list">
        <div className="settings-item appearance-setting">
          <span className="settings-item-icon"><Icon type="settings" /></span>
          <span className="settings-item-copy">
            <b>Giao diện</b>
            <small>Chọn chế độ sáng, tối hoặc tông màu lạnh</small>
          </span>
          <div className="theme-options">
            {[
              ["light", "Sáng"],
              ["dark", "Tối"],
              ["cool", "Lạnh"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`theme-option ${theme === value ? "active" : ""}`}
                onClick={() => setTheme(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
