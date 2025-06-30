import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Button, Divider, Box } from '@mui/material';

const PostDetailPage = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/posts/${id}`)
        .then(res => setPost(res.data))
        .catch(err => console.error('Error fetching post:', err));
    }
  }, [id]);

  if (!post) return <Typography variant="h6">Đang tải bài viết...</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{post.title}</Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {new Date(post.createdAt).toLocaleString()} - Tác giả: {post.authorName || 'Không rõ'}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body1" paragraph>{post.content}</Typography>
      <Box textAlign="right" mt={3}>
        <Button variant="outlined" component={Link} to="/">
          ← Quay lại danh sách
        </Button>
      </Box>
    </Container>
  );
};

export default PostDetailPage;
