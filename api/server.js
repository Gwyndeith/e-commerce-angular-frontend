const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const db = require("../config/db");
const router = require(path.resolve(__dirname, "../config/routes"));

var app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

db(process.env.MONGODB_URL);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () =>
  console.log(`E-Commerce With Spring Boot Backend is running on port ${PORT}`)
);
