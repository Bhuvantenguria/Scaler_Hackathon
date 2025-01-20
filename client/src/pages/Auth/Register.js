import React, { useState } from 'react';
import Layout from '../../componenets/layout/Layout';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/Register.css"; // Make sure this path is correct

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    answer: ""
  });

  const navigate = useNavigate();

  const handleNextStep = () => {
    if (step === 1 && (!formData.name || !formData.email)) {
      toast.error("Please fill in all fields");
      return;
    } else if (step === 2 && (!formData.phone || !formData.address)) {
      toast.error("Please fill in all fields");
      return;
    } else if (step === 3 && (!formData.password || !formData.confirmPassword || !formData.answer)) {
      toast.error("Please fill in all fields");
      return;
    }

    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post(`/api/v1/auth/register`, formData);
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
  const steps = ["Personal", "Contact", "Password"];

  return (
    <Layout title="Register - Ecommerce App">
      <h1 className="register-form-title">Register Form</h1>
      <div className="register-form-container">
        <div className="register-form-image">
          <img src="https://img.freepik.com/premium-photo/online-shopping-concept-web-mobile-application-ecommerce-smartphone-with-shopping-cart-shopping-bag-yellow-background-3d-rendering_20693-1081.jpg" alt="Registration" />
        </div>
        <form onSubmit={handleSubmit} className="register-form">

          <div className="register-steps">
            <hr className='line-connect' />
            {steps.map((title, num) => (

              <div
                key={num}

              >
                <div className={`step-title ${step == num + 1 ? 'active-title' : ''}`}>{title}</div>
                <div className={`register-step ${step >= num + 1 ? 'active' : ''}`}
                  onClick={() => setStep(num)}>
                  {num + 1}</div>


              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="register-form-step">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Your Name"
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Your Email"
                  required
                />
              </div>
              <button type="button" className="btn btn-primary" onClick={handleNextStep}>
                Next
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="register-form-step">
              <div className="form-group">
                <input
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Your Phone"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Your Address"
                  required
                />
              </div>
              <div className="register-button">
                <button type="button" className="btn btn-secondary" onClick={handlePreviousStep}>
                  Previous
                </button>
                <button type="button" className="btn btn-primary" onClick={handleNextStep}>
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="register-form-step">
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Your Password"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Confirm Your Password"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="answer"
                  value={formData.answer}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="What is Your Favorite Sport"
                  required
                />
              </div>
              <div className="register-button">
                <button type="button" className="btn btn-secondary" onClick={handlePreviousStep}>
                  Previous
                </button>
                <button type="submit" className="btn btn-success">
                  Register
                </button>
              </div>

            </div>
          )}
          <div>
            <p className="create-account-link">Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
