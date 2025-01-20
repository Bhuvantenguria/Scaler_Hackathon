const userModel = require('../models/userModel');
const Order = require('../models/orderModel');
// const mongoose = require('mongoose');


const getCart = async (req, res) => {


    try {
        const userId = req.user._id;
        const curUser = await userModel.findById(userId);

        if (!curUser) {
            return res.status(404).send({
                success: false,
                message: 'User is not registered',
            });
        }

        const userCart = curUser.cart;

        return res.status(200).json(userCart);

    } catch (error) {
        console.error('Error fetching user cart:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
const updateCart = async (req, res) => {
    const { newCart } = req.body;
    console.log("yo yo");
    console.log(newCart);
    try {
        const userId = req.user._id;

        const curUser = await userModel.findById(userId);

        if (!curUser) {
            return res.status(404).json({
                success: false,
                message: 'User is not registered',
            });
        }

        curUser.cart = newCart;
        await curUser.save();

        return res.status(200).json({
            success: true,
            message: 'Cart updated successfully',
        });

    } catch (error) {
        console.error('Error updating user cart:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
const updateProfile = async (req, res) => {
    const { userId, name, email, password, phone, address, answer } = req.body;

    try {
        const curUser = await userModel.findById(userId);

        if (!curUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Update user profile information
        curUser.name = name || curUser.name;
        curUser.email = email || curUser.email;
        curUser.password = password || curUser.password; // You might want to hash the password here
        curUser.phone = phone || curUser.phone;
        curUser.address = address || curUser.address;
        curUser.answer = answer || curUser.answer;

        await curUser.save();

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
        });

    } catch (error) {
        console.error('Error updating user profile:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
const cartProduct = async (req, res) => {
    try {
        const userId = req.user._id;
        // if (!curUser) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'User not found',
        //     });
        // }


        const orders = await userModel.findById(userId)
            .populate('cart', '-photo');

        return res.status(200).json(orders);

    } catch (error) {
        console.error('Error fetching current user orders:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}



module.exports = { getCart, updateCart, updateProfile, cartProduct };