const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydatabase'
  });

  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      if (results.length > 0) {
        res.send('Login successful');
      } else {
        res.send('Invalid credentials');
      }
    }
  });

  connection.end();
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

