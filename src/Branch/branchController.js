const Branch = require("./branchSchema");
const { createBranchService, updateBranchService } = require("./branchService");

// create controller
const createBranch = async (req, res, next) => {
  const operationCreateBranch = await createBranchService(req, res, next);
  res.status(200).json({ data: operationCreateBranch });
};

// update controller
const updateBranch = async (req, res, next) => {
  const operationUpdateBranch = await updateBranchService(req, res, next);
  res.status(200).json({ data: operationUpdateBranch });
};

// find branch controller
const findQueryInBranch = async (req, res, next) => {
  try {
    const findBranch = await Branch.find({ merchant: req.user.userId });
    res.status(200).json({ data: findBranch });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createBranch, updateBranch, findQueryInBranch };
