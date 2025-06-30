import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import '../styles/Navbar.css';  // Import CSS cho Navbar


const Navbar = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Lấy tên người dùng từ localStorage khi người dùng đăng nhập
    const user = localStorage.getItem('username');
    if (user) {
      setUsername(user);
    }
  }, []);

  const handleLogout = () => {
    // Xóa thông tin người dùng và token khi logout
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername(null);
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <Typography variant="h6" className="logo">
          BlogHub
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">Trang chủ</Button>
          {!username ? (
            <>
              <Button color="inherit" component={Link} to="/login">Đăng nhập</Button>
              <Button color="inherit" component={Link} to="/register">Đăng ký</Button>
             
            </>
          ) : (
            <>
             <Button color="inherit" component={Link} to="/add-post"> Đăng bài</Button>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                Xin chào, {username}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Đăng xuất
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
