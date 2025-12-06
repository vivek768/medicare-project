const mysql = require('mysql2');

module.exports.createDB = function () {
    let con = mysql.createConnection({
        host: 'localhost',
        user: 'qti',
        password: 'qti@123',
        port: 3306
    });
    con.connect(function (err) {
        if (err) {
            console.log("Error while connecting to mysql:", err);
            return;
        }
        con.query("CREATE DATABASE IF NOT EXISTS medicare", function (error, result) {
            if (error) {
                console.error('Error creating MySQL database:', error);
            } else {
                console.log("Database created");
            }
        });
        con.end(error => {
            if (error) {
                console.error('Error closing MySQL connection:', error);
            }
        })
    });
}

