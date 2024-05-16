const { jwtVerify } = require("../../middleware/jwtMiddleware");
const { getProfile } = require("./profileController");

const profileRoute = require("express").Router();

profileRoute.get("/:id", jwtVerify, getProfile);

module.exports = profileRoute;
