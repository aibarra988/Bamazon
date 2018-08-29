# Bamazon
A CLI based store front and management written in Node.js and MySQL.

---

## Installation

1. Run schema.sql on while connected to a MySQL Server to load the data that we will be working with.

2. Install dependencies
```
npm install 
```

3. Run either of the following roles to load their specific menus:
```
node bamazonCustomer.js
node bamazonManager.js
node bamazonSupervisor.js
```
---
## Bamazon Customer

This routine allows you to act as a customer and lets you choose items to buy given the id of the product.

### Demo
![Customer Demo](https://github.com/aibarra988/Bamazon/blob/master/images/customer.gif)

---
## Bamazon Manager
This routine allows you to act as a manager and lets you:
    
1. View items for sale in Bamazon
2. View items that are low in stock
3. Add more stock to existing items
4. Add a new product to sell

### Demo
![Manager Demo](https://github.com/aibarra988/Bamazon/blob/master/images/manager.gif)

---
## Todo
- Finalize Supervisor flow
