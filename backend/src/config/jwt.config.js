module.exports = {
  secret: process.env.JWT_SECRET || 'your_super_secret_jwt_key_12345',
  expiresIn: '7d',
};
