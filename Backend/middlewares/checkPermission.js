// File: Backend/middlewares/checkPermission.js
// Middleware để kiểm tra quyền truy cập của người dùng
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkPermission = (role) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(403).json({ message: 'Bạn cần đăng nhập để thực hiện hành động này.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id); // Dùng Sequelize

      if (!user) {
        return res.status(404).json({ message: 'Tác giả không tồn tại.' });
      }

      // Kiểm tra phân quyền
      if (role === 'admin' && user.role !== 'admin') {
        return res.status(403).json({ message: 'Bạn không có quyền thực hiện hành động này.' });
      }

      // Gán thông tin user vào req để dùng tiếp trong controller
      req.user = {
        id: user.id,
        role: user.role,
        username: user.username
      };

      next();
    } catch (err) {
      console.error("Lỗi xác minh token:", err.message);
      return res.status(401).json({ message: 'Token không hợp lệ.' });
    }
  };
};

module.exports = checkPermission;
