const Category = require("./categoryModel");

const createCategoryService = async (req, res, next) => {
  try {
    const { name, remarks } = req.body;

    const newCategory = new Category({
      name,
      remarks,
      branch: req.headers.branch,
      roleBy: req.user.userId,
    });

    const saveInBb = await newCategory.save();

    // @res
    if (saveInBb) {
      return saveInBb;
    }
  } catch (error) {
    console.log(error);
    error.status = 500;
    next(error);
  }
};

// @update service
const updateCategoryService = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { name, remarks } = req.body;

    const updateInDB = await Category.findByIdAndUpdate(
      categoryId,
      {
        $set: {
          name,
          remarks,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    // @res
    if (updateInDB) {
      return updateInDB;
    }
  } catch (error) {
    console.log(error);
    error.status = 500;
    next(error);
  }
};

// @delete category service
const deleteCategoryService = async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const deleteCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        $set: { isTrash: true },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select({ __v: 0 });

    return deleteCategory;
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

// @restore category service
const restoreCategory = async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const deleteSupplier = await Category.findByIdAndUpdate(
      categoryId,
      {
        $set: { isTrash: false },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select({ __v: 0 });

    return deleteSupplier;
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

module.exports = {
  deleteCategoryService,
  updateCategoryService,
  createCategoryService,
  restoreCategory,
};
