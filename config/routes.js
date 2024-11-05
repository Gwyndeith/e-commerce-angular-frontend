const express = require("express");
const router = express.Router();
const path = require("path");

// Import the controller
const salesPeopleController = require(path.resolve(
  __dirname,
  "../api/controllers/SalesPeopleController"
));

// Define a GET route and route it to the controller's function
router.get("/sales/getSalesPeople", salesPeopleController.getSalesPeople);

module.exports = router;
