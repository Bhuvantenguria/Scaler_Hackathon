const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
    }],
    userId: {  // Corrected field name from productId to userId
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    deliverystatus: {

        type: String,
        default: "On the Way",
        enum: ["On the Way", "Delievered", "cancel"],
    },
    address: {
        type: String,
        required: true,

    },
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
    delivery: {
        type: Date,  // Corrected syntax for the Date type
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('order', orderSchema);
