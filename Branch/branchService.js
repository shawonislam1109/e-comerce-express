const validationError = require("../utils/validationError");
const Branch = require("./BranchSchma");

// create branch service
const createBranchService = async (req, res, next) => {
  const { name, location } = req.body;

  try {
    const createBranch = new Branch({
      name,
      location,
      merchant: req.user?.userId,
    });

    const saveInDatabase = await createBranch.save();

    return saveInDatabase;
  } catch (error) {
    if (error.name === "ValidationError") {
      const validation = validationError(error);
      if (validation) {
        return res.status(403).json(validation);
      }
    }
    console.log(error);
    error.status = 500;
    return next(error);
  }
};

// update branch service
const updateBranchService = async (req, res) => {
  const { name, location } = req.body;
  try {
    const { id } = req.params;
    // Construct update object with provided data
    const update = { name, location };

    const findBranch = await Branch.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
    return findBranch;
  } catch (error) {}
};

module.exports = { createBranchService, updateBranchService };
