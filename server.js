const db = require('./db/connection');
const inquirer = require('inquirer');
require('console.table');

const roleArray = ['CS Representative', 'CS Team Lead', 'Accountant', 'Lead Accountant', 'Salesperson', 'Sales Lead', 'Software Engineer', 'Engineer Team Lead'];
const managerArray = ['Bob', 'George', 'Frank', 'Sammie'];
const departmentArray = ['Customer Service', 'Accounting', 'Sales', 'Engineering'];

const questions = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'main',
            message: 'What do you want to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        }
    ]).then((answer) => {
        console.log(answer);
        if (answer.main === 'view all departments') {
            viewDepartments();
        } else if (answer.main === 'view all roles') {
            viewRoles();
        } else if (answer.main === 'view all employees') {
            viewEmployees();
        } else if (answer.main === 'add a department') {
            addDepartment();
        } else if (answer.main === 'add a role') {
            addRole();
        } else if (answer.main === 'add an employee') {
            addEmployee();
        } else {
            updateEmployee();
        }        
    })
};

const viewDepartments = () => {
    const sql = 'SELECT * FROM departments';

    db.query(sql, (err, rows) => {
        if (err) {
            return err;
        }
        console.table(rows);
        questions();
    });
};

const viewRoles = () => {
    const sql = `SELECT roles.*, departments.name 
AS department_name
FROM roles
LEFT JOIN departments
ON roles.department_id = departments.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            return err;
        }
        console.table(rows);
        questions();
    });
};

const viewEmployees = () => {
    const sql = `SELECT employees.*, roles.title, roles.salary, roles.department_id 
FROM employees
LEFT JOIN roles
ON employees.role_id = roles.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            return err;
        }
        console.table(rows);
        questions();
    });
};

const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'addDepartmentName',
            message: 'What department would you like to add?',
            validate: departmentNameInput => {
                if (departmentNameInput) {
                    return true;
                } else {
                    console.log("Please enter a department!");
                    return false;
                }
            }
        }
    ]).then((answer) => {
        const sql = `INSERT INTO departments SET ?`;
        const params = { name: answer.addDepartmentName };

        db.query(sql, params, (err) => {
            if (err) {
                return err;
            }

            console.table(answer);
            questions();
        })


    })
}

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is their first name?',
            validate: firstNameInput => {
                if (firstNameInput) {
                    return true;
                } else {
                    console.log("Please enter a first name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is their last name?',
            validate: lastNameInput => {
                if (lastNameInput) {
                    return true;
                } else {
                    console.log("Please enter a last name!");
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'Role',
            message: 'What job title would you like to add?',
            choices: ['CS Representative', 'Accountant', 'Salesperson', 'Software Engineer']
        },
        {
            type: 'input',
            name: 'Salary',
            message: 'What is the yearly salary?',
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                } else {
                    console.log("Please enter a salary!");
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'Department',
            message: 'What department?',
            choices: ['Customer Service', 'Accounting', 'Sales', 'Engineering'],
        },
        {
            type: 'list',
            name: 'manager',
            message: "What's the manager's name?",
            choices: ['Bob', 'George', 'Frank', 'Sammie'],
        }
    ]).then((answer) => {
        const roleID = roleArray.indexOf(answer.Role) + 1;
        const managerID = managerArray.indexOf(answer.manager) + 1;
        const sql = `INSERT INTO employees SET ?`;
        console.log(roleID, managerID);
        const params =
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: roleID,
            manager_id: managerID
        };


        db.query(sql, params, (err) => {
            if (err) {
                return err;
            }

            console.log(params);
            console.table(answer);
            questions();
        })
    });
};

const addRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'Role',
            message: 'What job title would you like to add?'
        },
        {
            type: 'input',
            name: 'Salary',
            message: 'What is the yearly salary?',
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                } else {
                    console.log("Please enter a salary!");
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'Department',
            message: 'What department?',
            choices: ['Customer Service', 'Accounting', 'Sales', 'Engineering']
        }
    ]).then((answer) => {
        const departmentID = departmentArray.indexOf(answer.Department) + 1;
        const sql = `INSERT INTO roles SET ?`;
        const params =
        {
            title: answer.Role,
            salary: answer.Salary,
            department_id: departmentID
        };

        db.query(sql, params, (err) => {
            if (err) {
                return err;
            }

            console.table(answer);
            questions();
        })
    });
};

const updateEmployee = () => {
    const sql = `SELECT employees.*, roles.title FROM employees JOIN roles ON employees.role_id = roles.id`;
    console.log(sql);

    db.query(sql, (err, res) => {
        if (err) {
            return err;
        }
        console.log(res);
        return inquirer.prompt([
            {
                type: 'rawlist',
                name: 'employeeName',
                choices: () => {
                    var employeeName = [];
                    for (var i = 0; i < res.length; i++) {
                        const employeeFirstName = res[i].first_name;
                        const employeeLastName = res[i].last_name;
                        const employeeID = res[i].id;
                        employeeName.push(employeeFirstName + ' ' + employeeLastName + ' ' + employeeID); 

                    }
                    return employeeName;
                },
                message: "What's the name of the Employee?"
            },
            {
                type: 'rawlist',
                name: 'newRole',
                message: "What's the job title of the new Employee?",
                choices: ['CS Representative', 'Accountant', 'Salesperson', 'Software Engineer']
            }
        ]).then((answer) => {                        
            const roleID = roleArray.indexOf(answer.newRole) + 1;
            const sql = `UPDATE employees SET role_id = ${roleID}, manager_id =  WHERE employees.id = ${employeeNames[2]}`;                   

            db.query(sql, (err) => {
                if (err) {
                    return err;
                }
                console.table(answer); 
                questions();               
            })
        })
    });
};

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    questions();
});