const inquirer = require("inquirer")
const mysql = require("mysql2")
require("console.table")
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: 'root',
        database: 'employerTracker_db'
    })

db.connect(function (err) {
    if (err) throw err;
    console.log(`Connected to the employee tracker database.`)
    displayOptions()
})


function displayOptions() {
    inquirer.prompt([
        {
            type: "list",
            choices: ["View Department", "Add Department", "Update Department", "View Employee", "Add Employee", "Update Employee", "Add Role", "View Role", "Update Role","Exit"
            ],
            name: "choices",
            message: "What would you like to do?"
        }
    ]).then(({ choices }) => {
        switch (choices) {
            case "View Department":
                viewDepartment();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Update Department":
                updateDepartment();
                break;

            case "View Role":
                viewRole();
                break;

            case "View Employee":
                viewEmployee();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Add Role":
                addRole();
                break;

            case "Update Employee":
                    updateEmployee();
                    break;
            default:
                db.end()
                process.exit(0)
        }
    })
}

function viewDepartment(){
    db.query("select * from department;", function(err,data){
        if(err) throw err;
        console.table(data)
        displayOptions()
    })
}

function viewEmployee(){
    db.query("select * from employees;", function(err,data){
        if(err) throw err;
        console.table(data)
        displayOptions()
    })
}
function viewRole(){
    db.query("select * from role;", function(err,data){
        if(err) throw err;
        console.table(data)
        displayOptions()
    })
}