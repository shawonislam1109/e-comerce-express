const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const Branch = require("../Branch/branchSchema");
const UserModel = require("../../model/User");
const validationError = require("../../utils/validationError");

//  > ====== SIGN UP CONTROLLER ==========
const signupController = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      profilePic,
      companyName,
      location,
    } = req.body;

    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create branch
    const branch = new Branch({
      name: companyName,
      location: location,
    });

    // find  branch
    const branchSaveInDatabase = await branch.save();

    const createUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      profilePic,
      role: "merchant",
      branch: branchSaveInDatabase._id,
      location: location,
    });

    await Branch.findOneAndUpdate(
      {
        _id: branchSaveInDatabase._id,
      },
      { $set: { merchant: createUser._id } },
      { new: true }
    );

    const saveUser = await createUser.save();

    // create profile
    const profile = new ProfileSchema({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      profilePic,
      role: saveUser.role,
      merchant: saveUser._id,
      profile: saveUser._id,
      branch: branchSaveInDatabase._id,
      location: location,
    });

    await profile.save();
    // end profile save in database

    let token = jwt.sign(
      {
        firstName: saveUser.firstName,
        userId: saveUser._id,
        role: "merchant",
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    // findData
    const findUserData = await UserModel.findOne(
      { email },
      { password: 0, _v: 0, confirmPassword: 0 }
    );

    // -> FIND BRANCH
    const findBranch = await Branch.find({ merchant: findUserData._id });

    res.json({
      message: "signup successfully",
      data: findUserData,
      token,
      branches: findBranch,
    });
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
        expiresIn: "7d",
      }
    );

    // get user data
    const findUserData = await UserModel.findOne(
      {
        $or: [{ email }, { phoneNumber }],
      },
      { password: 0, _v: 0 }
    );

    // -> FIND BRANCH
    const findBranch = await Branch.find({ merchant: findUserData._id });

    // Response
    res.status(200).json({
      message: "Login successful",
      data: findUserData,
      token,
      branches: findBranch,
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
