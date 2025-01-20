const userModel = require('../models/userModel');
const Order = require('../models/orderModel');
// const mongoose = require('mongoose');
const addOrder = async (req, res) => {
    const { productId, quan, address } = req.body;

    try {
        userId = req.user._id;
        const curUser = await userModel.findById(userId);

        if (!curUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 7);

        const newOrder = new Order({
            userId: userId,
            productId: productId,
            delivery: deliveryDate,
            quantity: quan,
            address: address,
        });

        await newOrder.save();

        curUser.ordered.push(newOrder);
        await curUser.save();

        return res.status(200).json({
            success: true,
            message: 'Order added successfully',
        });

    } catch (error) {
        console.error('Error adding user order:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};


const removeOrder = async (req, res) => {
    const { orderId } = req.body;
    console.log(orderId);
    console.log(req.body);
    console.log("yese");
    try {
        auserid = req.user._id;
        // console.log(orderId);
        const orderToRemove = await Order.findById(orderId);

        if (!orderToRemove) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        const usercall = await userModel.findById(auserid);

        const userId = orderToRemove.userId;
        const curUser = await userModel.findById(req.user._id);

        if (!curUser) {
            return res.status(404).json({
                success: false,
                message: 'User nojbjt found',
            });
        }

        if (usercall._id.equals(userId) || usercall.role === 1) {
            orderToRemove.status = "cancel";
            orderToRemove.deliverystatus = "cancel";
            await orderToRemove.save();

            curUser.ordered = curUser.ordered.filter(order => order._id.toString() !== orderId);
            await curUser.save();

            return res.status(200).json({
                success: true,
                message: 'Order cancelled successfully',
            });
        }

        return res.status(403).json({
            success: false,
            message: 'Unauthorized to cancel this order',
        });

    } catch (error) {
        console.error('Error cancelling order:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};




const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;

    try {
        const orderToUpdate = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );






        return res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
        });

    } catch (error) {
        console.error('Error updating order status:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
const getAllUserOrders = async (req, res) => {

    try {


        const allOrders = await Order.find({})
            .populate("productId", "-photo")
            .populate("userId")
            .sort({ createdAt: "-1" });;
        console.log(allOrders);

        return res.status(200).json(allOrders);

    } catch (error) {
        console.error('Error fetching all user orders:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
const getCurrentUserOrders = async (req, res) => {
    const { userId } = req.body;
    // console.log(req.user._id)
    try {
        const curUser = await userModel.findById(req.user._id);

        if (!curUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }


        const orders = await Order.find({ userId: req.user._id })
            .populate('productId', '-photo')
            .populate('userId').sort({ createdAt: 'desc' });

        return res.status(200).json(orders);

    } catch (error) {
        console.error('Error fetching current user orders:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const updateOrderQuantity = async (req, res) => {
    const { userId, orderId, newQuantity } = req.body;

    try {
        const curUser = await userModel.findById(userId);
        const curOrder = await Order.findById(orderId);

        if (!curUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Check if the order belongs to the current user
        if (curOrder.userId.toString() !== userId) {
            return res.status(404).json({
                success: false,
                message: 'Order not found for the current user',
            });
        }

        // Update the order quantity
        curOrder.quantity = newQuantity;
        await curOrder.save();

        return res.status(200).json({
            success: true,
            message: 'Order quantity updated successfully',
        });

    } catch (error) {
        console.error('Error updating order quantity:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};



module.exports = { removeOrder, addOrder, updateOrderStatus, getAllUserOrders, getCurrentUserOrders, updateOrderQuantity };