const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Rayhana123",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    askQuestions();
});


// findAllEmployees() {
//     return this.connection.query(
//       "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
//     );
//   }

function askQuestions() {
    inquirer.prompt({
        message: "what would you like to do?",
        type: "list",
        choices: [
          { name: "View all employees", value: "View_emp" },
          { name: "View all departments", value: "View_dept" },
          { name:  "Add employee", value: "Add_emp" },
          { name:  "Add department", value: "Add_dept" },
          { name:  "Add role", value: "Add_role" },
          { name:  "Update employee role", value: "Update_role" },
            "QUIT"
        ],
        name: "choice"
    }).then(answers => {
        console.log(answers.choice);
        switch (answers.choice) {
            case "View_emp":
               return viewEmployees();
            case "View_dept":
               return viewDepartments();
            case "Add_emp":
               return addEmployee();
            case "Add_dept":
               return addDepartment();
            case "Add_role":
               return addRole();
            case "Update_role":
               return updateEmployeeRole();
            default:
                connection.end();
                break;
        }
    })
}

function viewEmployees() {
   return connection.query("SELECT * FROM employee", function (err, data) {
        console.table(data);
        askQuestions();
    })
}

function viewDepartments() {
  return connection.query("SELECT * FROM department", function (err, data) {
        console.table(data);
        askQuestions();
    })
}

// "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"

function addEmployee() {
    inquirer.prompt([{
            type: "input",
            name: "firstName",
            message: "What is the employees first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employees last name?"
        },
        {
            type: "number",
            name: "roleId",
            message: "What is the employees role ID"
        },
        {
            type: "number",
            name: "managerId",
            message: "What is the employees manager's ID?"
        }
    ]).then(function(res) {
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], function(err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");
            askQuestions();
        })
    })
}

function addDepartment() {
    inquirer.prompt([{
        type: "input",
        name: "department",
        message: "What is the department that you want to add?"
    }, ]).then(function(res) {
        connection.query('INSERT INTO department (name) VALUES (?)', [res.department], function(err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");
            askQuestions();
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            message: "enter title:",
            type: "input",
            name: "title"
        }, {
            message: "enter salary:",
            type: "number",
            name: "salary"
        }, {
            message: "enter department ID:",
            type: "number",
            name: "department_id"
        }
    ]).then(function (response) {
        connection.query("INSERT INTO roles (title, salary, department_id) values (?, ?, ?)", [response.title, response.salary, response.department_id], function (err, data) {
            console.table(data);
        })
        askQuestions();
    })

}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            message: "which employee would you like to update? (use first name only for now)",
            type: "input",
            name: "name"
        }, {
            message: "enter the new role ID:",
            type: "number",
            name: "role_id"
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name], function (err, data) {
            console.table(data);
        })
        askQuestions();
    })

}