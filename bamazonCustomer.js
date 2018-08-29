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

const startCustomerFlow = () => {

    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        
        console.log(columnify(res));

        inquirer.prompt([
            {
                name: 'id',
                message: 'Welcome to Bamazon! Enter the ID of the item you would like to buy.',
                validate: name => !isNaN(name) 
            },
            {
                name: 'quantity',
                message: 'Enter the quantity you would like to buy.',
                validate: name => !isNaN(name) 
            }
        ]).then(answer => {
            const selectedItem = res.find(item => item.id === parseInt(answer.id));

            if (selectedItem.stock_quantity - parseInt(answer.quantity) >= 0) {
                connection.query("UPDATE products SET ? WHERE ? ",
                    [
                        {
                            stock_quantity: selectedItem.stock_quantity - parseInt(answer.quantity)
                        },
                        {
                            id: answer.id
                        }
                    ],
                    (err, res) => {
                        if (err) throw err;
                        console.log(`\nThank you for your purchase! Your total is \$${selectedItem.price * answer.quantity} \n`);
                        startCustomerFlow();
                    });
            } else {
                console.log('\nThe seller doesn\'t have that quantity.\n');
                startCustomerFlow();
            }
        });
    });
};

connection.connect((err, res) => {
    if (err) throw err;
    startCustomerFlow();
});
