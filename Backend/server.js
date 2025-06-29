const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./utils/db');  
const Role = require('./models/Role'); 
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Import routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

// Kết nối MongoDB và chạy server
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log(' Đã kết nối MongoDB');
//     app.listen(5000, () => console.log(' Server chạy tại cổng 5000'));
//   })
//   .catch((err) => console.error(' Lỗi kết nối MongoDB:', err));

  // Kết nối DB




// Kết nối Sequelize + tạo role mặc định
(async () => {
  try {
    await sequelize.sync();
    console.log('Kết nối MySQL thành công!');

    // Tạo các role nếu chưa có
    await Role.findOrCreate({ where: { name: 'author' } });
    await Role.findOrCreate({ where: { name: 'admin' } });
    await sequelize.sync({ alter: true });
    // Khởi động server
    app.listen(5000, () => console.log('Server chạy tại http://localhost:5000'));
  } catch (err) {
    console.error('Lỗi kết nối MySQL:', err);
  }
})();