const { jwtVerify } = require("../../middleware/jwtMiddleware");
const {
  createBranch,
  updateBranch,
  findQueryInBranch,
} = require("./branchController");

const branchRoutes = require("express").Router();

branchRoutes.post("", jwtVerify, createBranch);
branchRoutes.patch("/:id", jwtVerify, updateBranch);
branchRoutes.get("", jwtVerify, findQueryInBranch);

module.exports = branchRoutes;
