const express = require('express');
const app = express();
const port = 3001; // hoặc bất kỳ cổng nào bạn muốn
const bodyParser = require('body-parser'); // Import body-parser middleware

app.use(bodyParser.json()); // Sử dụng body-parser để phân tích JSON
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Thay 'username' bằng tên người dùng MySQL của bạn
    password: '', // Thay 'password' bằng mật khẩu của bạn
    database: 'e-commerce' // Thay 'database_name' bằng tên cơ sở dữ liệu của bạn
  });
app.get('/', (req, res) => {
    res.send('Hello from Express server!');
});
connection.connect((err) => {
    if (err) {
      console.error('Lỗi kết nối: ' + err.stack);
      return;
    }
    console.log('Kết nối thành công với ID ' + connection.threadId);
  });
  // Lấy dữ liệu từ cơ sở dữ liệu
connection.query('SELECT * FROM category', (error, results, fields) => {
    if (error) throw error;
   // console.log('Dữ liệu từ cơ sở dữ liệu: ', results);
  });
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

  
  // Đóng kết nối sau khi sử dụng
  //connection.end();
  app.get('/api/categories', (req, res) => {
    connection.query('SELECT * FROM category', (error, results, fields) => {
      if (error) throw error;
      res.json(results); // Trả về kết quả của truy vấn dưới dạng JSON
    });
});
  app.get('/api/brand', (req, res) => {
    connection.query('SELECT * FROM brand', (error, results, fields) => {
      if (error) throw error;
      res.json(results);

    });
});
app.post('/api/brand', (req, res) => {
    const { brand_name, brand_desc, brand_status } = req.body;

    // Thực hiện chèn brand mới vào bảng brand
    connection.query('INSERT INTO brand (brand_name, brand_desc, brand_status) VALUES (?, ?, ?)', [brand_name, brand_desc, brand_status], (error, results, fields) => {
        if (error) {
            console.error('Error inserting brand:', error);
            res.status(500).send('Failed to insert brand');
            return;
        }
        
        res.status(201).send('Brand inserted successfully');
    });
});
