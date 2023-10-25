import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocalCart } from "../context/Cart";
import toast from "react-hot-toast";
import Card from "../components/Card";

const ProductDetail = () => {
  const { cart, setCart } = useLocalCart();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduts, setRelatedProduts] = useState([]);
  const navigate = useNavigate();
  // aaded to cart
  const addToCart = (p) => {
    let newItem = [];
    if (!cart.length) {
      newItem.push({ ...p, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(newItem));
      setCart(newItem);
      return;
    }
    newItem = cart;
    const existingItem = cart.filter((item) => item._id === p._id);
    // console.log(existingItem);

    if (existingItem && existingItem.length !== 0) {
      const updatedItem = existingItem[0];
      updatedItem.quantity += 1;
      const index = newItem.findIndex((item) => item._id === p._id);
      newItem[index] = updatedItem;
      setCart(newItem);
    } else {
      // If the item doesn't exist, add it with quantity 1
      newItem.push({ ...p, quantity: 1 });
      setCart(newItem);
    }
    // Update the cart in local storage
    localStorage.setItem("cart", JSON.stringify(newItem));
    toast.success("Item added to cart");
  };
  // initials p details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/get-product/${
          params.slug
        }`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  let size = product?.size;
  let colors = product?.colors;
  if (size || colors) {
    colors = colors.replace(/"/g, "");
    colors = colors.split("-");
    size = size.replace(/"/g, "");
    size = size.split("-");
  }

  // get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_API
        }/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container mt-5">
        <div className="col-md-5">
          <img
            src={`${
              import.meta.env.VITE_APP_API
            }/api/v1/product/product-photo/${product._id}`}
            className="card-img-top rounded-3 w-75"
            alt={product?.name}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center mb-3">Product Details</h1>
          <div className="d-flex  ">
            <p>Name : </p>
            <h5 className=" ms-2"> {product?.name}</h5>
          </div>
          <div className="d-flex  ">
            <p>Brand : </p>
            <h5 className=" ms-2"> {product?.brand}</h5>
          </div>
          <div className="d-flex  ">
            <p>Description : </p>
            <h5 className=" ms-2"> {product?.description}</h5>
          </div>
          <div className="d-flex ms-1">
            <p>Price: </p>
            <h5 className="text-dark ms-2  fs-4">${product.price}</h5>
            <p className="small text-secondary ms-3">
              <s className="fs-5">${product.price + product.price * 0.5}</s>
            </p>
          </div>
          <div className="d-flex ms-1">
            <p>Category : </p>
            <h5 className=" ms-2">{product?.category?.name}</h5>
          </div>
          <div className="d-flex ms-1"></div>
          <div>
            {product.size ? (
              <div className="d-flex  ">
                <p>Size: </p>
                <h5 className=" ms-2"> {size.join(", ")}</h5>
              </div>
            ) : (
              <p>No sizes available</p>
            )}
          </div>
          <div>
            {product.colors ? (
              <div className="d-flex  ">
                <p>Colors: </p>
                <h5 className=" ms-2"> {colors.join(", ")}</h5>
              </div>
            ) : (
              <p>No sizes available</p>
            )}
          </div>

          <button
            type="button"
            className="btn btn-secondary flex-fill ms-1"
            onClick={() => {
              addToCart(product);
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
      <div className="row text-center container-fluid mt-5">
        <h3 className="mb-5">similar products</h3>
        {relatedProduts.length < 1 && (
          <h5 className="text-center">No Similar Products</h5>
        )}
        <div className="d-flex flex-wrap justify-content-around ">
          {relatedProduts?.map((p) => (
            <Card p={p} key={p._id} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
