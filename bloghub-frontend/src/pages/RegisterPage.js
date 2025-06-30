import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import '../styles/RegisterPage.css';  // Cập nhật đường dẫn đến RegisterPage.css trong thư mục styles

const RegisterPage = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert('Đăng ký thành công');
    } catch (err) {
      console.error(err);
      alert('Lỗi đăng ký');
    }
  };

  return (
    <Container className="register-form">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>Đăng ký</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField 
            label="Tên người dùng" 
            name="username" 
            variant="outlined" 
            fullWidth 
            margin="normal" 
            onChange={handleChange} 
            required 
          />
          <TextField 
            label="Email" 
            name="email" 
            variant="outlined" 
            fullWidth 
            margin="normal" 
            onChange={handleChange} 
            required 
          />
          <TextField 
            label="Mật khẩu" 
            name="password" 
            variant="outlined" 
            type="password" 
            fullWidth 
            margin="normal" 
            onChange={handleChange} 
            required 
          />
          <Button variant="contained" color="primary" fullWidth type="submit" className="submit-btn">
            Đăng ký
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
