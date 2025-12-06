//https://medium.com/dscjssstu/pooling-connections-in-node-js-mysql-9685d5c03c30
let mysql = require('mysql2');

let pool = mysql.createPool({
    connectionLimit: 4,
    host: "localhost",
    user: "qti",
    password: "qti@123",
    database: "medicare"
});

pool.getConnection((err, connection) => {
    if (err) {
        console.log("Error while connecting to mysql:", err);
        return;
    }

    connection.release();
});

module.exports = pool;