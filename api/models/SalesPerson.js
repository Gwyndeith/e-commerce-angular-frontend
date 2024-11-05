const mongoose = require("mongoose");

const salesPersonSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salesVolume: Number,
});

module.exports = mongoose.model(
  "SalesPerson",
  salesPersonSchema,
  "SalesPeople"
);
