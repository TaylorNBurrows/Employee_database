var mysql = require("mysql");
var inquirer = require("inquirer");

var PORT = process.env.PORT || 8080;
// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "ILonH3550!",
    database: "employees_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
    start()
});

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "start",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Employees by Department", "View all Employees by Manager", "Search Employee by First Name", "Add New Employee", "Remove Employee", "Change Employees Role", "Change Employee Manager", "Add New Role", "Add New Department"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.start === "View All Employees") {
                searchAll();
            } else if (answer.start === "View All Employees by Department") {
                searchByDepartment();
            } else if (answer.start === "View all Employees by Manager") {
                searchByManager();
            } else if (answer.start === "Search Employee by First Name") {
                searchByEmployee();
            }
            else if (answer.start === "Add New Employee") {
                addNewEmployee();
            } else if (answer.start === "Remove Employee") {
                removeEmployee();
            } else if (answer.start === "Change Employee Role") {
                changeRole();
            } else if (answer.start === "Change Employee Manager") {
                changeManager();
            } else if (answer.start === "Add New Role") {
                newRole();
            } else if (answer.start === "Add New Department") {
                newDepartment();
            } else {
                connection.end();
            }
        });
}



function searchAll() {
    connection.query('SELECT E.first_name AS "First Name", E.last_name AS "Last Name", R.title AS "Job Title", D.name AS "Department Name" FROM employee E JOIN role R ON E.role_id = R.id JOIN department D ON D.id = r.department_id',

        function (err, response) {
            if (err) throw err;
            console.table(response);

            start();
        }
    );

}


function searchByEmployee() {
    inquirer
        .prompt([
            {
                name: "first__name",
                type: "input",
                message: "Please enter the Employee's First Name"
            }
        ])
        .then(function (answer) {

            connection.query('SELECT E.first_name AS "First Name", E.last_name AS "Last Name", R.title AS "Job Title", D.name AS "Department Name" FROM employee E JOIN role R ON E.role_id = R.id JOIN department D ON D.id = r.department_id WHERE E.first_name=?', answer.first__name,

                function (err, response) {
                    if (err) throw err;
                    console.table(response);

                    start();
                }
            );
        });
}

function searchByManager() {
    inquirer
        .prompt([
            {
                name: "manager",
                type: "list",
                message: "Please select a Manager",
                choices: ["Pamela Halpert, Sales Manager", "Jim Halpert, Finance Manager", "Jason Freddy, Customer Svc Mgr", "Ella Verthang, Operations Manager", "Frank Lee, Engineering Manager", "Kitty Litter, HR Manager", "YulBee Sorry, Accounting Manager"]
            }
        ])
        .then(function (answer) {

            if (answer.manager === "Pamela Halpert, Sales Manager") {
                managerQuery(1004)
            } else if (answer.manager === "Jim Halpert, Finance Manager") {
                managerQuery(1007)
            } else if (answer.manager === "Jason Freddy, Customer Svc Mgr") {
                managerQuery(1013)
            } else if (answer.manager === "Ella Verthang, Operations Manager") {
                managerQuery(1017)
            } else if (answer.manager === "Frank Lee, Engineering Manager") {
                managerQuery(1021)
            } else if (answer.manager === "Kitty Litter, HR Manager") {
                managerQuery(1027)
            } else if (answer.manager === "YulBee Sorry, Accounting Manager") {
                managerQuery(1035)
            }
        })
}

function managerQuery(managersID) {

    connection.query('SELECT E.first_name AS "First Name", E.last_name AS "Last Name", R.title AS "Job Title", D.name AS "Department Name" FROM employee E JOIN role R ON E.role_id = R.id JOIN department D ON D.id = r.department_id WHERE manager_id =?', managersID,

        function (err, response) {
            if (err) throw err;
            console.table(response);

            start();
        })
}

function searchByDepartment() {
    connection.query("select * from department", function (err, res) {
        if (err) throw err
        var department = [];

        for (m = 0; m < res.length; m++) {
            department.push(res[m].name)
        }

        inquirer.prompt([
            {
                name: "departmentChoice",
                type: "list",
                message: "Please select from one of the following Departments",
                choices: department
            }
        ])
            .then(function (answer) {
                var departmentChoice = answer.departmentChoice

                connection.query("Select * FROM department where name=?", departmentChoice, function (err, res) {
                    if (err) throw err
                    var departmentID = [];
                    for (j = 0; j < res.length; j++) {
                        departmentID.push(res[j].id)
                    }

                    connection.query('SELECT E.first_name AS "First Name", E.last_name AS "Last Name", R.title AS "Job Title", D.name AS "Department Name" FROM employee E JOIN role R ON E.role_id = R.id JOIN department D ON D.id = r.department_id WHERE department_id = ?', departmentID, function(err,res) {
                        console.table(res);
                        start()
                    })
                })


            })
    })
}

function addNewEmployee() {
    connection.query("select title from role", function (err, res) {
        if (err) throw err
        var title = [];
        for (j = 0; j < res.length; j++) {
            title.push(res[j].title)
        }
        inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                name: "title",
                message: "What is this employee's role?",
                choices: title
            },

        ])
            .then(function ({ firstName, lastName, title }) {

                connection.query("Select id from role where title = ?", [title], function (err, res) {
                    if (err) throw err;
                    var roleId = res[0].id;
                    var managerId;
                    connection.query("Select manager_id from employee where role_id=?", roleId, function (err, res) {
                        if (err) throw err;

                        managerId = res[0].manager_id;
                        connection.query("Insert into employee(first_name, last_name, role_id, manager_id) values(?, ?, ?, ?)", [firstName, lastName, roleId, managerId], function (err, res) {
                            if (err) throw err;
                            console.log("********************************************\n")
                            console.log("*                                          *\n")
                            console.log("*             This employee was            *\n")
                            console.log("*            successfully added           *\n")
                            console.log("*              to the database             *\n")
                            console.log("*                                          *\n")
                            console.log("********************************************")
                            start();
                        })
                    })
                })
            })

    })

}

function removeEmployee(){
    connection.query('SELECT E.id as "Employee ID", E.first_name AS "First Name", E.last_name AS "Last Name", R.title AS "Job Title", D.name AS "Department Name" FROM employee E JOIN role R ON E.role_id = R.id JOIN department D ON D.id = r.department_id', function (err, res) {
        if (err) throw err
        var employeeOptions = [];

        for (l = 0; l < res.length; l++) {
           var employeeID = res[l].id
           employeeOptions.push(employeeID)
        }

        inquirer.prompt([
            {
                name: "employeeChoice",
                type: "list",
                message: "Please select who to remove from one of the following Employees",
                choices: employeeOptions
            }
        ])
            .then(function (employeeID, first, last) {
            
                connection.query("select * from employee where id =?", employeeID , function(err,res){
                    if (err) throw err
                    console.table(res)
                })
            })

        })
    }

    function removeEmployee() {
        connection.query("select first_name, last_name from employee", function (err, res) {
          var name = []
          if (err) throw err
          for (k = 0; k < res.length; k++) {
            var firstname = res[k].first_name;
            var lastname = res[k].last_name
            console.table(firstname + lastname)
            name.push(firstname + " " + lastname)
          }
      
          inquirer.prompt([
            {
              type: "list",
              name: "employee",
              message: "Select the employee you would like to delete",
              choices: name
            }
          ])
            .then(function ({ employee }) {
              var selectedName = employee.split(" ");
              connection.query("select id from employee where (first_name = ? and last_name = ?)", [selectedName[0], selectedName[1]], function (err, res) {
                if (err) throw err
                console.table(res[0].id)
                connection.query("delete from employee where id = ?", [res[0].id], function (err, res) {
                  if (err) throw err
                  console.table(res);
                  start();
                })
              })
            })
        })
      }
      
      function newDepartment() {
        inquirer.prompt([
          {
            type: "input",
            name: "department",
            message: "Input the name of the new department"
          }
        ])
          .then(function ({ department }) {
            connection.query("insert into department(name) values (?)", [department], function (err, res) {
              if (err) throw err
              console.table(res)
              start();
            })
          })
      }
      
    
      
      function newRole() {
        connection.query("select name from department", function (err, res) {
          if (err) throw err
          deptName = [];
          for (i = 0; i < res.length; i++) {
            deptName.push(res[i].name)
          }
          inquirer.prompt([
            {
              type: "input",
              name: "role",
              message: "Input the title of the new role"
            },
            {
              type: "input",
              name: "salary",
              message: "Input the salary of the new role"
            },
            {
              type: "list",
              name: "department",
              message: "Assign this role to a department",
              choices: deptName
            }
          ])
            .then(function ({ role, salary, department }) {
              connection.query("select id from department where name = ?", [department], function (err, res) {
                if (err) throw err
                var deptId = res[0].id
                connection.query("insert into role(title, salary, department_id) values (?, ?, ?)", [role, salary, deptId], function (err, res) {
                  if (err) throw err
                  console.table(res)
                  start();
                })
              })
            })
        })
      }
      
      function changeRole() {
        connection.query("select title from role", function (err, res) {
          if (err) throw err
          var role = []
          var employee2 = []
          for (i = 0; i < res.length; i++) {
            role.push(res[i].title)
          }
          connection.query("select first_name, last_name from employee", function (err, res) {
            if (err) throw err
            for (j = 0; j < res.length; j++) {
              var firstName = res[j].first_name;
              var lastName = res[j].last_name
              console.table(firstName + lastName)
              employee2.push(firstName + " " + lastName)
            }
            inquirer.prompt([
              {
                type: "list",
                name: "pickedEmployee",
                message: "Choose an employee to update their role",
                choices: employee2
              },
              {
                type: "list",
                name: "newRole",
                message: "Choose a new role for this employee",
                choices: role
              }
            ])
            .then(function({pickedEmployee, newRole}){
              connection.query("select id from role where title = ?", [newRole], function(err, res){
                if (err) throw err
                var roleId = res[0].id
                var name = pickedEmployee.split(" ")
                connection.query("update employee set role_id = ? where first_name = ? and last_name = ?", [roleId, name[0], name[1]], function(err, res){
                  if (err) throw err
                  console.table(res)
                })
              })
            })
          })
        })
      }