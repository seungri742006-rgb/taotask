import React, { useState } from "react";
import Header from "../components/Header";
import Icon from "../components/Icon";

export default function PasswordLock({ enabled = false, currentPassword = "", onSave, onCancel }) {
  const [enteredCurrentPassword, setEnteredCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [lockEnabled, setLockEnabled] = useState(enabled);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (enabled && enteredCurrentPassword !== currentPassword) {
      setError("Mật khẩu hiện tại không đúng.");
      return;
    }

    if (lockEnabled && password.length < 6) {
      setError("Mật khẩu cần có ít nhất 6 ký tự.");
      return;
    }

    if (lockEnabled && password !== confirmation) {
      setError("Mật khẩu xác nhận không trùng khớp.");
      return;
    }

    onSave(lockEnabled, lockEnabled ? password : "");
  };

  return (
    <div className="password-lock-page">
      <Header title="Mật khẩu khóa quyền" subtitle="Bảo vệ các thiết lập riêng tư của bạn" />

      <form className="password-lock-card" onSubmit={handleSubmit}>
        <button className="back-button" type="button" onClick={onCancel}>
          <Icon type="arrow-left" /> Quay lại quyền riêng tư
        </button>

        <div className="password-lock-heading">
          <div className="password-lock-icon">⌑</div>
          <div>
            <h2>Khóa quyền riêng tư</h2>
            <p>Yêu cầu mật khẩu trước khi thay đổi các thiết lập bảo mật.</p>
          </div>
        </div>

        <label className="password-switch-row">
          <span>
            <b>Bật khóa bằng mật khẩu</b>
            <small>{lockEnabled ? "Đang bật" : "Đang tắt"}</small>
          </span>
          <input
            type="checkbox"
            checked={lockEnabled}
            onChange={(event) => setLockEnabled(event.target.checked)}
          />
        </label>

        {enabled && (
          <label className="password-current-field">
            Mật khẩu hiện tại
            <input
              type="password"
              value={enteredCurrentPassword}
              onChange={(event) => setEnteredCurrentPassword(event.target.value)}
              placeholder="Nhập mật khẩu hiện tại"
              autoComplete="current-password"
            />
          </label>
        )}

        {lockEnabled && (
          <div className="password-fields">
            <label>
              Mật khẩu khóa
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Nhập ít nhất 6 ký tự"
                autoComplete="new-password"
              />
            </label>
            <label>
              Xác nhận mật khẩu
              <input
                type="password"
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                placeholder="Nhập lại mật khẩu"
                autoComplete="new-password"
              />
            </label>
          </div>
        )}

        {error && <p className="form-error">{error}</p>}

        <div className="note-edit-actions">
          <button className="secondary" type="button" onClick={onCancel}>
            Hủy
          </button>
          <button className="primary" type="submit">
            Lưu thiết lập
          </button>
        </div>
      </form>
    </div>
  );
}
