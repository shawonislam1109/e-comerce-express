const productAddController = (req, res, next) => {
  const {
    name,
    description,
    unit,
    totalPrice,
    discount,
    supplier,
    category,
    brand,
  } = req.body;
};

module.exports = { productAddController };
