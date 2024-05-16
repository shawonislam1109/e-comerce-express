const branchRoute = require("../Branch/barnchRoute");
const profileRoute = require("../src/profile/profileRoute");
const authRoutes = require("./authRoutes");
const brandRoutes = require("./brandRoutes");
const productRoutes = require("./productRoutes");
const supplierRoute = require("./supplierRoutes");

const routes = [
  {
    path: "/auth",
    handler: authRoutes,
  },
  {
    path: "/supplier",
    handler: supplierRoute,
  },
  {
    path: "/product",
    handler: productRoutes,
  },
  {
    path: "/brand",
    handler: brandRoutes,
  },
  {
    path: "/branches",
    handler: branchRoute,
  },
  {
    path: "/profile",
    handler: profileRoute,
  },
  {
    path: "/",
    handler: (req, res) => {
      res.send({
        message: "Server is running",
      });
    },
  },
];

module.exports = (app) => {
  routes.forEach((route) => {
    if (route.path === "/") {
      app.get(route.path, route.handler);
    } else {
      app.use(route.path, route.handler);
    }
  });
};
