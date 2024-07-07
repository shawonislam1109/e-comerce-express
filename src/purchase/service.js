const PurchaseProductsDetails = require("./purchaseProductsDetailsSchema");
const Purchase = require("./purchaseSchema");
const mongoose = require("mongoose");

// purchase product create service
const createPurchaseProductService = async (req, res, next) => {
  // const session = await mongoose.startSession();
  // session.startTransaction();

  try {
    // Create PurchaseProductsDetails instances
    const purchaseProductDetails = req?.body?.products?.map(
      (item) =>
        new PurchaseProductsDetails({
          ...item,
        })
    );

    // Save all purchaseProductDetails and get the saved instances
    const savedPurchaseProductDetails =
      await PurchaseProductsDetails.insertMany(purchaseProductDetails);

    // Extract the IDs of the saved purchaseProductDetails
    const productDetailsIds = savedPurchaseProductDetails.map(
      (detail) => detail._id
    );

    // Create the Purchase document with the product details IDs
    const purchaseProduct = new Purchase({
      ...req.body,
      branch: req.headers.branch,
      roleBy: req.user.userId,
      productDetails: productDetailsIds,
    });

    // Save the Purchase document
    await purchaseProduct.save();

    // await session.commitTransaction();
    // session.endSession();

    // Send the response
    res.status(201).json({
      message: "Purchase product created successfully",
      purchaseProduct,
    });
  } catch (error) {
    // await session.abortTransaction();
    // session.endSession();
    next(error);
  }
};

module.exports = { createPurchaseProductService };
