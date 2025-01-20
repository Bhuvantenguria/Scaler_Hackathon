import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/ProductCard.css";
import { useCart } from '../context/cart';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { FaRegStar, FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
    const [auth] = useAuth();
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const isProductInCart = cart.includes(product._id);

    const handleHeartClick = () => {
        if (!auth?.user) {
            navigate('/register');
        } else {
            if (isProductInCart) {
                setCart(cart.filter(itemId => itemId !== product._id));
                toast.success("Item removed from the cart");
            } else {
                setCart([...cart, product._id]);
                toast.success("Item added to the cart");
            }
        }
    };

    return (
        <div className="scard">
            <img
                src={`https://yoy.onrender.com/api/v1/product/product-photo/${product._id}`}
                alt="Card"
                className="scard-image"
            />
            {/* Star rating */}
            <div className="star">
                <FaStar style={{ marginRight: '5px', color: "#FFD700" }} />
                <FaStar style={{ marginRight: '5px', color: "#FFD700" }} />
                <FaStar style={{ marginRight: '5px', color: "#FFD700" }} />
                <FaStar style={{ marginRight: '5px', color: "#FFD700" }} />
                <FaStar style={{ color: "#FFD700" }} />
            </div>
            {/* Card body */}
            <div className='scard-body'>
                <div className='details'>
                    <h5>{product.name}</h5>
                    <p>&#8377;{product.price * 100}</p>
                </div>
                <div className='product-price'>
                    {/* Favourite button */}
                    {auth?.user ? (
                        isProductInCart ? (
                            <FaHeart style={{ fontSize: "22px", color: "red" }} onClick={handleHeartClick} />
                        ) : (
                            <CiHeart style={{ fontSize: "22px", color: "red" }} onClick={handleHeartClick} />
                        )
                    ) : (
                        <CiHeart style={{ fontSize: "22px", color: "red" }} onClick={handleHeartClick} />
                    )}
                </div>
            </div>
            {/* Quick view button */}
            <button className="quick-view-btn" onClick={() => navigate(`/product/${product.slug}`)}>
                Quick view
            </button>
        </div>
    );
};

export default ProductCard;
