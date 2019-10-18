const mysql = require('mysql');
const config = require('./config');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'workout_tracker'
});
const connect = function connect() {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  });
}

module.exports = {
  connection,
  connect
}
