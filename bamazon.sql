DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
 id INTEGER AUTO_INCREMENT NOT NULL,
 product_name VARCHAR(100) NULL, 
 department_name VARCHAR(100) NULL,
 price DECIMAL(65, 2) NULL,
 stock_quantity INTEGER(255) NULL,
 PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rocket League", "Video Games", 19.99, 1000),
		 ("Pearl Drum Set", "Music Instruments", 799.99, 100),
		 ("Diable II: Lord of Destruction", "Video Games", 19.99, 1000),
		 ("Cannondale CAADX 105 SE Bike - 2018", "Outdoors/Bicycles", 1199.19, 20),
		 ("Aloe Vera Lotion", "Pharmacy", 6.99, 500);

SELECT * FROM products;

CREATE TABLE departments (
 department_id INTEGER AUTO_INCREMENT NOT NULL,
 department_name VARCHAR(100) NOT NULL,
 overhead_costs DECIMAL(10, 2) NOT NULL,
 total_sales INTEGER(10) DEFAULT 0,
 PRIMARY KEY(department_id)
);


ALTER TABLE products ADD COLUMN
product_sales INTEGER(20) DEFAULT 0;

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Video Games", 1000),
	   ("Music Instruments", 250),
	   ("Pharmacy", 100),
	   ("Outdoors/Bicycles", 2000);
