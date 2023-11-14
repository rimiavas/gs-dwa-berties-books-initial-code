# Create database script for Berties books

# Create the database
SHOW DATABASES;
CREATE DATABASE myBookshop;
USE myBookshop;

# Create the tables
CREATE TABLE books (id INT AUTO_INCREMENT,name VARCHAR(50),price DECIMAL(5, 2) unsigned,PRIMARY KEY(id));
SHOW TABLES;
DESCRIBE books;

INSERT INTO books (name, price) VALUES('database book', 40.25),
('Node.js book', 25.00), 
('Express book', 31.99), 
('vs code book', 1.99), 
('my sql book', 300.99) ;

SELECT * FROM books;

CREATE USER 'appuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'app2027';

GRANT ALL PRIVILEGES ON myBookshop.* TO 'appuser'@'localhost';

# Create the app user and give it access to the database
CREATE USER 'appuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'app2027';
GRANT ALL PRIVILEGES ON myBookshop.* TO 'appuser'@'localhost';

