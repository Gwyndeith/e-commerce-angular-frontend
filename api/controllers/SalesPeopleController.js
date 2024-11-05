const path = require("path");
const SalesPerson = require(path.resolve(
  __dirname,
  "../models/SalesPerson.js"
));

exports.getSalesPeople = async (req, res) => {
  try {
    const salesPeople = await SalesPerson.find();
    res.status(200).json(salesPeople);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
