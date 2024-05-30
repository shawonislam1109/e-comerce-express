const { jwtVerify } = require("../../middleware/jwtMiddleware");
const { loginValidator } = require("../../validator/loginValidator");
const { signupValidator } = require("../../validator/signupValidator");
const {
  signupController,
  loginController,
  getAllUser,
} = require("./controller");

const authRoutes = require("express").Router();

authRoutes.post("/signup", signupValidator, signupController);
authRoutes.post("/login", loginValidator, loginController);
authRoutes.get("/allUser", jwtVerify, getAllUser);

module.exports = authRoutes;
