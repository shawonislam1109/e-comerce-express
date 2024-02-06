const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

// import
const setRouters = require("./Routes/mainRoutes");
const setMiddleware = require("./middleware/mainMiddleware");
const setErrorHandler = require("./errorHandler/errorHandler");

// Usings middleware from middleware directory
setMiddleware(app);

// Usings route from route directory
setRouters(app);

// import error handler
setErrorHandler(app);

const port = process.env.PORT || 9191;

// connect mongoose
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Running on port ${port}`);
    });
  })
  .catch((err) => {
    return console.log(err);
  });
