SELECT id, first_name, last_name, title, department, salary, manager_id
FROM employee e, department d, role r
INNER JOIN top5000 
ON topalbums.year = top5000.year AND top5000.artist = topalbums.artist
WHERE topalbums.artist LIKE ? 
ORDER BY 