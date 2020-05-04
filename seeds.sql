SELECT employee.last_name, employee.first_name, role.title, role.salary, department.dept_name
	FROM employee
		LEFT JOIN role ON role.id = employee.role_id
        LEFT JOIN department ON role.department_id = department.id
				ORDER BY Last_name ASC;