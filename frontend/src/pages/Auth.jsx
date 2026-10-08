import React, { useState } from "react";
import notebookLogo from "../assets/notebook-logo.svg";
import authService from "../services/authService";

export default function Auth({ onAuthenticated }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const isRegister = mode === "register";
  const isForgot = mode === "forgot";
  const isReset = mode === "reset";

  async function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim() || !password.trim() || (isRegister && !name.trim())) {
      setMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      if (isRegister) {
        const res = await authService.register(email.trim(), password.trim(), name.trim());
        if (res.token) {
          localStorage.setItem("token", res.token);
        }
        const user = {
          name: res.user?.name || name.trim(),
          email: res.user?.email || email.trim(),
        };
        localStorage.setItem("tasknote-user", JSON.stringify(user));
        onAuthenticated(user);
      } else {
        const res = await authService.login(email.trim(), password.trim());
        if (res.token) {
          localStorage.setItem("token", res.token);
        }
        const user = {
          name: res.user?.name || email.trim().split("@")[0],
          email: res.user?.email || email.trim(),
        };
        localStorage.setItem("tasknote-user", JSON.stringify(user));
        onAuthenticated(user);
      }
    } catch (error) {
      setMessage(error.message || "Đã xảy ra lỗi, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  function handleForgotPasswordRequest(event) {
    event.preventDefault();
    const normalizedEmail = forgotEmail.trim();

    if (!normalizedEmail) {
      setMessage("Vui lòng nhập email để nhận mã xác nhận.");
      return;
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    localStorage.setItem("tasknote-reset-email", normalizedEmail.toLowerCase());
    localStorage.setItem("tasknote-reset-code", code);
    setEmail(normalizedEmail);
    setForgotEmail(normalizedEmail);
    setMode("reset");
    setMessage(`Mã xác nhận đã được gửi tới ${normalizedEmail}. Mã của bạn là: ${code}`);
    setResetCode("");
    setNewPassword("");
  }

  function handleResetPassword(event) {
    event.preventDefault();
    const normalizedEmail = (email || forgotEmail).trim();

    if (!normalizedEmail) {
      setMessage("Vui lòng nhập email của bạn.");
      return;
    }

    if (!resetCode.trim() || !newPassword.trim()) {
      setMessage("Vui lòng điền mã xác nhận và mật khẩu mới.");
      return;
    }

    const storedEmail = localStorage.getItem("tasknote-reset-email") || "";
    const storedCode = localStorage.getItem("tasknote-reset-code") || "";

    if (storedEmail.toLowerCase() !== normalizedEmail.toLowerCase() || storedCode !== resetCode.trim()) {
      setMessage("Mã xác nhận hoặc email không đúng. Vui lòng kiểm tra lại.");
      return;
    }

    setPassword(newPassword.trim());
    setMode("login");
    setMessage("Mật khẩu đã được đặt lại thành công. Bạn có thể đăng nhập ngay.");
    localStorage.removeItem("tasknote-reset-email");
    localStorage.removeItem("tasknote-reset-code");
    const user = {
      name: normalizedEmail.split("@")[0],
      email: normalizedEmail,
    };
    localStorage.setItem("tasknote-user", JSON.stringify(user));
    onAuthenticated(user);
  }

  function switchMode(nextMode) {
    setMode(nextMode);
    setMessage("");
    setResetCode("");
    setNewPassword("");
  }

  const showAuthForm = !isForgot && !isReset;

  return (
    <main className="auth-page">
      <section className="auth-card" aria-label={isRegister ? "Đăng ký" : isForgot ? "Quên mật khẩu" : isReset ? "Đặt lại mật khẩu" : "Đăng nhập"}>
        <div className="auth-brand text-center">
          <img src={notebookLogo} alt="NoteBook Creative" />
          <div>
            <strong className="auth-title-purple">TaskNote</strong>
            <span>Ghi chú thông minh mỗi ngày</span>
          </div>
        </div>

        <div className="auth-copy text-center">
          <h1 className="auth-title-purple">
            {isRegister ? "Tạo tài khoản mới" : isForgot ? "Quên mật khẩu" : isReset ? "Đặt lại mật khẩu" : "Chào mừng trở lại"}
          </h1>
          <p>
            {isRegister
              ? "Bắt đầu sắp xếp công việc của bạn."
              : isForgot
                ? "Nhập email để nhận mã xác nhận reset mật khẩu."
                : isReset
                  ? "Nhập mã xác nhận và mật khẩu mới để tiếp tục."
                  : "Đăng nhập để tiếp tục với những ghi chú của bạn."}
          </p>
        </div>

        {!isForgot && !isReset && (
          <div className="auth-tabs" role="tablist" aria-label="Loại tài khoản">
            <button className={!isRegister ? "active" : ""} onClick={() => switchMode("login")} role="tab" aria-selected={!isRegister} type="button">
              Đăng nhập
            </button>
            <button className={isRegister ? "active" : ""} onClick={() => switchMode("register")} role="tab" aria-selected={isRegister} type="button">
              Đăng ký
            </button>
          </div>
        )}

        {showAuthForm ? (
          <form className="auth-form" onSubmit={handleSubmit}>
            {isRegister && (
              <label>
                Họ và tên
                <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nguyễn Văn A" autoComplete="name" />
              </label>
            )}
            <label>
              Email
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="ten@email.com" autoComplete="email" />
            </label>
            <label>
              Mật khẩu
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Nhập mật khẩu" autoComplete={isRegister ? "new-password" : "current-password"} />
            </label>
            {message && <p className="auth-message">{message}</p>}
            {!isRegister && (
              <button className="auth-link" type="button" onClick={() => switchMode("forgot")}>
                Quên mật khẩu?
              </button>
            )}
            <button className="auth-submit" type="submit">{isRegister ? "Tạo tài khoản" : "Đăng nhập"}</button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={isForgot ? handleForgotPasswordRequest : handleResetPassword}>
            <label>
              Email
              <input
                type="email"
                value={isReset ? email : forgotEmail}
                onChange={(event) => (isReset ? setEmail(event.target.value) : setForgotEmail(event.target.value))}
                placeholder="ten@email.com"
                autoComplete="email"
              />
            </label>

            {isReset && (
              <>
                <label>
                  Mã xác nhận
                  <input
                    value={resetCode}
                    onChange={(event) => setResetCode(event.target.value)}
                    placeholder="Nhập mã 6 chữ số"
                    autoComplete="one-time-code"
                  />
                </label>
                <label>
                  Mật khẩu mới
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    placeholder="Nhập mật khẩu mới"
                    autoComplete="new-password"
                  />
                </label>
              </>
            )}

            {message && <p className="auth-message">{message}</p>}

            <button className="auth-submit" type="submit">
              {isForgot ? "Gửi mã xác nhận" : "Đặt lại mật khẩu"}
            </button>

            <button className="auth-secondary" type="button" onClick={() => switchMode("login")}>
              Quay lại đăng nhập
            </button>
          </form>
        )}

        {!isForgot && !isReset && (
          <p className="auth-switch">
            {isRegister ? "Đã có tài khoản?" : "Chưa có tài khoản?"} {" "}
            <button type="button" onClick={() => switchMode(isRegister ? "login" : "register")}>
              {isRegister ? "Đăng nhập" : "Đăng ký ngay"}
            </button>
          </p>
        )}
      </section>
    </main>
  );
}
