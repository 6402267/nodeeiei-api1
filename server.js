const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "157.245.59.56",
  user: "u6402267",
  password: "6402267",
  database: "u6402267_Men's_fashion_clothes",
  port: 3366,
});

var app = express();
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.json({
    status: "ok",
    message: "Hello World",
  });
});

app.get("/customers", function (req, res) {
  connection.query("SELECT * FROM a1_customer", function (err, results) {
    console.log(results); //แสดงผลที่ console
    res.json(results); //ตอบกลับ request
  });
});

app.get("/orders", function (req, res) {
  connection.query("SELECT * FROM a1_order", function (err, results) {
    console.log(results); //แสดงผลที่ console
    res.json(results); //ตอบกลับ request
  });
});

app.get("/products", function (req, res) {
  connection.query("SELECT * FROM a1_product", function (err, results) {
    console.log(results); //แสดงผลที่ console
    res.json(results); //ตอบกลับ request
  });
});

app.get("/top_products", function (req, res) {
  connection.query(
    "SELECT a1_product.* , sum(quantity) as quantity_sum FROM a1_product,a1_order WHERE a1_order.idcloth = a1_product.idcloth GROUP BY a1_order.idcloth ORDER BY quantity_sum desc;",
    function (err, results) {
      console.log(results); //แสดงผลที่ console
      res.json(results); //ตอบกลับ request
    }
  );
});

app.get("/top_customers", function (req, res) {
  connection.query(
    "SELECT a1_customer.*, sum(quantity*price) as price_sum FROM a1_customer,a1_order,a1_product WHERE a1_order.customerid = a1_customer.customerid AND a1_order.idcloth = a1_product.idcloth GROUP BY a1_order.customerid ORDER BY price_sum DESC;",
    function (err, results) {
      console.log(results); //แสดงผลที่ console
      res.json(results); //ตอบกลับ request
    }
  );
});

app.post("/orders", function (req, res) {
  const values = req.body;
  console.log(values);
  connection.query(
    "INSERT INTO a1_order (orderid, idcloth, customerid, quantity) VALUES ?",
    [values],
    function (err, results) {
      console.log(results); //แสดงผลที่ console
      res.json(results); //ตอบกลับ request
    }
  );
});

app.listen(5555, () => {
  console.log("Server is started.");
});
