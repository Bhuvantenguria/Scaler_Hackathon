import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from '../componenets/layout/Layout';
import "../styles/Purchase.css";

const Purchase = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [address, setAddress] = useState("");

    let maxQuantity = 12;

    useEffect(() => {
        if (params?.slug) {
            getProduct();
        }
    }, [params?.slug]);

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/get-product/${params.slug}`
            );
            setProduct(data?.product);
            maxQuantity = data?.product.quantity || maxQuantity;
        } catch (error) {
            console.log(error);
        }
    };

    const increaseQuantity = () => {
        if (quantity < maxQuantity) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handlePurchase = async () => {
        const quan = quantity
        try {
            const response = await axios.post('/api/v1/order/add-order', {
                address,
                quan,
                productId: product._id,
            });
            navigate(`/dashboard/user/orders`);


            // Handle success (e.g., show a success message, redirect, etc.)
            console.log(response.data);
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Error making purchase:', error);
        }
    };

    return (
        <Layout>
            <div className="purchase-container">
                <div className="product-details card">
                    <div className="product-image-details">
                        <img
                            src={`https://yoy.onrender.com/api/v1/product/product-photo/${product?._id}`}
                            alt={product.name}
                            className="product-image"
                        />
                        <div className="product-info">
                            <h1 className="card-title">Product Details</h1>
                            <h6 className="card-subtitle mb-2 text-muted">Name: {product.name}</h6>
                            <h6 className="card-text">Description: {product.description}</h6>
                            <h6 className="card-text">Price: ${product.price}</h6>
                            <h6 className="card-text">Category: {product?.category?.name}</h6>
                        </div>
                    </div>
                </div>
                <div className="purchase-controls card">
                    <div className="card-body">
                        <div className="quantity-controls">
                            <button className="btn btn-secondary" onClick={decreaseQuantity}>-</button>
                            <span className="quantity">{quantity}</span>
                            <button className="btn btn-secondary" onClick={increaseQuantity}>+</button>
                        </div>
                        <div className="address mt-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your address"
                                value={address}
                                onChange={handleAddressChange}
                            />
                        </div>
                        <div className="price mt-3">
                            Total Price: ${quantity * product.price}
                        </div>
                        <button className="btn btn-success mt-3" onClick={handlePurchase}>Purchase</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Purchase;
