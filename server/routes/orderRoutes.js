const express = require('express');
const { requiredSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();
const { removeOrder, updateOrderQuantity, addOrder, updateOrderStatus, getCurrentUserOrders, getAllUserOrders } = require('../controller/orderController');

router.post('/remove-order', requiredSignIn, removeOrder);
router.post('/add-order', requiredSignIn, addOrder);
router.put('/status-order', requiredSignIn, isAdmin, updateOrderStatus);
router.put('/update-order', requiredSignIn, updateOrderQuantity);
router.get('/all-order', requiredSignIn, isAdmin, getAllUserOrders);
router.get('/user-order', requiredSignIn, getCurrentUserOrders);

module.exports = router;
