const cl = console.log;
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();

dotenv.config({
  path: "../env",
});

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  port: "3306",
});

connection.connect((err) => {
  if (err) {
    cl("MYSQL server is not connected", err);
    return;
  }
  cl("MYSQL server is connected");
});

app.use(cors());
app.use(bodyParser.json());

//! get all posts data

app.get("/api/posts", (req, res) => {
  let qrr = "select * from post_info";
  connection.query(qrr, (err, result) => {
    if (err) {
      cl(err, "err");
    }
    if (result.length > 0) {
      res.send({
        msg: "GET All Post data",
        data: result,
      });
    }
  });
});

//todo get single post data

app.get("/api/posts/:id", async (req, res) => {
  let qrId = req.params.id;
  let qrr = `select * from post_info where id = ${qrId}`;
  connection.query(qrr, (err, result) => {
    if (err) {
      cl(err);
    }
    if (result.length > 0) {
      res.send({
        msg: "Get Single Post Data",
        data: result,
      });
    } else {
      cl("Data Not Found");
    }
  });
});

//! Post Data to database

app.post("/api/posts", (req, res) => {
  let UserId = req.body.userid;
  let Title = req.body.title;
  let Content = req.body.body;

  let qrr = `insert into post_info(userid , title , body) values(${UserId} , '${Title}' , '${Content}')`;

  connection.query(qrr, (err, result) => {
    if (err) {
      cl(err);
    }
    res.send({
      msg: "Post is Successfully Created",
    });
  });
});

//todo Update Post Data

app.patch("/api/posts/:id", (req, res) => {
  let uId = req.params.id;
  let userId = req.body.userid;
  let Title = req.body.title;
  let Content = req.body.body;

  let qrr = `UPDATE post_info SET userid = '${userId}', title = '${Title}', body = '${Content}' WHERE (id = ${uId})`;

  connection.query(qrr, (err, result) => {
    if (err) {
      cl(err);
    }
    res.send({
      msg: "Post is successfully updated!!!",
    });
  });
});

//todo Delete Post From Database

app.delete("/api/posts/:id", (req, res) => {
  let uId = req.params.id;
  let qrr = `delete from post_info where id = ${uId}`;
  connection.query(qrr, (err, result) => {
    if (err) {
      cl(err);
    }
    res.send({
      msg: "Post is successfully delete!!!",
    });
  });
});

app.listen(process.env.PORT || 3000, () => {
  cl(`Server is running on port ${process.env.PORT}`);
});
