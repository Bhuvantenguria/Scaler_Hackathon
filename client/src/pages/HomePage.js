import React, { useState, useEffect } from "react";
import Layout from "../componenets/layout/Layout";
import { useNavigate, Link } from "react-router-dom";
import ProductCard from "../componenets/ProductCard";
import "../styles/HomePage.css"
import axios from "axios";
import car from "../assets/car.png";
import money from "../assets/money.png";
import card from "../assets/card.png";
import call from "../assets/call.png";
import { Checkbox, Radio } from "antd";
import { Image, Collapse, Button } from 'react-bootstrap';

import { Prices } from "../componenets/Prices";
import Banner from "../componenets/Banner";
import { useCart } from "../context/cart";
import BannerData from "../Object/BannerData";
const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [open, setOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);


  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const handleSortChange = (value) => {
    setSortOrder(value);
    // Additional logic based on the selected sorting option
  };
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const clearFilters = () => {
    setChecked([]);
    setRadio([]);
    setOpen(false);
  }
  const handleFilter = (value, id) => {
    if (id == null) {

      setChecked([]);
    }
    else {
      let all = [id];

      setChecked(all);
    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  const [currentIndexb, setCurrentIndexvb] = useState(0);

  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "10vw",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };

  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "10vw",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndexb === 0;
    const newIndex = isFirstSlide ? BannerData.length - 1 : currentIndexb - 1;
    setCurrentIndexvb(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndexb === BannerData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndexb + 1;
    setCurrentIndexvb(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndexvb(slideIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(goToNext, 2000); // Change image every 3 seconds
    return () => clearInterval(intervalId);
  }, [currentIndexb]);


  return (
    <>

      {/* <Image src="/images/homebg.jpg" width={100} height={200} fluid rounded /> */}


      <Layout title={"ALl Products - Best offers "}>
        <div className="banners">
          <div onClick={goToPrevious} style={leftArrowStyles}>
            ❰
          </div>
          <div onClick={goToNext} style={rightArrowStyles}>
            ❱
          </div>
          {BannerData.map((banner, index) => (
            <div key={banner.id} style={{ display: index === currentIndexb ? "block" : "none" }}>
              {/* Render your banner content here */}
              <div className="banner-content">
                <div className="banner-text">
                  <h2>{banner.title}</h2>
                  <p>{banner.details}</p>
                </div>
                <img src={banner.bannerImage} alt={banner.title} />

              </div>

            </div>

          ))}
        </div>


        <div className="homepage-sections">
          <div className="row align-items-center">
            <div className="col text-center">
              <div className="custom-card">
                <img className="category-img" src="/images/girl.jpg" alt="Womens Image" />
                <div className="card-body">
                  <h5 className="card-title text-overlay">Womens <br /> Collection</h5>
                  <Link to="/categories" className="shop-now">Shop Now</Link>
                </div>
              </div>
            </div>
            <div className="col text-center">
              <div className="custom-card category-card" >
                <img className="category-img" src="/images/men.webp" alt="Mens Image" />
                <div className="card-body">
                  <h5 className="card-title text-overlay">Mens<br /> Collection</h5>
                  <Link to="/categories" className="shop-now">Shop Now</Link>
                </div>
              </div>
            </div>
            {/* Repeat similar structure for Womens and Childrens */}

            <div className="col text-center">
              <div className="custom-card">
                <img className="category-img" src="/images/accesssories.webp" alt="Childrens Image" />
                <div className="card-body">
                  <h5 className="card-title text-overlay">Accesories </h5>
                  <Link to="/categories" className="shop-now">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>


          <div className="custom-container Filter-section navbar navbar-expand-lg shadow-none">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#filter" aria-controls="filter" aria-expanded="false" aria-label="Toggle navigation">
              <span>Filters </span>
            </button>
            <div className="custom-container collapse navbar-collapse column" id="filter">
              <div className="filter-category">            <span
                className={`custom-heading ${checked.length === 0 ? 'text-dark' : ''}`}
                onClick={() => handleFilter(!checked.includes(null), null)}
              >
                All Products
              </span>

                {categories?.map((c) => (
                  <span
                    key={c._id}
                    className={`custom-category ${checked.includes(c._id) ? 'text-dark' : ''}`}
                    onClick={() => handleFilter(!checked.includes(c._id), c._id)}
                  >
                    {c.name}
                  </span>
                ))}
              </div>
              <div className="filter-button">
                <button
                  className="custom-button btn btn-outline-primary"
                  onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                >
                  {open ? '🔦 Hide Filters' : ' 🔦Show Filters'}
                </button>

                {open && (
                  <div>
                    {/* Your filter input components or any additional content goes here */}
                  </div>
                )}

                <button
                  className="btn btn btn-outline-danger rounded custom-reset-button"
                  onClick={() => clearFilters()}
                >
                  ↻ RESET FILTERS
                </button>
              </div>
            </div>

            {/* //dem0 */}</div>
          <div className=" menu-filter mt-3">

            <Collapse in={open} className="collapse-filter">
              <div id="example-collapse-text filters filter-sh" className="col-md-5 center">
                <div className="filters">
                  <div className="d-flex flex-column filter-price">
                    <h2>Prices</h2>
                    <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                      {Prices?.map((p) => (
                        <div key={p._id}>
                          <Radio value={p.array}>{p.name}</Radio>
                        </div>
                      ))}
                    </Radio.Group>
                  </div>
                  <div className="d-flex flex-column filter-sort">
                    <h2 className="sort-label">Sort by</h2>
                    <Radio.Group onChange={(e) => setSortOrder(e.target.value)}>
                      <div>
                        <Radio className="sort-radio" value="default">Default</Radio>
                      </div>
                      <div>
                        <Radio className="sort-radio" value="highToLow">High to Low</Radio>
                      </div>
                      <div>
                        <Radio className="sort-radio" value="lowToHigh">Low to High</Radio>
                      </div>
                    </Radio.Group>
                  </div>
                </div>
              </div>
            </Collapse>


          </div>
          {/* price filter */}


          {/* <div className=" col-md-9"> */}
          {/* <h1 className="text-center">All Products</h1> */}
          <div className="d-flex flex-wrap products-section">

            {products?.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
          <div className="loadmore-section p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>

          {/* </div> */}

        </div>
        <section className="facility__section section" id="facility">
          <div className="container">
            <div className="facility__container" data-aos="fade-up" data-aos-duration={1200}>
              <div className="facility__box">
                <div className="facility-img__container">
                  <img src={car} alt="Car icon" />
                </div>
                <p>FREE SHIPPING WORLDWIDE</p>
              </div>
              <div className="facility__box">
                <div className="facility-img__container">
                  <img src={money} alt="Money icon" />
                </div>
                <p>100% MONEY BACK GUARANTEE</p>
              </div>
              <div className="facility__box">
                <div className="facility-img__container">
                  <img src={card} alt="Card icon" />
                </div>
                <p>MANY PAYMENT GATEWAYS</p>
              </div>
              <div className="facility__box">
                <div className="facility-img__container call">
                  <img src={call} alt="Call icon" />
                </div>
                <p>24/7 ONLINE SUPPORT</p>
              </div>
            </div>
          </div>
        </section>


      </Layout >
    </>
  );
};

export default HomePage;
