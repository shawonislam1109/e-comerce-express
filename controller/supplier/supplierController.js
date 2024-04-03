const Supplier = require("../../model/supplier");
const validationError = require("../../utils/validationError");

const supplierController = async (req, res, next) => {
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
    if (Object.keys(error).length > 0) {
      const validation = validationError(error);
      if (validation) {
        return res.status(403).json(validation);
      }
    }
    error.status = 500;
    next(error);
  }
};

module.exports = { supplierController };
