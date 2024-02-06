const jwt = require("jsonwebtoken");

const jwtVerify = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const token = authorization.split(" ")[0];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { username, userId } = decoded;
    req.user = { username, userId };
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};

module.exports = { jwtVerify };
