const { jwtVerify } = require("../../../../middleware/jwtMiddleware");
const {
  createCategory,
  getCategory,
  getCategoryTrash,
  updateCategory,
  deleteCategory,
  categoryRestore,
} = require("./controller");
const { CategoryValidator } = require("./validator");

const categoryRoutes = require("express").Router();

categoryRoutes.post("/", jwtVerify, CategoryValidator, createCategory);
categoryRoutes.get("/", jwtVerify, getCategory);
categoryRoutes.get("/trash", jwtVerify, getCategoryTrash);
categoryRoutes.patch("/:categoryId", jwtVerify, updateCategory);
categoryRoutes.patch("/restore/:categoryId", jwtVerify, categoryRestore);
categoryRoutes.patch("/delete/:categoryId", jwtVerify, deleteCategory);

module.exports = categoryRoutes;
