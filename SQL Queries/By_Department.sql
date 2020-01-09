USE employees_db; 

SELECT E.first_name AS "First Name", E.last_name AS "Last Name", R.title AS "Job Title", D.name AS "Department Name"
FROM employee E 
  JOIN role R ON E.role_id = R.id 
  JOIN department D ON D.id = r.department_id
  
WHERE department_id = 200;