import React, { useState } from "react";
import Header from "../components/Header";

export default function Privacy({ setPage, lockEnabled = false, privacyPassword = "", onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!lockEnabled || !privacyPassword) {
      setError("Bạn cần thiết lập mật khẩu riêng tư trước.");
      return;
    }

    if (password !== privacyPassword) {
      setError("Mật khẩu không đúng.");
      return;
    }

    setError("");
    onUnlock();
    setPage("private-notes");
  };

  return (
    <>
      <Header title="Quyền riêng tư" />
      <div className="private-gate-page">
        <form className="private-gate-card" onSubmit={handleSubmit}>
          <div className="password-lock-icon">⌑</div>
          <h2>Mở ghi chú riêng</h2>
          <label className="private-gate-label">
            Mật khẩu riêng tư
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Nhập mật khẩu riêng tư"
              autoComplete="current-password"
              autoFocus
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button className="primary" type="submit">Mở ghi chú riêng</button>
          {!lockEnabled && (
            <button className="secondary" type="button" onClick={() => setPage("privacy-password")}>
              Thiết lập mật khẩu
            </button>
          )}
        </form>
      </div>
    </>
  );
}
