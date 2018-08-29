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

const salesByDepartments = () => {
    connection.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;
        console.log('\n', columnify(res), '\n');
        startSupervisorFlow();
    });
};

const createDepartment = () => {
    inquirer.prompt([
        {
            name: 'department',
            message: 'Enter the new Department name\n',
            validate: department => department !== ''
        },
        {
            name: 'overhead_costs',
            message: '\nEnter the Overhead Costs for this Department\n',
            validate: ohCosts => !isNaN(ohCosts)
        }
    ]).then(answer => {
        connection.query('INSERT INTO departments (department_name, overhead_costs) VALUES (?, ?)',
        [answer.department, parseInt(answer.overhead_costs)], (err, res) => {
            if (err) throw err;
            console.log('\nDepartment successfully added!\n');
            startSupervisorFlow();
        });
    });
};

const quit = () => connection.end();

const startSupervisorFlow = () => {
    inquirer.prompt([
        {
            name: 'action',
            message: 'Welcome to Bamazon Supervisor! Please select an action.',
            type: 'list',
            choices: [
                'View Product Sales by Department',
                'Create New Department',
                'Quit'
            ]
        }
    ]).then(answers => {
        switch(answers.action) {
            case 'View Product Sales by Department':
                salesByDepartments();
                break;
            case 'Create New Department':
                createDepartment();
                break;
            case 'Quit':
                quit();
        }
    });
};

connection.connect((err) => {
    if (err) throw err;
    startSupervisorFlow();
});