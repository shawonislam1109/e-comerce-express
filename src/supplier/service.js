const Supplier = require("../../model/supplier");

// SUPPLIER GET
const serviceGetSupplier = async (req, res) => {
  try {
    const branch = req.headers.branch;
    const merchant = req.user.userId;

    // Perform the query
    const findSupplier = await Supplier.find({
      branch: branch,
      roleBy: merchant,
      isTrash: false,
    }).lean();

    // Check if suppliers were found
    if (!findSupplier.length) {
      return res.status(200).json({ message: "No suppliers found", data: [] });
    }

    // Return the found suppliers
    return findSupplier;
  } catch (error) {
    // Handle any errors that occur during the operation
    console.error("Error finding suppliers:", error);
    res
      .status(500)
      .json({ error: "An error occurred while finding suppliers" });
  }
};

// UPDATE SUPPLIER
const updateSupplierById = async (req, res) => {
  try {
    const { supplierId } = req.params;
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

    // Create an object with the fields to update
    const updateData = {
      ...(name && { name }),
      ...(email && { email }),
      ...(contactNumber && { contactNumber }),
      ...(emergencyContactNumber && { emergencyContactNumber }),
      ...(tradeNumber && { tradeNumber }),
      ...(presentAddress && { presentAddress }),
      ...(permanentAddress && { permanentAddress }),
      ...(location && { location }),
      ...(imageURL && { imageURL }),
      ...(nationalIdImageURL && { nationalIdImageURL }),
      ...(status && { status }),
    };

    // update find data

    // Update supplier data
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      supplierId,
      {
        $set: { ...updateData },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select({ __v: 0 });

    return updatedSupplier;
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const message = { [field]: `${field} already exists.` };
      return res.status(409).send({ error: message });
    }
    next(error);
  }
};

const deleteSupplier = async (req, res, next) => {
  const { supplierId } = req.params;

  try {
    const deleteSupplier = await Supplier.findByIdAndUpdate(
      supplierId,
      {
        $set: { isTrash: true },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select({ __v: 0 });

    return deleteSupplier;
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const restoreSupplier = async (req, res, next) => {
  const { supplierId } = req.params;

  try {
    const deleteSupplier = await Supplier.findByIdAndUpdate(
      supplierId,
      {
        $set: { isTrash: false },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select({ __v: 0 });

    return deleteSupplier;
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

module.exports = {
  serviceGetSupplier,
  updateSupplierById,
  deleteSupplier,
  restoreSupplier,
};
