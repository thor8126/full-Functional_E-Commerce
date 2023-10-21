import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";
const ProductDetail = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduts, setRelatedProduts] = useState([]);
  const navigate = useNavigate();
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
            alt={product.name}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center mb-3">Product Details</h1>
          <div className="d-flex  ">
            <p>Name : </p>
            <h5> {product?.name}</h5>
          </div>
          <div className="d-flex  ">
            <p>Description : </p>
            <h5> {product?.description}</h5>
          </div>
          <div className="d-flex ms-1">
            <h5 className="text-dark  fs-4">${product.price}</h5>
            <p className="small text-secondary ms-3">
              <s className="fs-5">${product.price + product.price * 0.5}</s>
            </p>
          </div>
          <div className="d-flex ms-1">
            <p>Category : </p>
            <h5>{product?.category?.name}</h5>
          </div>
          <div className="d-flex ms-1"></div>
          <div>
            {product.size ? (
              <div className="d-flex  ">
                <p>Size: </p>
                <h5> {JSON.parse(product.size).join(",  ")}</h5>
              </div>
            ) : (
              <p>No sizes available</p>
            )}
          </div>
          <div>
            {product.colors ? (
              <div className="d-flex  ">
                <p>Size: </p>
                <h5> {JSON.parse(product.colors).join(",  ")}</h5>
              </div>
            ) : (
              <p>No sizes available</p>
            )}
          </div>

          <button
            type="button"
            className="btn btn-secondary flex-fill ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("item added To Cart");
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
            <div className="mb-4 mx-2" key={p._id}>
              <div className="card mb-2" style={{ width: "18rem" }}>
                <div className="d-flex justify-content-between p-3">
                  <p className="lead mb-0">{p.name}</p>
                </div>
                <img
                  src={`${
                    import.meta.env.VITE_APP_API
                  }/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  height={"250px"}
                />
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <p className="small">
                      <a href="#!" className="text-muted">
                        {p.name}
                      </a>
                    </p>
                    <p className="small text-danger">
                      <s>${p.price + p.price * 0.5}</s>
                    </p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="mb-0">{p.description}</h5>
                    <h5 className="text-dark mb-0">${p.price}</h5>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <p className="text-muted mb-0">
                      Available: <span className="fw-bold">{p.quantity}</span>
                    </p>
                  </div>
                  <div className="d-flex flex-row">
                    <button
                      type="button"
                      className="btn btn-primary flex-fill me-1"
                      data-mdb-ripple-color="dark"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary flex-fill ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("item added To Cart");
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
