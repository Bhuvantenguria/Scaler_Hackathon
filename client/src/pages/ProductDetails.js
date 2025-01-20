import Layout from '../componenets/layout/Layout';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth'; // Import useAuth
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaRegStar, FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ProductCard from '../componenets/ProductCard';
import "../styles/Rating.css"

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth(); // Use auth context
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [rating, setRating] = useState(null);
  const [message, setMessage] = useState("");

  const handleClick = (value) => {
    setRating(value === rating ? null : value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/v1/product/add-product-rating', {
        message: message,
        rating: rating,
        productId: product._id,
      });

      console.log(response.data);
      toast.success("Rating added successfully");
    } catch (error) {
      toast.error("Rating not added");
    }
    setRating(null);
    setMessage("");
  };

  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product?._id, data?.product.category._id);
      fetchProductRating();
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductRating = async () => {
    const productId = product?._id;
    try {
      const response = await axios.get(`/api/v1/product/get-product-rating`, { params: { productId } });
      const { averageRating, messages } = response.data;
      setAverageRating(averageRating);
      setReviews(messages);
    } catch (error) {
      console.error("Error fetching product rating:", error);
    }
  };

  return (
    <Layout>
      <div className="product-details-container container">
        <div className="product-image-container">
          <img
            src={`https://yoy.onrender.com/api/v1/product/product-photo/${product?._id}`}
            alt={product.name}
            className="product-image"
          />
        </div>
        <div className="product-info-container">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : &#8377;{product.price * 100}</h6>
          <h6>Category : {product?.category?.name}</h6>
          {cart.includes(product._id) ? (
            <FaHeart
              style={{ fontSize: "28px", color: "red" }}
              onClick={() => {
                setCart(cart.filter(itemId => itemId !== product._id));
                toast.success("Item removed from the cart");
              }}
            />
          ) : (
            <CiHeart
              style={{ fontSize: "28px", color: "red" }}
              onClick={() => {
                setCart([...cart, product._id]);
                toast.success("Item added to the cart");
              }}
            />
          )}
          <button
            className="btn btn-success ms-2 buy-button"
            onClick={() => navigate(`/purchase/${product.slug}`)}
          >
            Buy
          </button>
        </div>
      </div>

      <hr />
      {auth?.user && (
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-12 mb-3">
              {[1, 2, 3, 4, 5].map((starValue) => (
                <span
                  key={starValue}
                  onClick={() => handleClick(starValue)}
                  style={{ cursor: "pointer", fontSize: "24px", marginRight: "0.5rem" }}
                >
                  {rating && starValue <= rating ? <FaStar color="#ffc107" /> : <FaRegStar color="#ffc107" />}
                </span>
              ))}
            </div>
            <div className="col-md-12 mb-3">
              <textarea
                className="form-control"
                placeholder="Enter your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="row container">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
        {reviews.length > 0 && (
          <div className="mt-4">
            <h5>Ratings and Messages:</h5>
            {reviews.map((item, index) => (
              <div key={index} className="review-card card">
                <div className="card-body">
                  <p className="card-text">
                    <strong>Rating:</strong> {renderStars(item.rating)}
                  </p>
                  <p className="card-text">
                    <strong>Message:</strong> {item.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <button onClick={() => { fetchProductRating(); }} className='btn btn-success ml-5 m-5'> Show Product Rating</button>
    </Layout>
  );
};

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= rating
        ? <FaStar key={i} color="#ffc107" />
        : <FaRegStar key={i} color="#ffc107" />
    );
  }
  return stars;
}

export default ProductDetails;
