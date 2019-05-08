const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user:"root",
    password: "password",
    database: "bamazon"
})
connection.connect(function(err){
    console.log("Connected as id: " +connection.threadId);
})