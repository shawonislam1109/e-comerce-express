const validateUnit = require("../../utils/validateUnit");
const Stock = require("../stock/stock");
const PurchaseInvoice = require("./purchaseInvoiceSchema");
const PurchaseProductsDetails = require("./purchaseProductsDetailsSchema");
const Purchase = require("./purchaseSchema");
const mongoose = require("mongoose");

//  GET ALL SERVICE PRODUCTS
const getAllServicePurchaseProduct = async (req, res, next) => {
  // BRANCHES AND MERCHANT
  const branch = req.headers.branch;
  const merchant = req.user.userId;

  // => PAGINATION QUERY
  const { page, limit } = req.query;

  try {
    const findPurchaseProduct = await Purchase.find({
      branch: branch,
      roleBy: merchant,
      isTrash: false,
    })
      .populate("productDetails")
      .populate("productsId")
      .sort({ createAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // COUNT DOCUMENT
    const count = await Purchase.countDocuments();

    // Check if Products were found
    if (!findPurchaseProduct.length) {
      return res.status(200).json({
        message: "No Products found",
        data: {
          data: [],
          totalPages: Math.ceil(count / limit),
          currentPage: parseInt(page),
          totalDocument: parseInt(count),
        },
      });
    }

    // Return the found Products
    return {
      data: findPurchaseProduct,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalDocument: parseInt(count),
    };
  } catch (error) {
    // Handle any errors that occur during the operation
    console.error("Error finding Products:", error);
    res.status(500).json({ error: "An error occurred while finding Products" });
  }
};

// purchase product create service
const createPurchaseProductService = async (req, res, next) => {
  // const session = await mongoose.startSession();
  // session.startTransaction();

  try {
    const { products, productsId } = req.body;

    // Create PurchaseProductsDetails instances and save them
    const purchaseProductDetails = products.map((item) => ({
      ...item,
      branch: req.headers.branch,
      roleBy: req.user.userId,
    }));
    const savedPurchaseProductDetails =
      await PurchaseProductsDetails.insertMany(purchaseProductDetails);

    // Extract the IDs of the saved purchaseProductDetails
    const productDetailsIds = savedPurchaseProductDetails.map(
      (detail) => detail._id
    );

    // Create and save the Purchase document
    const purchaseProduct = new Purchase({
      ...req.body,
      branch: req.headers.branch,
      roleBy: req.user.userId,
      productDetails: productDetailsIds,
    });
    await purchaseProduct.save();

    // Update savedPurchaseProductDetails with the purchase ID
    await PurchaseProductsDetails.updateMany(
      { _id: { $in: productDetailsIds } },
      { purchase: purchaseProduct._id }
    );

    // STOCK UPDATE START

    const stockUpdates = {};

    productsId.forEach((productId) => {
      const productFind = products.find((item) => item.product == productId);
      validateUnit(productFind?.unit)?.forEach((unit) => {
        if (!stockUpdates[productId]) {
          stockUpdates[productId] = {};
        }
        stockUpdates[productId][unit] = productFind["productQuantity"][unit];
      });
    });

    // Fetch all relevant stock records
    const stocks = await Stock.find({ product: { $in: productsId } });

    // Update the stock quantities
    stocks.forEach((stock) => {
      const update = stockUpdates[stock.product];
      validateUnit(stock.unit).forEach((unit) => {
        stock.productQuantity[unit] += update[unit];
      });
      stock.markModified("productQuantity");
    });

    // console.log(stocks);

    // Save the updated stock records in batch
    await Promise.all(stocks.map((stock) => stock.save()));

    // STOCK UPDATE END

    // Calculate the total price, tax, and discount for all products
    const totalObject = purchaseProductDetails.reduce(
      (acc, detail) => {
        const { productQuantity, purchasePrice, unit, tax, discount } = detail;
        validateUnit(unit)?.forEach((item) => {
          acc.totalPrice += productQuantity[item] * purchasePrice[item];
        });
        acc.totalTax +=
          (tax?.amount || 0) + (acc.totalPrice * (tax?.percentage || 0)) / 100;
        acc.totalDiscount +=
          (discount?.amount || 0) +
          (acc.totalPrice * (discount?.percentage || 0)) / 100;

        return acc;
      },
      { totalPrice: 0, totalTax: 0, totalDiscount: 0 }
    );

    // Create and save the PurchaseInvoice document
    const newInvoice = new PurchaseInvoice({
      purchase: purchaseProduct._id,
      purchaseProducts: productDetailsIds,
      totalPrice: totalObject.totalPrice,
      grandTotal: totalObject.totalPrice + totalObject.totalTax,
      totalDiscount:
        totalObject.totalDiscount + (purchaseProduct?.totalDiscount || 0),
      tax: totalObject.totalTax,
      provideBalance: purchaseProduct?.provideBalance,
      due:
        totalObject.totalPrice +
        totalObject.totalTax -
        purchaseProduct?.provideBalance,
      paymentMethod: purchaseProduct.paymentMethod,
      paymentStatus: purchaseProduct.paymentStatus,
      branch: req.headers.branch,
      roleBy: req.user.userId,
    });
    await newInvoice.save();

    // await session.commitTransaction();
    // session.endSession();

    return purchaseProduct;
  } catch (error) {
    // await session.abortTransaction();
    // session.endSession();
    next(error);
  }
};

module.exports = { createPurchaseProductService, getAllServicePurchaseProduct };
