// File: Backend/middlewares/authmiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Chưa đăng nhập' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, {
      include: { model: Role, as: 'role' }
    });

    if (!user) return res.status(404).json({ message: 'Người dùng không tồn tại' });

    req.user = {
      id: user.id,
      role: user.role.name,
      username: user.username
    };

    next();
  } catch (err) {
    console.error("Lỗi token:", err.message);
    res.status(403).json({ message: 'Token không hợp lệ' });
  }
};

module.exports = verifyToken;
