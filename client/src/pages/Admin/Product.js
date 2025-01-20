import React, { useState, useEffect } from "react";

import Layout from '../../componenets/layout/Layout';
import AdminMenu from '../../componenets/layout/AdminMenu';
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "./Product.css"
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="mt-5 row dashboard" style={{ alignItems: 'flex-start' }}>
        <div className="col-md-3 mt-5" >
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (

              <div className="card m-2" style={{ width: "18rem", border: "1px solid lightgrey" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <button className="btn btn btn-outline" onClick={() => { window.location.href = `/dashboard/admin/product/${p.slug}` }}>Update</button>
                </div>
              </div>


            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;