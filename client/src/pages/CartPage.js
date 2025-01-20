import React, { useState, useEffect } from "react";
import Layout from "./../componenets/layout/Layout";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/cart';

import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [cart, setCart] = useCart();

  const [auth] = useAuth();
  const [setCard, setSetCard] = useState([]);
  const navigate = useNavigate();
  const fetchCardData = async () => {
    try {
      const response = await axios.get("/api/v1/user/cart-product");
      console.log(response);
      setSetCard(response.data.cart);
      console.log(setCard);
      console.log(typeof setCard);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  };
  useEffect(() => {


    fetchCardData();
  }, []); // Run only once on component mount


  const totalPrice = () => {
    try {
      let total = 0;
      setCard?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCardItem = (pid) => {
    try {
      let myCard = [...setCard];
      setCart(cart.filter(itemId => itemId !== pid));

      let index = myCard.findIndex((item) => item._id === pid);
      myCard.splice(index, 1);
      setSetCard(myCard);
      // localStorage.setItem("setCard", JSON.stringify(myCard));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="card-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {setCard?.length
                  ? `You Have ${setCard.length} items in your card ${auth?.token ? "" : "please login to checkout !"
                  }`
                  : " Your Card Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-7 p-0 m-0">
              {setCard?.map((p) => (
                <div className="row setCard flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price : {p.price}</p>
                  </div>
                  <div className="col-md-4 card-remove-btn">
                    <button
                      className="btn btn-danger asd"
                      onClick={() => removeCardItem(p._id)}
                    >
                      Remove
                    </button>

                    <button
                      className="btn btn-danger asd"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      View
                    </button>
                  </div>

                </div>
              ))}
            </div>
            <div className="col-md-5 card-summary">
              <h2>Card Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>

                </>
              ) : (
                <div className="mb-3">
                  {!(auth?.token) ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => fetchCardData()} // Remove the extra ")"
                    >
                      Update Address uh
                    </button>

                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => fetchCardData()} // Remove the extra ")"
                    >
                      Update Address j
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!auth?.token || !setCard?.length ? (
                  ""
                ) : (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/dashboard/user/orders")}
                    >
                      Checkout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div >
    </Layout>
  );
};

export default CartPage;
