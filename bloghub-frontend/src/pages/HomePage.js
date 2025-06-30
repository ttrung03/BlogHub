// HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';  // Đảm bảo import Link từ react-router-dom
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
const userId = localStorage.getItem('userId');
const userRole = localStorage.getItem('role');

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')  // Đảm bảo gọi đúng API
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);


  const handleDelete = (postId) => {
  const token = localStorage.getItem('token');
  if (!window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) return;

  axios.delete(`http://localhost:5000/api/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(() => {
    setPosts(posts.filter(p => p.id !== postId));
  })
  .catch(err => {
    console.error("Lỗi xóa bài:", err);
    alert("Bạn không có quyền xóa bài viết này.");
  });
};

  return (
    <div style={{ padding: '20px' }}>
      <h1>Blog Posts</h1>
      <Grid container spacing={4}>
        {posts.map(post => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
  <CardContent sx={{ flexGrow: 1 }}>
    <Typography gutterBottom variant="h5" component="div">{post.title}</Typography>
    <Typography variant="body2" color="text.secondary">
      {post.content.substring(0, 150)}...
    </Typography>
  </CardContent>

  <Box p={2}>
    <Button
      variant="contained"
      color="primary"
      fullWidth
      component={Link}
      to={`/post/${post.id}`}
    >
      XEM CHI TIẾT
    </Button>
  </Box>

  {(userId == post.authorId || userRole === 'admin') && (
    <Box display="flex" justifyContent="space-between" px={2} pb={2}>
      <IconButton
        color="primary"
        component={Link}
        to={`/edit-post/${post.id}`}
      >
        <EditIcon />
      </IconButton>

      <IconButton
        color="error"
        onClick={() => handleDelete(post.id)}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  )}
</Card>

          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
