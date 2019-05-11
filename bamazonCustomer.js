const mysql = require("mysql");
const inquirer = require("inquirer");
const { printTable } = require('console-table-printer');
// connect to mySql
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
})
// check for errors and execute functions
connection.connect(function (err) {
    if (err) throw err;
    displayTable();
})
// request data to display
function displayTable() {
    connection.query("SELECT * FROM bamazon.products", function (err, res) {
        printTable(res);
        selectId();
    })

}
// ask clients for purchase id and quantity
function selectId() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Enter the ID of the product you would like to purchase?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase?"
        }
    ])
        // grab the answers(value)
        .then(answers => {
            quantityValue = answers.quantity;
            idValue = answers.id;
            console.log(idValue);
            console.log(quantityValue);
        });
    }
    // 
    var quantityValue;
    var idValue;
