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
connection.connect(function(err) {
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
            choices: ["View All Employees", "View All Employees by Department", "View all Employees by Manager", "Add New Employee", "Remove Employee", "Change Employees Role", "Change Employee Manager"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.start === "View All Employees") {
                searchAll();
            } else if (answer.start === "View All Employees by Department") {
                searchByDepartment();
            } else if (answer.start === "View all Employees by Manager") {
                searchByManager();
            // } else if (answer.start === "Search Employee by First Name") {
            //     searchByEmployee();
            }
            else if (answer.start === "Add New Employee") {
                addNewEmployee();
            } else if (answer.start === "Remove Employee") {
                removeEmployee();
            } else if (answer.start === "Change Employee Role") {
                changeRole();
            } else if (answer.start === "Change Employee Manager") {
                changeManager();
            } else {
                connection.end();
            }
        });
}



function searchAll(){
    connection.query('SELECT E.first_name AS "First Name", E.last_name AS "Last Name", R.title AS "Job Title", D.name AS "Department Name" FROM employee E JOIN role R ON E.role_id = R.id JOIN department D ON D.id = r.department_id',

    function (err, response) {
        if (err) throw err;
        console.table(response);

        start();
    }
);

}


// function searchByEmployee() {
//     inquirer
//         .prompt([
//             {
//                 name: "first__name",
//                 type: "input",
//                 message: "Please enter the Employee's First Name"
//             }
//         ])
//         .then(function (answer) {

//             connection.query('SELECT E.first_name AS "First Name", E.last_name AS "Last Name", R.title AS "Job Title", D.name AS "Department Name" FROM employee E JOIN role R ON E.role_id = R.id JOIN department D ON D.id = r.department_id WHERE E.first_name=?', answer.first__name,

//                 function (err, response) {
//                     if (err) throw err;
//                     console.table(response);

//                     start();
//                 }
//             );
//         });
// }

function searchByManager(){
    inquirer
        .prompt([
            {
                name: "manager",
                type: "list",
                message: "Please select a Manager",
                choices: ["Pamela Halpert, Sales Manager", "Jim Halpert, Finance Manager", "Jason Freddy, Customer Svc Mgr", "Ella Verthang, Operations Manager", "Frank Lee, Engineering Manager", "Kitty Litter, HR Manager", "YulBee Sorry, Accounting Manager"]
            }
        ])
        .then(function(answer) {

            if(answer.manager === "Pamela Halpert, Sales Manager") {
                managerQuery(1004)
            } else if(answer.manager === "Jim Halpert, Finance Manager") {
                managerQuery(1007)
            } else if(answer.manager === "Jason Freddy, Customer Svc Mgr") {
                managerQuery(1013)
            } else if(answer.manager === "Ella Verthang, Operations Manager") {
                managerQuery(1017)
            } else if(answer.manager === "Frank Lee, Engineering Manager") {
                managerQuery(1021)
            } else if(answer.manager === "Kitty Litter, HR Manager") {
                managerQuery(1027)
            } else if(answer.manager === "YulBee Sorry, Accounting Manager") {
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

function searchByDepartment(){
    inquirer
        .prompt([
            {
                name:"department",
                type:"list",
                message: "Please choose from one of the choices to show employees for that department",
                choices: ["Executive Team", "Sales", "Finance", "Customer Service", "Operations", "Engineering", "Administrative", "Human Resources", "Product", "Legal", "Accounting"]
            }
        ])
            .then(function(answer){
                if(answer.department === "Executive Team") {
                    departmentQuery(200)
                } else if(answer.department === "Sales") {
                    departmentQuery(201)
                } else if(answer.department === "Finance") {
                    departmentQuery(202)
                } else if(answer.department === "Customer Service") {
                    departmentQuery(203)
                } else if(answer.department === "Operations") {
                    departmentQuery(204)
                } else if(answer.department === "Engineering") {
                    departmentQuery(205)
                } else if(answer.department === "Administrative") {
                    departmentQuery(206)
                } else if(answer.department === "Human Resources") {
                    departmentQuery(207)
                } else if(answer.department === "Product") {
                    departmentQuery(208)
                }   else if(answer.department === "Legal") {
                    departmentQuery(209)
                }   else if(answer.department === "Accounting") {
                    departmentQuery(210)
                }
            })
        
}

function departmentQuery(departmentID) {
    
    connection.query('SELECT E.first_name AS "First Name", E.last_name AS "Last Name", R.title AS "Job Title", D.name AS "Department Name" FROM employee E JOIN role R ON E.role_id = R.id JOIN department D ON D.id = r.department_id WHERE department_id =?', departmentID,
    
    function (err, response) {
        if (err) throw err;
        console.table(response);

        start();
    })
}


function addNewEmployee() {
    
    connection.query('select title AS "Job Title" from role', function (err, res) {
        if (err) throw err
        var matchingValues = [];
        for (j = 0; j < res.length; j++) {
          matchingValues.push(res[j].name)
        }

    
    inquirer
        .prompt([
            {
                name:"new_FirstName",
                type:"input",
                message: "What is the new employee's first name?"
            }, 
            {
                name:"new_LastName", 
                type: "input",
                message: "What is the new employee's last name?"
            },
            {
                name:"new_role", 
                type: "list",
                message: "What is the new employee's role?",
                choices: matchingValues
                ['CEO',
                        'CFO',
                        'CTO',
                        'VP Sales',
                        'Sales Manager',
                        'Account Executive',
                        'SDR',
                        'Finance Manager',
                        'Financial Analyst',
                        'Financial Associate',
                        'Director Customer Svc',
                        'Customer Service Manager',
                        'Customer Service Rep',
                        'Customer Service Coordinator',
                        'Director of Operations',
                        'Operations Manager',
                        'Operations Specialist',
                        'Operations Representitive',
                        'VP Technology',
                        'Engineering Manager',
                        'Senior Engineer',
                        'Engineer',
                        'Office Manager',
                        'Receptionist',
                        'VP Human Resources',
                        'HR Manager',
                        'HR Generalist',
                        'Payroll Specialist',
                        'VP Product',
                        'Product Manager',
                        'Product Analyst',
                        'Legal Council',
                        'Staff Attorney',
                        'Accounting Manager',
                        'Accounting Specialist',
                        'Accounting Coordinator']
            }

        ])
            .then(function(){
                var first_Name = answer.new_FirstName
                var last_Name = answer.new_LastName
                var role = answer.new_role
                var role_id = ""
                var manager_id = ""

                if (role == ("CFO" || "CTO" || "VP Sales" || "Director Customer Svc" || "Director of Operations" || "VP Human Resources" || "VP Product" || "Legal Council")) {
                    manager_id += 1000
                } else if (role == ("1001"))

                connection.query("INSERT INTO ",,function(err,response){
                    if (err) throw err;
                    console.table(response);
                    start();
                })
                }
               
            })
        }     


// function getManagerID(role){

//         connection.query('SELECT E.first_name AS "First Name", E.last_name AS "Last Name", R.title AS "Job Title", D.name AS "Department Name" FROM employee E JOIN role R ON E.role_id = R.id JOIN department D ON D.id = r.department_id WHERE department_id =?', role,
        
//         function (err, response) {
//             if (err) throw err;
//             console.table(response);
    
//             start();
//         })

//     };