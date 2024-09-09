const mongoose = require('mongoose');
const Product = require('./Models/Product');

const products = [
    {
        
        name: 'Laptop',
        img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D',
        price: 35000,
        desc: '8GB RAM and 512GB SSD'
    },
    {
        name: 'I-Phone',
        img: 'https://images.unsplash.com/photo-1695048065127-fbee942eed2e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aXBob25lJTIwMTV8ZW58MHx8MHx8fDA%3D%3D',
        price: 99000,
        desc: '1TB internal storage'
    },
    {
        name: 'Headphones',
        img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D',
        price: 1200,
        desc: 'sound that matters'
    },
    {
        name: 'Wireless Earphones',
        img: 'https://images.unsplash.com/photo-1655804446276-7699884b469b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2lyZWxlc3MlMjBlYXJwaG9uZXxlbnwwfHwwfHx8MA%3D%3D',
        price: 800,
        desc: 'Best for not to indulge in outside matters'
    },
    {
        name: 'T-shirts',
        img: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D',
        price: 300,
        desc: 'wear comfort'
    }
];

async function seedDB() {
    try {
        
        await Product.deleteMany({}); // Clear existing data
        const insertedProducts = await Product.insertMany(products);
        console.log('Seeding successful:', insertedProducts.length, 'products inserted.');
    } catch (error) {
        console.error('Seeding error:', error);
    }
}

module.exports = seedDB;
