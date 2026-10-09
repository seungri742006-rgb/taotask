import React, { useState } from "react";
import Icon from "../components/Icon";
import NoteCard from "../components/NoteCard";

export default function PrivateNotes({ notes = [], setPage, onDeleteNote, lockEnabled = false, privacyPassword = "", initiallyUnlocked = false }) {
  const [query, setQuery] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [unlocked, setUnlocked] = useState(initiallyUnlocked);
  const [error, setError] = useState("");

  const handleUnlock = (event) => {
    event.preventDefault();
    if (enteredPassword !== privacyPassword) {
      setError("Mật khẩu không đúng.");
      return;
    }

    setError("");
    setUnlocked(true);
  };

  if (!lockEnabled || !privacyPassword) {
    return (
      <div className="private-gate-page">
        <div className="private-gate-card">
          <div className="password-lock-icon">⌑</div>
          <h2>Thiết lập mật khẩu bảo vệ</h2>
          <p>Hãy tạo mật khẩu trong phần Cài đặt để bảo vệ các ghi chú riêng tư.</p>
          <button className="primary" type="button" onClick={() => setPage("privacy-password")}>
            Thiết lập mật khẩu
          </button>
        </div>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="private-gate-page">
        <form className="private-gate-card" onSubmit={handleUnlock}>
          <div className="password-lock-icon">⌑</div>
          <h2>Mở ghi chú riêng</h2>
          <p>Nhập mật khẩu để xem các ghi chú được bảo vệ.</p>
          <label className="private-gate-label">
            Mật khẩu
            <input
              type="password"
              value={enteredPassword}
              onChange={(event) => setEnteredPassword(event.target.value)}
              placeholder="Nhập mật khẩu bảo vệ"
              autoFocus
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button className="primary" type="submit">Mở ghi chú riêng</button>
        </form>
      </div>
    );
  }

  const privateNotes = notes.filter((note) => {
    if (!note.isPrivate) return false;
    const haystack = `${note.title} ${note.text}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  return (
    <>
      <div className="toolbar">
        <div className="search large">
          <Icon type="search" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm ghi chú riêng..."
          />
        </div>
        <button className="primary" type="button" onClick={() => setPage("notes")}>
          <Icon type="plus" /> Thêm Note riêng
        </button>
        <button className="secondary" type="button" onClick={() => setPage("privacy-password")}>
          Đổi mật khẩu
        </button>
      </div>

      {privateNotes.length > 0 ? (
        <section className="note-grid big">
          {privateNotes.map((note) => (
              <NoteCard key={note.id} note={note} onEdit={() => setPage("notes")} onDelete={onDeleteNote} />
          ))}
        </section>
      ) : (
        <div className="private-notes-empty private-page-empty">
          <div className="empty-icon">⌑</div>
          <h2>{query ? "Không tìm thấy ghi chú riêng" : "Chưa có ghi chú riêng"}</h2>
          <p>Bật “Khóa quyền riêng tư” khi thêm note để ghi chú xuất hiện ở đây.</p>
        </div>
      )}
    </>
  );
}
