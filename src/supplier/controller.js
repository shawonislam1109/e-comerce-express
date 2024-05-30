const Supplier = require("../../model/supplier");
const validationError = require("../../utils/validationError");

const { serviceGetSupplier } = require("./service");

const createSupplier = async (req, res, next) => {
  const {
    name,
    email,
    contactNumber,
    emergencyContactNumber,
    tradeNumber,
    presentAddress,
    permanentAddress,
    location,
    imageURL,
    nationalIdImageURL,
    status,
  } = req.body;
  try {
    const supplier = new Supplier({
      name,
      email,
      contactNumber,
      emergencyContactNumber,
      tradeNumber,
      presentAddress,
      permanentAddress,
      location,
      imageURL,
      nationalIdImageURL,
      status,
      branch: req.headers.branch,
      roleBy: req.user.userId,
    });

    const saveDataBase = await supplier.save();
    res.json({ message: "successFully ", data: saveDataBase });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validation = validationError(error);
      if (validation) {
        return res.status(403).json(validation);
      }
    } else if (error.code === 11000 && error.keyPattern) {
      return res
        .status(409)
        .json({ message: "Email address is already in use" });
    }
    error.status = 500;
    next(error);
  }
};

const updateSupplier = async (req, res, next) => {};

// get supplier
const getSuppliers = async (req, res) => {
  try {
    const branch = req.headers.branch;
    const merchant = req.user.userId;

    // Validate that branch and merchant are not undefined or null
    if (!branch || !merchant) {
      return res
        .status(400)
        .json({ error: "Branch and merchant must be provided" });
    }

    // Perform the query
    const findSupplier = await Supplier.find({
      branch: branch,
      roleBy: merchant,
    }).lean();

    // Check if suppliers were found
    if (!findSupplier.length) {
      return res.status(404).json({ message: "No suppliers found", data: [] });
    }

    // Return the found suppliers
    res.status(200).json({ data: findSupplier });
  } catch (error) {
    // Handle any errors that occur during the operation
    console.error("Error finding suppliers:", error);
    res
      .status(500)
      .json({ error: "An error occurred while finding suppliers" });
  }
};

module.exports = { createSupplier, updateSupplier, getSuppliers };
