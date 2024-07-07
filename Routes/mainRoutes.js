const branchRoutes = require("../src/Branch/branchRoutes");
const brandRoutes = require("../src/Brand/routes");
const authRoutes = require("../src/auth/routes");
const categoryRoutes = require("../src/product/product-schema-category/category/routes");
const productRoutes = require("../src/product/routes");
const profileRoute = require("../src/profile/profileRoute");
const purchaseRoutes = require("../src/purchase/purchaseRoute");
const stockRoutes = require("../src/stock/routes");
const supplierRoute = require("../src/supplier/routes");

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
    path: "/stocks",
    handler: stockRoutes,
  },
  {
    path: "/products/purchase",
    handler: purchaseRoutes,
  },
  {
    path: "/brand",
    handler: brandRoutes,
  },
  {
    path: "/branches",
    handler: branchRoutes,
  },
  {
    path: "/profile",
    handler: profileRoute,
  },
  {
    path: "/category",
    handler: categoryRoutes,
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
