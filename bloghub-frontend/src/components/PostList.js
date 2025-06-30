// src/components/PostList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Modal, TextField } from '@mui/material';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get('/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleEdit = (post) => {
    setSelectedPost(post);
    setTitle(post.title);
    setContent(post.content);
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    axios.delete(`/api/posts/${id}`)
      .then(res => {
        setPosts(posts.filter(post => post._id !== id));
      })
      .catch(err => console.log(err));
  };

  const handleSave = () => {
    axios.put(`/api/posts/${selectedPost._id}`, { title, content })
      .then(res => {
        setPosts(posts.map(post => post._id === selectedPost._id ? res.data : post));
        setOpenModal(false);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map(post => (
            <TableRow key={post._id}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.authorName}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(post)}>Edit</Button>
                <Button onClick={() => handleDelete(post._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal cho chỉnh sửa bài viết */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div>
          <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <TextField label="Content" value={content} onChange={e => setContent(e.target.value)} />
          <Button onClick={handleSave}>Save</Button>
        </div>
      </Modal>
    </div>
  );
};

export default PostList;
