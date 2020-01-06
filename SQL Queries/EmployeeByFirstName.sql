USE employees_db; 

SELECT E.first_name, E.last_name, R.title, D.name
FROM employee E 
  JOIN role R ON E.role_id = R.id 
  JOIN department D ON D.id = r.department_id
  WHERE E.first_name = "fred"