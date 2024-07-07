const {
  productAddService,
  serviceGetProducts,
  getProductById,
  productUpdateService,
} = require("./service");

// -> GET PRODUCTS
const getProducts = async (req, res, next) => {
  try {
    const { findProducts, totalDocument, currentPage, totalPages } =
      await serviceGetProducts(req, res, next);
    // response product

    res.status(200).json({
      data: { data: findProducts, totalDocument, currentPage, totalPages },
    });
  } catch (error) {}
};

// -> GET PRODUCT BY ID
const productById = async (req, res, next) => {
  try {
    const product = await getProductById(req, res, next);

    // response
    res.status(200).json({ data: product });
  } catch (error) {}
};

// -> PRODUCT ADD CONTROLLER
const productAddController = async (req, res, next) => {
  try {
    const { stock, product } = await productAddService(req, res, next);

    if (!product || !stock) {
      return res
        .status(500)
        .json({ message: "Product or Stock creation failed" });
    }

    return res.status(201).json({
      message: "Product added successfully",
      data: product,
      stock: stock,
    });

    // res
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

// => PRODUCT UPDATE CONTROLLER
const productUpdate = async (req, res, next) => {
  try {
    const product = await productUpdateService(req, res, next);
    //  res product update
    res
      .status(201)
      .json({ data: product, message: "Product update successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  productAddController,
  getProducts,
  productById,
  productUpdate,
};
