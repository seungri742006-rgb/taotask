const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized - Missing or invalid token',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized - Invalid or expired token',
    });
  }
}

module.exports = authMiddleware;
