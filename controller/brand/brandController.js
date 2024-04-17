const {
  brandAddService,
  brandUpdateService,
} = require("../../service/brand/brandService");
const validationError = require("../../utils/validationError");

const brandAddController = async (req, res, next) => {
  try {
    const { saveBD } = await brandAddService(req, res);

    res
      .status(201)
      .json({ message: "Brand create successFully ", data: saveBD });
  } catch (error) {
    // error handler
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

const brandUpdateController = async (req, res, next) => {
  try {
    const { findBrand } = await brandUpdateService(req, res);
    res
      .status(201)
      .json({ message: "Brand update successFully ", data: findBrand });
  } catch (error) {
    // error handler
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

module.exports = { brandAddController, brandUpdateController };
