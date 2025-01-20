import React, { useState } from 'react';
import Layout from '../../componenets/layout/Layout';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/Login.css";
import "../../styles/AuthStyle.css";

const ForgotPasssword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Forgot Password - Ecommerce APP"}>
      <h1 className="title">RESET PASSWORD</h1>
      <div className="login-form-container">
        <div className="login-form-image">
          <img src="https://img.freepik.com/premium-photo/online-shopping-concept-web-mobile-application-ecommerce-smartphone-with-shopping-cart-shopping-bag-yellow-background-3d-rendering_20693-1081.jpg" alt="Forgot Password" />
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <h4 className="title-in">RESET PASSWORD</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control form-control-login"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control form-control-login"
              id="exampleInputEmail1"
              placeholder="Enter Your favorite Sport Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control form-control-login"
              id="exampleInputPassword1"
              placeholder="Enter Your New Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary login-btn">
            RESET
          </button>
          <div>
            <p className="create-account-forgot">Remembered your password? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPasssword;
