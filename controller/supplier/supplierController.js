const Supplier = require("../../model/supplier");
const validationError = require("../../utils/validationError");

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

module.exports = { createSupplier, updateSupplier };
