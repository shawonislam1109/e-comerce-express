const bcrypt = require("bcrypt");
const UserModel = require("../model/User");
const jwt = require("jsonwebtoken");
const validationError = require("../utils/validationError");

//  > ====== SIGN UP CONTROLLER ==========
const signupController = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, profilePic } =
      req.body;

    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      profilePic,
    });

    const saveUser = await createUser.save();

    let token = jwt.sign(
      {
        firstName: saveUser.firstName,
        userId: saveUser._id,
        role: "admin",
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    // findData
    const findUserData = await UserModel.findOne(
      { email },
      { password: 0, _v: 0, confirmPassword: 0 }
    );

    res.json({ message: "signup successfully", data: findUserData, token });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validation = validationError(error);
      if (validation) {
        return res.status(403).json(validation);
      }
    }
    console.log(error);
    error.status = 500;
    next(err);
  }
};

//  > ====== LOGIN CONTROLLER ==========
const loginController = async (req, res, next) => {
  const { email, phoneNumber, password } = req.body;
  try {
    const findUser = await UserModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    // If user not found
    if (!findUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Password match
    let match = await bcrypt.compare(password, findUser.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // JWT token generation
    let token = jwt.sign(
      {
        firstName: findUser.firstName,
        userId: findUser._id,
        role: findUser?.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    // get user data
    const findUserData = await UserModel.findOne(
      {
        $or: [{ email }, { phoneNumber }],
      },
      { password: 0, _v: 0 }
    );
    // Response
    res.status(200).json({
      message: "Login successful",
      data: findUserData,
      token,
    });
  } catch (error) {
    console.log(error);
    error.status = 500;
    next(error);
  }
};

//  >======||  GET ALL USER ||========
const getAllUser = async (req, res, next) => {
  try {
    console.log(req.user);
    const allUser = await UserModel.find();

    res.status(201).json(allUser);
  } catch (error) {}
};

module.exports = { signupController, loginController, getAllUser };
