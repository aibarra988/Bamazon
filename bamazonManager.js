const columnify = require('columnify');
const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

const viewInventory = () => {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        console.log(columnify(res), '\n');
        showMenu();
    }); 
}

const showMenu = () => {
    inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: "Welcome to Bamazon Manager! Please enter a choice number!",
            choices: [
                "View Inventory",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Quit"
            ]
        }
    ]).then(answer => {
        switch(answer.action) {
            case "View Inventory":
                viewInventory();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addToInventory();
                break;
            case "Add New Product":
                addNewProduct();
                break;
            case "Quit":
                quit();
                break;
        }
    });
};

connection.connect((err) => {
    if (err) throw err;
    showMenu();
});