import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Import useNavigate để điều hướng
import '../styles/LoginPage.css';  // Import CSS riêng

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();  // Khởi tạo useNavigate

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', form);
      const { token, user } = response.data;

      // Lưu token và tên người dùng vào localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', user.username);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('role', user.role.name || user.role);

      // Chuyển hướng về trang chủ (HomePage)
      navigate('/');  // Điều hướng đến trang chủ

      //Làm mới trang
      window.location.reload();

    } catch (err) {
      console.error(err);
      alert('Lỗi đăng nhập');
    }
  };

  return (
    <Container className="login-form">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>Đăng nhập</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
            Đăng nhập
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
