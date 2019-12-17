var mysql = require("mysql");
var inquirer = require("inquirer");

var PORT = process.env.PORT || 8080;
// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "ILonH3550!",
    database: "employees"
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
                searchByEmployee();
            } else if (answer.start === "View All Employees by Department") {
                searchByDepartment();
            } else if (answer.start === "View all Employees by Manager") {
                searchByManager();
            } else if (answer.start === "Add New Employee") {
                addNewEmployee();
            } else if (answer.start === "Remove Employee") {
                removeEmployee();
            } else if (answer.start === "Change Employee Role") {
                changeRole();
            } else if (answer.start === "Change Employee Manager") {
                changeManager();
            else {
                connection.end();
            }
        });
}

function searchByEmployee() {
    connection.query("SELECT")
    console.table

    inquirer
        .prompt([
            {
                name: "all__name",
                type: "input",
                message: "Please enter the Employee's First Name"
            }
        ])
        .then(function (answer) {

            var artist = answer.artist

            connection.query("SELECT position, artist, song, year FROM top5000 WHERE artist LIKE ?", '%' + artist + '%',

                function (err, response) {
                    if (err) throw err;
                    console.table(response);

                    anotherQuestion();
                }
            );
        });
}

