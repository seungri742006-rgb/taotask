/**
 * @file authController.js
 * @description Controller xử lý các nghiệp vụ xác thực người dùng (Đăng ký, Đăng nhập, Đăng xuất).
 */

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');
const storageService = require('../services/storageService');
const { hashPassword, comparePassword } = require('../services/encryption');

/**
 * Đăng ký tài khoản mới
 * @param {import('express').Request} req - Request object chứa email, password, name
 * @param {import('express').Response} res - Response object
 */
function register(req, res) {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email và mật khẩu là bắt buộc',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      error: 'Mật khẩu phải có ít nhất 6 ký tự',
    });
  }

  const users = storageService.getAllUsers();
  const existingUser = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());

  if (existingUser) {
    return res.status(400).json({
      success: false,
      error: 'Email đã tồn tại trên hệ thống',
    });
  }

  const userId = `user_${Date.now()}`;
  const hashedPassword = hashPassword(password);
  const userName = name || email.split('@')[0];

  const profile = {
    id: userId,
    email: email.trim().toLowerCase(),
    name: userName,
    passwordHash: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  storageService.saveUserProfile(userId, profile);

  // Thiết lập cài đặt mặc định cho user mới
  storageService.saveUserSettings(userId, {
    theme: 'light',
    primaryColor: '#3B82F6',
    language: 'vi',
    notifications: true,
  });

  const token = jwt.sign({ userId, email: profile.email, name: profile.name }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });

  return res.status(201).json({
    success: true,
    userId,
    email: profile.email,
    token,
    user: {
      id: userId,
      email: profile.email,
      name: profile.name,
      theme: 'light',
      primaryColor: '#3B82F6',
    },
    message: 'Đăng ký tài khoản thành công',
  });
}

/**
 * Đăng nhập hệ thống
 * @param {import('express').Request} req - Request object chứa email, password
 * @param {import('express').Response} res - Response object
 */
function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email và mật khẩu không được để trống',
    });
  }

  const users = storageService.getAllUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());

  if (!user || !comparePassword(password, user.passwordHash)) {
    return res.status(401).json({
      success: false,
      error: 'Email hoặc mật khẩu không chính xác',
    });
  }

  const userSettings = storageService.getUserSettings(user.id);

  const token = jwt.sign({ userId: user.id, email: user.email, name: user.name }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });

  return res.status(200).json({
    success: true,
    userId: user.id,
    email: user.email,
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      theme: userSettings.theme || 'light',
      primaryColor: userSettings.primaryColor || '#3B82F6',
    },
  });
}

/**
 * Đăng xuất tài khoản
 * @param {import('express').Request} req - Request object
 * @param {import('express').Response} res - Response object
 */
function logout(req, res) {
  return res.status(200).json({
    success: true,
    message: 'Đăng xuất thành công',
  });
}

module.exports = {
  register,
  login,
  logout,
};

