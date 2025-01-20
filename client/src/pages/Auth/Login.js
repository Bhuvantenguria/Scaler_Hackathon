import React, { useState } from "react";
import Layout from '../../componenets/layout/Layout'
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/Login.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const googlesign = () => {
    window.open("http://localhost:8080/auth/google/callback", "_self")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - Ecommer App">
      <h1 className="title">LOGIN FORM</h1>
      <div className="login-form-container">
        <div className="login-form-image">
          <img src="https://img.freepik.com/premium-photo/online-shopping-concept-web-mobile-application-ecommerce-smartphone-with-shopping-cart-shopping-bag-yellow-background-3d-rendering_20693-1081.jpg" alt="Registration" />
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <h4 className="title-in">LOGIN</h4>

          <div className="mb-3">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" form-control form-control-login"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control form-control-login"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>


          <button type="submit" className="btn btn-primary login-btn">
            LOGIN
          </button>
          <div>
            <p className="create-account-link forgotten"><Link to="/forgot-password">Forgotten Password ?</Link></p>
            <p className="create-account-link">Don't have an account? <Link to="/register">Create</Link></p>
          </div>
        </form>

        {/* <button type="submit" className="btn btn-primary login" onClick={googlesign}>
          Google
        </button>
           <div className="mb-3">
            <button
              type="button"
              className="btn forgot-password-btn"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div> */}
      </div>

    </Layout>
  );
};

export default Login;
