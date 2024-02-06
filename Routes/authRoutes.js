const router = require("express").Router();

const {
  signupController,
  loginController,
  getAllUser,
} = require("../controller/authController");
const { jwtVerify } = require("../middleware/jwtMiddleware");
const { loginValidator } = require("../validator/loginValidator");
const { signupValidator } = require("../validator/signupValidator");

router.post("/signup", signupValidator, signupController);
router.post("/login", loginValidator, loginController);
router.get("/allUser", jwtVerify, getAllUser);

module.exports = router;
