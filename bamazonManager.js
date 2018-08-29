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
    connection.query('SELECT * FROM products', (err, res) => {
        if (err) throw err;
        console.log(columnify(res), '\n');
        showMenu();
    }); 
}

const viewLowInventory = () => {
    connection.query('SELECT * FROM products WHERE stock_quantity < 5', (err, res) => {
        if (err) throw err;
        console.log(columnify(res), '\n');
        showMenu();
    });
};

const addToInventory = () => {
    connection.query('SELECT * FROM products', (err, res) => {
        console.log(columnify(res));
        inquirer.prompt([
            {
                name: 'id',
                message: 'Enter the ID of the product you want to restock.\n',
                validate: name => !isNaN(name)
            },
            {
                name: 'quantity',
                message: '\nEnter the restocking quantity.\n',
                validate: name => !isNaN(name)
            }
        ]).then(answer => {
            const selectedItem = res.find(item => item.id === parseInt(answer.id));
            connection.query('UPDATE products SET ? WHERE ?', [
                {
                    stock_quantity: selectedItem.stock_quantity + parseInt(answer.quantity)
                },
                {
                    id: selectedItem.id
                }
            ],
            (err, res) => {
                if (err) throw err;
                console.log('\n', selectedItem.product_name, 'has successfully been restocked with', answer.quantity, 'units.\n');
                showMenu();
            });
        });

    })
};

const addNewProduct = () => {
    inquirer.prompt([
        {
            name: 'product_name',
            message: 'What is the name of the new product?\n'
        },
        {
            name: 'department_name',
            message: '\nWhat department does this product belong to?\n'
        },
        {
            name: 'price',
            message: '\nWhat is the price of this product?\n',
            validate: name => !isNaN(name)
        },
        {
            name: 'stock_quantity',
            message: '\nHow many units are in stock for this product\n?',
            validate: name => !isNaN(name)
        },
    ]).then(answer => {
        connection.query('INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)',
        [answer.product_name, answer.department_name, parseFloat(answer.price), parseInt(answer.stock_quantity)],
        (err, res) => {
            if (err) throw err;
            console.log('\n', answer.product_name, 'has been successfully added!\n');
            showMenu();
        });
    });
};

const quit = () => connection.end();

const showMenu = () => {
    inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: 'Welcome to Bamazon Manager! Please select your choice!',
            choices: [
                'View Inventory',
                'View Low Inventory',
                'Add to Inventory',
                'Add New Product',
                'Quit'
            ]
        }
    ]).then(answer => {
        switch(answer.action) {
            case 'View Inventory':
                viewInventory();
                break;
            case 'View Low Inventory':
                viewLowInventory();
                break;
            case 'Add to Inventory':
                addToInventory();
                break;
            case 'Add New Product':
                addNewProduct();
                break;
            case 'Quit':
                quit();
                break;
        }
    });
};

connection.connect(err => {
    if (err) throw err;
    showMenu();
});