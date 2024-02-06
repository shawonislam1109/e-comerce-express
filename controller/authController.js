const bcrypt = require("bcrypt");
const UserModel = require("../model/User");
const jwt = require("jsonwebtoken");

//  > ====== SIGN UP CONTROLLER ==========
const signupController = async (req, res, next) => {
  try {
    const { username, email, password, phoneNumber, profilePic } = req.body;

    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      profilePic,
    });

    const saveUser = await createUser.save();

    let token = jwt.sign(
      {
        username: saveUser.username,
        userId: saveUser._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.json({ message: "signup successfully", data: saveUser, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
        username: findUser.username,
        userId: findUser._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    // Response
    res.status(200).json({
      message: "Login successful",
      data: findUser,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error! Something went wrong." });
  }
};

//  >======||  GET ALL USER ||========
const getAllUser = async (req, res, next) => {
  console.log(req.user);
  try {
    const allUser = await UserModel.find();

    res.status(201).json(allUser);
  } catch (error) {}
};

module.exports = { signupController, loginController, getAllUser };
