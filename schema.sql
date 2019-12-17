DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE employee(
  id INTEGER(5) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id int,
  manager_id int, 
  PRIMARY KEY (id)
) AUTO_INCREMENT = 10000;

CREATE TABLE role(
  id INTEGER(2) AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  department_id int,
  PRIMARY KEY (id)
) AUTO_INCREMENT = 10;

CREATE TABLE department(
  id INTEGER(3) AUTO_INCREMENT NOT NULL,
  name varchar(30),
  PRIMARY KEY (id)
) AUTO_INCREMENT = 200;


INSERT INTO department (name) values ('Executives'), ('Sales'), ('Finance'), ('Customer Service'), ('Operations'), ('Engineering'), ('Administrative'), ('Human resources'), ('Product Management'), ('Legal'), ('Accounting');
INSERT INTO role (title, salary, department_id) values ('CEO', 300000, 200), ('CFO', 250000, 200), ('CTO', 250000, 200);
INSERT INTO role (title, salary, department_id) values ('VP Sales', 195000, 201), ('Sales Manager', 100000, 201), ('Account Executive', 75000, 201), ('SDR', 45000, 201);
INSERT INTO role (title, salary, department_id) values ('Finance Manager', 100000, 202), ('Financial Analyst', 75000, 202), ('Financial Associate', 45000, 202);
INSERT INTO role (title, salary, department_id) values ('Director Customer Svc', 155000, 203), ('Customer Service Manager', 100000, 203), ('Customer Service Rep', 40000, 203), ('Customer Service Coordinator', 35000, 203);
INSERT INTO role (title, salary, department_id) values ('Director of Operations', 155000, 204), ('Operations Manager', 100000, 204), ('Operations Specialist', 55000, 204), ('Operations Representitive', 35000, 204);
INSERT INTO role (title, salary, department_id) values ('VP Technology', 210000, 205), ('Engineering Manager', 175000, 205), ('Senior Engineer', 150000, 205), ('Engineer', 105000, 205);
INSERT INTO role (title, salary, department_id) values ('Office Manager', 55000, 206), ('Receptionist', 35000, 206);
INSERT INTO role (title, salary, department_id) values ('VP Human Resources', 195000, 207), ('HR Manager', 100000, 207), ('HR Generalist', 75000, 207), ('Payroll Specialist', 45000, 207);
INSERT INTO role (title, salary, department_id) values ('VP Product', 195000, 208), ('Product Manager', 100000, 208), ('Product Analyst', 75000, 208);
INSERT INTO role (title, salary, department_id) values ('Legal Council', 125000, 209), ('Staff Attorney', 100000, 209);
INSERT INTO role (title, salary, department_id) values ('Accounting Manager', 100000, 210), ('Accounting Specialist', 65000, 210), ('Accounting Coordinator', 45000, 210);

-- add employees (already added the first row)
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Fred', 'Flinstone', 10, NULL), ('Slim', 'Shady', 11, 1000), ('Alison', 'Wonderland', 12, 1000), ('Michael', 'Scott', 16, 1000), ('Pamela', 'Halpert', 17, 1000), ('Jason', 'Derulo', 18, 1000);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Dwight', 'Schrute', 19, 1001), ('Jim', 'Halpert', 20, 1006), ('Angela', 'Martin', 21, 1007), ('Andy', 'Bernard', 22, 1007);
INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('Donald', 'Trump', 23, 1000), ('Jason', 'Freddy', 24, 1010), ('Melania', 'Trump', 23, 1011), ('Jason', 'Freddy', 24, 1011);
INSERT INTO employee (first_name, last_name, role_id) values ('Amber','Alert', 25), ('Crystal', 'Clear', 26), ('Beau', 'Nydel', 27), ('Ella', 'Verthang', 28), ('Fran','Tastic', 29), ('Gary', 'Baldhy', 30), ('Ed', 'Case', 31), ('Frank', 'Lee', 32), 
('Herb','Garden', 33), ('Gerry', 'Attric', 34), ('Hank', 'Urchiff', 35), ('Hugh', 'Jarasse', 36), ('Ivor','Got', 37), ('Kitty', 'Litter', 38), ('May', 'Bee', 39), ('Lou', 'SeeGoosey', 40), ('Melo','Dramatic', 41), ('Dawn', 'Chrous', 42), ('Donna', 'Kebab', 43), ('Sue', 'Preem', 44), ('Vic','Arious', 45), ('YulBee', 'Sorry', 46), ('Wendy', 'House', 47), ('Pat', 'Pending', 48)

