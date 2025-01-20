const express = require('express');
const router = express.Router();
const formidable = require('express-formidable');

const { requiredSignIn, isAdmin } = require("../middlewares/authMiddleware");
const { addProductRating, realtedProductController, getProductAverageRating, productCategoryController, createProductController, searchController, updateProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, productFiltersController, productCountController, productListController } = require('../controller/productContoller');

router.post(
  "/create-product",
  requiredSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requiredSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);
router.get("/get-product-rating", getProductAverageRating);
router.post("/add-product-rating", requiredSignIn, addProductRating);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//Search Product
router.get("/search/:keyword", searchController);

//Similar Product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

module.exports = router;