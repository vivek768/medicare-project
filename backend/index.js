//configure express, hostname and port for the server
const express = require('express');
const app = express();
const port = 8000;
const hostname = '127.0.0.1';


const mysql = require('./config/mysql');
mysql.createDB();
const tableConfig = require('./config/tables');
tableConfig.createTables();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const cors = require('cors');
app.use(cors());
app.use('/', require('./routes'));

// start the server
var server = app.listen(port, hostname, (err)=>{
    if(err) {
        console.log("error!", err);
    } else {
        let host = server.address().address;
        let port = server.address().port;
        console.log('express server running at http://' + host + ':' + port);
    }
})