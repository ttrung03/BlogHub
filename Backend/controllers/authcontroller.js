// File: Backend/controllers/authcontroller.js
const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');

// Đăng ký
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email đã tồn tại' });

    const defaultRole = await Role.findOne({ where: { name: 'author' } });

    const newUser = await User.create({
      username,
      email,
      password,
        roleId: defaultRole.id
    });

    res.status(201).json({ message: 'Đăng ký thành công', user: { id: newUser.id, username: newUser.username } });
  } catch (err) {
    console.error("Đăng ký lỗi:", err);
    res.status(500).json({ error: 'Đăng ký thất bại' });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: { model: Role, as: 'role' }
    });

    if (!user || !await user.comparePassword(password)) {
      return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

  const token = jwt.sign({ id: user.id, role: user.role.name }, process.env.JWT_SECRET, { expiresIn: '1d' });


    res.json({
      token,
      user: { id: user.id, username: user.username, role: user.role.name }
    });
  } catch (err) {
    console.error("Login lỗi:", err);
    res.status(500).json({ error: 'Đăng nhập thất bại' });
  }
};
