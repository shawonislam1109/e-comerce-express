const Stock = require("../stock/stock");
const Product = require("./product-schema-category/medicine/product");

// PRODUCT GET
const serviceGetProducts = async (req, res) => {
  // BRANCHES AND MERCHANT
  const branch = req.headers.branch;
  const merchant = req.user.userId;

  // => PAGINATION QUERY
  const { page, limit } = req.query;
  try {
    // Perform the query
    const findProducts = await Product.find({
      branch: branch,
      roleBy: merchant,
      isTrash: false,
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // COUNT DOCUMENT
    const count = await Product.countDocuments();

    // Check if Products were found
    if (!findProducts.length) {
      return res.status(200).json({ message: "No Products found", data: [] });
    }

    // Return the found Products
    return {
      findProducts,
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

// GET PRODUCT BY ID
const getProductById = async (req, res, next) => {
  try {
    const branch = req.headers.branch;
    const roleBy = req.user.userId;
    const { productId } = req.params;

    // Create the filter object
    const filter = {
      _id: productId,
      branch,
      roleBy,
      isTrash: false,
    };

    const productGetById = await Product.findOne(filter);

    return productGetById;
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

// PRODUCT ADDED
const productAddService = async (req, res, next) => {
  const branch = req.headers.branch;
  const merchant = req.user.userId;

  try {
    const {
      productType,
      productName,
      category,
      unit,
      eachProductQuantity,
      productQuantity,
      purchasePrice,
      salePrice,
      wholeSalePrice,
      warranty,
      gantry,
      expDate,
      totalPrice,
      Products,
      brand,
    } = req.body;

    // @product added in bd
    const saveToBb = new Product({
      productType,
      productName,
      category,
      unit,
      eachProductQuantity: { ...eachProductQuantity },
      productQuantity: { ...productQuantity },
      purchasePrice: { ...purchasePrice },
      salePrice: { ...salePrice },
      wholeSalePrice,
      warranty,
      gantry,
      expDate,
      totalPrice,
      Products,
      brand,
      roleBy: merchant,
      branch: branch,
    });

    // @STOCK MANAGE
    // Save the product to the database
    const savedProduct = await saveToBb.save();

    const stock = new Stock({
      productType,
      productName,
      category,
      unit,
      eachProductQuantity: { ...eachProductQuantity },
      productQuantity: { ...productQuantity },
      purchasePrice: { ...purchasePrice },
      salePrice: { ...salePrice },
      product: savedProduct?._id,
      roleBy: merchant,
      branch: branch,
    });
    await stock.save();

    // FIND STOCK AND RESPONSE
    const findStock = await Stock.findById(stock._id).populate({
      path: "product",
      select: "wholeSalePrice salePrice purchasePrice expDate",
    });

    // @  return this service
    return { product: saveToBb, stock: findStock };

    // console.log(req.body);
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

// PRODUCT UPDATE
const productUpdateService = async (req, res, next) => {
  try {
    // GET PARAMS ID
    const { productId } = req.params;

    // REQUEST BODY
    const {
      productType,
      productName,
      category,
      unit,
      eachProductQuantity,
      productQuantity,
      purchasePrice,
      salePrice,
      wholeSalePrice,
      warranty,
      gantry,
      expDate,
      totalPrice,
      Products,
      brand,
    } = req.body;

    //FIND PRODUCT
    const findProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          productType,
          productName,
          category,
          unit,
          eachProductQuantity: { ...eachProductQuantity },
          productQuantity: { ...productQuantity },
          purchasePrice: { ...purchasePrice },
          salePrice: { ...salePrice },
          wholeSalePrice,
          warranty,
          gantry,
          expDate,
          totalPrice,
          Products,
        },
      },
      {
        new: true,
      }
    );

    return findProduct;
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

module.exports = {
  productAddService,
  productUpdateService,
  serviceGetProducts,
  getProductById,
};
