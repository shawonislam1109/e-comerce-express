const Stock = require("./stock");

const getStocksService = async (req, res, next) => {
  const branch = req.headers.branch;
  const merchant = req.user.userId;

  // => PAGINATION QUERY
  const { page, limit } = req.query;

  try {
    const allStockFind = await Stock.find({
      branch,
      roleBy: merchant,
    })
      .populate({
        path: "product",
        select: "wholeSalePrice salePrice purchasePrice expDate",
      })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // COUNT DOCUMENT
    const count = await Stock.countDocuments();

    // Return the found Products
    return {
      allStockFind,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalDocument: parseInt(count),
    };
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

module.exports = { getStocksService };
