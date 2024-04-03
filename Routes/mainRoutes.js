const authRoutes = require("./authRoutes");
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
