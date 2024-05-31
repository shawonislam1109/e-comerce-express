const Supplier = require("../../model/supplier");
const {
  serviceGetSupplier,
  updateSupplierById,
  deleteSupplier,
  restoreSupplier,
} = require("./service");

const createSupplier = async (req, res, next) => {
  try {
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
      isTrash: false,
    });

    const saveDataBase = await supplier.save();
    res.json({ message: "successFully ", data: saveDataBase });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const message = { [field]: `${field} already exists.` };
      return res.status(409).send({ error: message });
    }
    next(error);
  }
};

const updateSupplier = async (req, res, next) => {
  try {
    const supplier = await updateSupplierById(req, res);
    res.status(200).json({ data: supplier, message: "Update successfully" });
  } catch (error) {
    console.log(error);
  }
};

// get supplier
const getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await serviceGetSupplier(req, res);

    // response
    res.status(200).json({ data: suppliers });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

// delete supplier
const supplierDelete = async (req, res, next) => {
  const supplier = await deleteSupplier(req, res, next);

  res
    .status(200)
    .json({ data: supplier, message: "Supplier deleted successfully" });
};
// delete supplier
const supplierRestore = async (req, res, next) => {
  const supplier = await restoreSupplier(req, res, next);

  res
    .status(200)
    .json({ data: supplier, message: "Supplier Restore successfully" });
};

// getall supplier trash data
const getSuppliersTrash = async (req, res, next) => {
  try {
    const branch = req.headers.branch;
    const merchant = req.user.userId;

    // Perform the query
    const findSupplier = await Supplier.find({
      branch: branch,
      roleBy: merchant,
      isTrash: true,
    }).lean();

    res.status(200).json({ data: findSupplier });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

module.exports = {
  createSupplier,
  updateSupplier,
  getSuppliers,
  supplierDelete,
  getSuppliersTrash,
  supplierRestore,
};
