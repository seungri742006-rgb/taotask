const storageService = require('../services/storageService');
const { hashPassword, comparePassword } = require('../services/encryption');

function getSettings(req, res) {
  const userId = req.user.userId;
  const settings = storageService.getUserSettings(userId);

  return res.status(200).json({
    success: true,
    data: settings,
  });
}

function updateSettings(req, res) {
  const userId = req.user.userId;
  const { theme, primaryColor, language, notifications } = req.body;

  const currentSettings = storageService.getUserSettings(userId);

  const updatedSettings = {
    ...currentSettings,
    theme: theme !== undefined ? theme : currentSettings.theme,
    primaryColor: primaryColor !== undefined ? primaryColor : currentSettings.primaryColor,
    language: language !== undefined ? language : currentSettings.language,
    notifications: notifications !== undefined ? notifications : currentSettings.notifications,
    updatedAt: new Date().toISOString(),
  };

  storageService.saveUserSettings(userId, updatedSettings);

  return res.status(200).json({
    success: true,
    data: updatedSettings,
    message: 'Cập nhật cài đặt thành công',
  });
}

function updatePassword(req, res) {
  const userId = req.user.userId;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      error: 'Mật khẩu hiện tại và mật khẩu mới là bắt buộc',
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      error: 'Mật khẩu mới phải có ít nhất 6 ký tự',
    });
  }

  const profile = storageService.getUserProfile(userId);
  if (!profile || !comparePassword(currentPassword, profile.passwordHash)) {
    return res.status(400).json({
      success: false,
      error: 'Mật khẩu hiện tại không chính xác',
    });
  }

  profile.passwordHash = hashPassword(newPassword);
  profile.updatedAt = new Date().toISOString();
  storageService.saveUserProfile(userId, profile);

  return res.status(200).json({
    success: true,
    message: 'Đổi mật khẩu thành công',
  });
}

module.exports = {
  getSettings,
  updateSettings,
  updatePassword,
};
