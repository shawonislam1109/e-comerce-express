const { createPurchaseProductService } = require("./service");

// GET ALL PURCHASE PRODUCT
const allGetPurchaseProduct = async (req, res, next) => {};

// CREATE PURCHASE
const createPurchase = async (req, res, next) => {
  try {
    const purchaseProduct = await createPurchaseProductService(req, res, next);

    if (!purchaseProduct) {
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({
      message: "purchase product create successfully ",
      data: purchaseProduct,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE PURCHASE PRODUCT
const updatePurchaseProduct = async (req, res, next) => {};

module.exports = {
  createPurchase,
  allGetPurchaseProduct,
  updatePurchaseProduct,
};
