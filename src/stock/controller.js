const { getStocksService } = require("./service");

const getStocks = async (req, res, next) => {
  try {
    const { totalPages, currentPage, totalDocument, allStockFind } =
      await getStocksService(req, res, next);

    console.log(allStockFind);
    res.status(200).json({
      data: { totalPages, currentPage, totalDocument, data: allStockFind },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getStocks };
