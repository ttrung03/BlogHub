// CreatePostPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      title,
      content
    };

    // Sending new post data to backend
    axios.post('http://localhost:5000/api/posts', newPost)
      .then(response => {
        console.log('Post created:', response.data);
      })
      .catch(error => console.error('Error creating post:', error));
  };

  return (
    <Container>
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <TextField 
          label="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          fullWidth 
          margin="normal" 
        />
        <TextField 
          label="Content" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          fullWidth 
          multiline 
          rows={4} 
          margin="normal" 
        />
        <Button type="submit" variant="contained" color="primary">Create Post</Button>
      </form>
    </Container>
  );
};

export default CreatePostPage;
