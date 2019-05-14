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
        console.log("= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =");
        printTable(res);
        console.log("= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =");
        selectId();
    })

};
// ask clients for purchase id and quantity
function selectId() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Enter the ID of the product you would like to purchase?",
            filter: Number
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase?",
            filter: Number
        }
    ])
        // grab the answers(value)
        .then(answers => {
            var idValue = answers.id;
            var quantityValue = answers.quantity;
            purchaseOrder(idValue, quantityValue)
        });
};
// updating product quantity 
function purchaseOrder(ID, QUANTITY){
	connection.query('Select * FROM bamazon.products WHERE item_id = ' + ID, function(err,res){
        if(err) console.log(err);
		if(QUANTITY <= res[0].stock_quantity){
            var totalCost = res[0].price * QUANTITY;
            console.log("= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =");
            console.log("Your total cost for " + QUANTITY + " " +res[0].product_name + " is $" + totalCost + " Thank you!");
			connection.query("UPDATE products SET stock_quantity = stock_quantity -  "+ QUANTITY +" WHERE item_id =" + ID + ";");
		} else{
			console.log("Insufficient quantity");
		};
		displayTable();
	});
};