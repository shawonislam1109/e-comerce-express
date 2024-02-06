const express = require("express");
const morgan = require("morgan");

//  middleware
const middleware = [
  morgan("dev"),
  express.urlencoded({ extended: true }),
  express.json(),
];

module.exports = (app) => {
  app.use(middleware);
};
