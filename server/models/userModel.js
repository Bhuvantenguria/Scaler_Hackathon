const mongoose = require('mongoose');
const orderModel = require('./orderModel');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        // require:true,
    },
    // answer:{
    //      type:String,
    //      require:true,
    // },
    role: {
        type: Number,
        default: 0
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
    }],
    ordered: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        required: true,
    }
    ],
    isActive: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })


module.exports = mongoose.model('users', userSchema);