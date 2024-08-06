const {
  createPurchaseProductService,
  getAllServicePurchaseProduct,
  getSingleProductPurchase,
  getSingleProductPurchaseInvoice,
} = require("./service");
// express is a node framework that is helps in creating

const express = require("express");
const path = require("path");
const AdmZip = require("adm-zip");
const archiver = require("archiver");

// GET ALL PURCHASE PRODUCT
const allGetPurchaseProduct = async (req, res, next) => {
  try {
    const productPurchaseData = await getAllServicePurchaseProduct(
      req,
      res,
      next
    );
    res.status(201).json({ data: productPurchaseData });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};
// GET ALL PURCHASE PRODUCT
const allGetSinglePurchaseProduct = async (req, res, next) => {
  try {
    const productSinglePurchaseData = await getSingleProductPurchase(
      req,
      res,
      next
    );
    res.status(201).json({ data: productSinglePurchaseData });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

// GET ALL PURCHASE PRODUCT
const allGetPurchaseProductInvoice = async (req, res, next) => {
  try {
    const productPurchaseInvoice = await getSingleProductPurchaseInvoice(
      req,
      res,
      next
    );
    res.status(201).json({ data: productPurchaseInvoice });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

// CREATE PURCHASE
const createPurchase = async (req, res, next) => {
  try {
    const purchaseProduct = await createPurchaseProductService(req, res, next);

    if (!purchaseProduct) {
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(201).json({
      message: "Product Purchase successfully ",
      data: purchaseProduct,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE PURCHASE PRODUCT
const updatePurchaseProduct = async (req, res, next) => {};

// GET FILE UPLOAD
const getFile = async (req, res, next) => {
  const folderPath = path.join(__dirname, "public"); // Specify the folder you want to zip

  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", "attachment; filename=download.zip");

  const archive = archiver("zip", {
    zlib: { level: 9 },
  });

  archive.on("error", (err) => {
    throw err;
  });

  archive.pipe(res);
  archive.directory(folderPath, false);
  archive.finalize();
};

module.exports = {
  createPurchase,
  allGetPurchaseProduct,
  updatePurchaseProduct,
  allGetSinglePurchaseProduct,
  getFile,
  allGetPurchaseProductInvoice,
};
