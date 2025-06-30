import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ProfilePage = () => {
  const username = localStorage.getItem('username');

  return (
    <Container>
      <Box sx={{ marginTop: 5 }}>
        <Typography variant="h4" gutterBottom>Trang cá nhân</Typography>
        <Typography variant="h6">Tên người dùng: {username}</Typography>
        {/* Hiển thị thêm thông tin cá nhân nếu cần */}
      </Box>
    </Container>
  );
};

export default ProfilePage;
