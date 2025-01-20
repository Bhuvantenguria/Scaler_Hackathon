const express = require('express');
const { requiredSignIn } = require("../middlewares/authMiddleware");

const router = express.Router();
const { getCart, updateCart, updateProfile, cartProduct } = require('../controller/userController');

router.get('/get-cart', requiredSignIn, getCart);
router.get('/cart-product', requiredSignIn, cartProduct);
router.put('/update-cart', requiredSignIn, updateCart);
router.put('/update-profile', updateProfile);

module.exports = router;
