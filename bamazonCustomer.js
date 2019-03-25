const inquirer = require("inquirer");

const mysql = require("mysql");

const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon"
});

connection.connect(err => {
    if (err) throw err;
   
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM productions ", (err, res) => {
        if (err) throw err;
        //console.log(res);
        connection.end();
    });
}
