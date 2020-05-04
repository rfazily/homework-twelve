#DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
	id INT NOT NULL auto_increment,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE role (
	id INT NOT NULL auto_increment,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT,
    PRIMARY KEY(id)
);
CREATE TABLE employee (
	id INT NOT NULL auto_increment,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id)
);
insert into department (dept_name) VALUES("Finance");
insert into role (title, salary, department_id) VALUES("Controller", 100000, 1);
insert into role (title, salary, department_id) VALUES("Payroll Specialist", 60000, 1);

insert into department (dept_name) VALUES("Human Resources");
insert into role (title, salary, department_id) VALUES("Recruiter", 65000, 2);
insert into role (title, salary, department_id) VALUES("HR Manager", 75000, 2);

insert into department (dept_name) VALUES("Marketing");
insert into role (title, salary, department_id) VALUES("Graphic Designer", 75000, 3);
insert into role (title, salary, department_id) VALUES("Marketing Manager", 80000, 3);

insert into employee (first_name, last_name, role_id) VALUES ("Nicole", "Polizzi", 3);
insert into employee (first_name, last_name, role_id) VALUES ("Paul", "DelVecchio", 5);
insert into employee (first_name, last_name, role_id) VALUES ("Jennifer", "Farley", 5);
insert into employee (first_name, last_name, role_id) VALUES ("Vinny", "Guadagnino", 2);
insert into employee (first_name, last_name, role_id) VALUES ("Samantha", "Giancola", 1);
insert into employee (first_name, last_name, role_id) VALUES ("Mike", "Sorrentino", 4);
insert into employee (first_name, last_name, role_id) VALUES ("Deena", "Cortese", 6);
insert into employee (first_name, last_name, role_id) VALUES ("Angelina", "Pivarnick", 4);
insert into employee (first_name, last_name, role_id) VALUES ("Ronnie", "Magro", 3);

