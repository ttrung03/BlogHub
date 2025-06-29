const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postcontroller');
const verify = require('../middlewares/authmiddleware');
const checkPermission = require('../middlewares/checkPermission');

// Tạo bài viết mới
router.post('/', verify, PostController.create);

// Lấy tất cả bài viết
router.get('/', PostController.getAll);

// Lấy chi tiết bài viết
router.get('/:id', PostController.getOne);

// Cập nhật bài viết
router.put('/:id', verify, PostController.update);

// Xóa bài viết
router.delete('/:id', verify, PostController.remove);

// Khôi phục bài viết (chỉ admin có quyền phục hồi)
router.put('/restore/:id', checkPermission('admin'), PostController.restore);

module.exports = router;