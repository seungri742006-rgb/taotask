import React from "react";

export default function Account({ account, onLogout }) {
  const name = account?.name || "Dương";
  const email = account?.email || "Chưa có email";

  return (
    <>
      <section className="settings-card account-card">
        <div className="privacy-avatar">{name.charAt(0).toUpperCase()}</div>
        <div className="privacy-info">
          <h2>{name}</h2>
          <p>Tài khoản TaskNote</p>
          <dl className="account-details">
            <div className="account-detail">
              <dt>Họ và tên</dt>
              <dd>{name}</dd>
            </div>
            <div className="account-detail">
              <dt>Email đăng nhập</dt>
              <dd>{email}</dd>
            </div>
          </dl>
        </div>
      </section>

      
    </>
  );
}