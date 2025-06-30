// src/components/AddPost.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAdd = () => {
    const token = localStorage.getItem('token'); // Token đã lưu sau khi đăng nhập

    if (!token) {
      setError('Bạn cần đăng nhập để đăng bài.');
      return;
    }

    axios.post('http://localhost:5000/api/posts', { title, content }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      alert('Đăng bài viết thành công!');
      navigate('/');  // Quay về trang chủ sau khi đăng
    })
    .catch(err => {
      console.error('Lỗi:', err);
      setError('Có lỗi khi đăng bài.');
    });
  };

  return (
    <Box maxWidth="600px" mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom>Đăng bài viết</Typography>
      {error && <Typography color="error" mb={2}>{error}</Typography>}

      <TextField
        label="Tiêu đề"
        fullWidth
        value={title}
        onChange={e => setTitle(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Nội dung"
        fullWidth
        multiline
        rows={6}
        value={content}
        onChange={e => setContent(e.target.value)}
        margin="normal"
      />

      <Button variant="contained" color="primary" onClick={handleAdd}>
        Đăng bài
      </Button>
    </Box>
  );
};

export default AddPost;
