/**
 * @file encryption.js
 * @description Dịch vụ mã hóa dữ liệu (Bcrypt cho mật khẩu user, AES-256-CBC cho ghi chú riêng tư).
 */

const crypto = require('crypto');
const bcrypt = require('bcrypt');

const ALGORITHM = 'aes-256-cbc';

/**
 * Mã hóa mật khẩu user bằng bcrypt
 * @param {string} password - Mật khẩu dạng plaintext
 * @returns {string} Mật khẩu đã được hash
 */
function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

/**
 * So sánh mật khẩu plaintext với mật khẩu đã hash
 * @param {string} password - Mật khẩu nhập vào
 * @param {string} hash - Mật khẩu đã hash trong DB
 * @returns {boolean} True nếu khớp, ngược lại false
 */
function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

/**
 * Tạo khóa mã hóa từ passphrase
 * @param {string} passphrase - Mật khẩu bảo mật
 * @returns {Buffer} Khóa 32 bytes
 */
function getKey(passphrase) {
  return crypto.scryptSync(passphrase, 'tasknote-salt', 32);
}

/**
 * Mã hóa văn bản sử dụng AES-256-CBC
 * @param {string} text - Văn bản cần mã hóa
 * @param {string} passphrase - Mật khẩu bảo mật
 * @returns {string} Chuỗi đã mã hóa (định dạng iv:encryptedText)
 */
function encryptText(text, passphrase) {
  try {
    const iv = crypto.randomBytes(16);
    const key = getKey(passphrase);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Mã hóa thất bại');
  }
}

/**
 * Giải mã văn bản sử dụng AES-256-CBC
 * @param {string} encryptedData - Chuỗi đã mã hóa (iv:encryptedText)
 * @param {string} passphrase - Mật khẩu bảo mật
 * @returns {string} Văn bản gốc sau khi giải mã
 */
function decryptText(encryptedData, passphrase) {
  try {
    const parts = encryptedData.split(':');
    if (parts.length !== 2) throw new Error('Dữ liệu mã hóa không hợp lệ');

    const iv = Buffer.from(parts[0], 'hex');
    const encryptedText = parts[1];
    const key = getKey(passphrase);

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Giải mã thất bại hoặc mật khẩu không chính xác');
  }
}

module.exports = {
  hashPassword,
  comparePassword,
  encryptText,
  decryptText,
};

