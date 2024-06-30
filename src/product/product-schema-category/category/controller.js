const Category = require("./categoryModel");
const {
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
  restoreCategory,
} = require("./service");

// @CREATE CONTROLLER
const createCategory = async (req, res, next) => {
  const category = await createCategoryService(req, res, next);

  return res
    .status(201)
    .json({ message: "Category is create successFully", data: category });
};

// @UPDATE CONTROLLER
const updateCategory = async (req, res, next) => {
  const update = await updateCategoryService(req, res, next);

  return res
    .status(201)
    .json({ message: "Category is Update successFully", data: update });
};

// @DELETE CONTROLLER
const deleteCategory = async (req, res, next) => {
  const deleteCg = await deleteCategoryService(req, res, next);

  return res
    .status(201)
    .json({ message: "Category is create successFully", data: deleteCg });
};

// @GET CATEGORY
const getCategory = async (req, res, next) => {
  try {
    const findCategory = await Category.find({
      roleBy: req.user.userId,
      branch: req.headers.branch,
      isTrash: false,
    });

    // @RES

    return res.status(201).json({ data: findCategory });
  } catch (error) {
    console.log(error);
    error.status = 500;
    next(error);
  }
};

// delete category
const categoryRestore = async (req, res, next) => {
  const category = await restoreCategory(req, res, next);

  return res
    .status(200)
    .json({ data: category, message: "category Restore successfully" });
};

// getall category trash data
const getCategoryTrash = async (req, res, next) => {
  try {
    // Perform the query
    const findCategory = await Category.find({
      branch: req.headers.branch,
      roleBy: req.user.userId,
      isTrash: true,
    }).lean();

    return res.status(200).json({ data: findCategory });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategoryTrash,
  categoryRestore,
};
