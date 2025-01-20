import React, { useState, useEffect } from "react";
import Layout from "../componenets/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../componenets/ProductCard";
import "../styles/Search.css"
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {/* <div class="container"> */}
      <h4 class="text-center mt-5">Category - {category?.name}</h4>
      <h6 class="text-center">{products?.length} results found</h6>

      <div class="d-flex flex-wrap justify-content-center mt-4">
        {products?.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
      {/* </div> */}



    </Layout>
  );
};

export default CategoryProduct;