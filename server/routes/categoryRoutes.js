const express = require('express');
const router = express.Router();

const{ requiredSignIn,isAdmin} = require("../middlewares/authMiddleware");
const { createCategoryController,updateCategoryController,categoryController ,singleCategoryController,deleteCategoryCOntroller} = require('../controller/categoryController');

//Create Category
router.post('/create-category',requiredSignIn,isAdmin,createCategoryController);

//Update Category
router.put('/update-category/:id',requiredSignIn,isAdmin,updateCategoryController)

//get all categories
router.get('/get-category',categoryController)


//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requiredSignIn,
  isAdmin,
  deleteCategoryCOntroller
);

module.exports = router;