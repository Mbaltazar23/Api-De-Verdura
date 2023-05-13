const mysql = require('mysql');

const db = mysql.createConnection({host: 'localhost', user: 'root', password: '', database: 'dbverdura'});

db.connect(function (err) {
    if (err) 
        throw err;
    console.log("Database connected !!");
})


module.exports = db;


/*
Credenciales Locales

host: 'localhost',
user: 'root',
password: '',
database: 'dbverdura'

Credenciales en Hosting

host: 'localhost',
user:'barriosi_user_dbverdura',
password: 'dbverdura',
database: 'barriosi_dbverdura'

*/
