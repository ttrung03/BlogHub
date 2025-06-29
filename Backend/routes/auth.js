const router = require('express').Router();
const AuthController = require('../controllers/authcontroller');

// Định nghĩa các route cho đăng ký và đăng nhập
// Sử dụng AuthController để xử lý logic đăng ký và đăng nhập
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
