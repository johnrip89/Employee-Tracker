INSERT INTO departments (name)
VALUES
('Customer Service'),
('Accounting'),
('Sales'),
('Engineering');

INSERT INTO roles (title, department_id, salary)
VALUES
('CS Representative', 1, 40000),
('CS Team Lead', 1, 60000),
('Accountant', 2, 65000),
('Lead Accountant', 2, 80000),
('Salesperson', 3, 50000),
('Sales Lead', 3, 65000),
('Software Engineer', 4, 85000),
('Engineer Team Lead', 4, 100000);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Bob', 'Thompson', 8, NULL),
('George', 'Frazier', 4, NULL),
('Frank', 'Larusso', 6, NULL),
('Sammie', 'Quatro', 2, NULL),
('Tom', 'Michaels', 7, 1),
('Michael', 'Bobson', 7, 1),
('Billy', 'Joe', 1, 4),
('Jill', 'Bill', 3, 2),
('Meg', 'Smith', 5, 3),
('Joey', 'Bills', 1, 4),
('Travis', 'Travers', 1, 4),
('Schmidt', 'Megan', 5, 3);
