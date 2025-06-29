const Post = require('../models/Post');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Role = require('../models/Role');
// Tạo bài viết mới
exports.create = async (req, res) => {
  const { title, content } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Bạn cần đăng nhập để tạo bài viết.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'Tác giả không tồn tại.' });
    }

    const newPost = await Post.create({
      title,
      content,
      authorId: user.id,
      authorName: user.username
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Lỗi tạo bài viết:", error);
    res.status(500).json({ error: 'Có lỗi xảy ra khi tạo bài viết.' });
  }
};

// Cập nhật bài viết
exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(403).json({ message: 'Bạn cần đăng nhập.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    const post = await Post.findByPk(id);

    if (!post) return res.status(404).json({ message: 'Bài viết không tồn tại.' });

    if (post.authorId !== user.id && user.role !== 'admin') {
      return res.status(403).json({ message: 'Bạn không có quyền sửa bài viết này.' });
    }

    post.title = title;
    post.content = content;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.error("Lỗi cập nhật:", error);
    res.status(500).json({ error: 'Có lỗi xảy ra khi cập nhật bài viết.' });
  }
};

// Xóa bài viết (xóa mềm)
exports.remove = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(403).json({ message: 'Bạn cần đăng nhập.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id, {
      include: { model: Role, as: 'role' }
    });

    const post = await Post.findByPk(id);

    if (!post) return res.status(404).json({ message: 'Bài viết không tồn tại.' });

    if (post.authorId !== user.id && user.role.name !== 'admin') {
      return res.status(403).json({ message: 'Bạn không có quyền xóa bài viết này.' });
    }

    post.isDeleted = true;
    await post.save();

    res.status(200).json({ message: 'Bài viết đã được xóa (xóa mềm) thành công.' });
  } catch (err) {
    console.error('Lỗi khi xóa bài viết:', err);
    res.status(500).json({ error: 'Có lỗi xảy ra khi xóa bài viết.' });
  }
};

// Khôi phục bài viết (chỉ admin)
exports.restore = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(403).json({ message: 'Bạn cần đăng nhập.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Chỉ admin mới có quyền phục hồi bài viết.' });
    }

    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: 'Bài viết không tồn tại.' });

    post.isDeleted = false;
    await post.save();

    res.status(200).json({ message: 'Bài viết đã được phục hồi thành công.' });
  } catch (err) {
    res.status(500).json({ error: 'Có lỗi xảy ra khi phục hồi bài viết.' });
  }
};

// Lấy tất cả bài viết (chưa xóa)
exports.getAll = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { isDeleted: false },
      include: {
        model: User,
        as: 'author',
        attributes: ['username', 'email'],
        include: {
          model: Role,
          as: 'role',
          attributes: ['name']  // lấy tên role
        }
      },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error("Lỗi lấy danh sách bài viết:", err);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách bài viết' });
  }
};

// Lấy chi tiết bài viết
exports.getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findOne({
      where: { id, isDeleted: false },
      include: {
        model: User,
        as: 'author',
        attributes: ['username', 'email'],
        include: {
          model: Role,
          as: 'role',
          attributes: ['name']
        }
      }
    });

    if (!post) return res.status(404).json({ message: 'Bài viết không tồn tại' });

    res.status(200).json(post);
  } catch (err) {
    console.error("Lỗi lấy bài viết:", err);
    res.status(500).json({ message: 'Lỗi khi lấy bài viết' });
  }
};
