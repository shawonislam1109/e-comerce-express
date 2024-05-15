const { jwtVerify } = require("../middleware/jwtMiddleware");
const {
  createBranch,
  updateBranch,
  findQueryInBranch,
} = require("./branchController");

const branchRoute = require("express").Router();

branchRoute.post("", jwtVerify, createBranch);
branchRoute.patch("/:id", jwtVerify, updateBranch);
branchRoute.get("", jwtVerify, findQueryInBranch);

module.exports = branchRoute;
