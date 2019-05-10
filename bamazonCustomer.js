const mysql = require("mysql");
const inquirer = require("inquirer");
const {printTable} = require('console-table-printer');

const connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user:"root",
    password: "password",
    database: "bamazon"
})
connection.connect(function(err){
    if (err) throw err;
    displayTable();
})

function displayTable(){
    connection.query("SELECT * FROM bamazon.products", function (err, res){
    printTable(res);    
    })
    
}
