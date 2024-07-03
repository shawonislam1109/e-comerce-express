const { jwtVerify } = require("../../middleware/jwtMiddleware");
const { getStocks } = require("./controller");

const stockRoutes = require("express").Router();

stockRoutes.get("", jwtVerify, getStocks);

module.exports = stockRoutes;
