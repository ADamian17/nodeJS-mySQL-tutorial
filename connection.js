const mysql = require('mysql');

// Conection info
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'user',
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) console.log(err);
  if (!err) console.log('connected ;)');
});

module.exports = connection;
