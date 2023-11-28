var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "feedbackdata"
});

con.connect(function (err) {
    if (err) {
        console.log("error in connection");
        throw err;
    }
    console.log("Connected!");
});

module.exports = con;