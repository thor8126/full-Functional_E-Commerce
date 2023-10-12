import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "./css/product.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  // get all products
  const getAllProucts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/get-products`
      );
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("somethinh went wrong");
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllProucts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Product List</h1>
          <section style={{ backgroundColor: "#eee" }}>
            <div className="container py-5">
              <div className="row">
                {products?.map((p) => (
                  <div className="col-md-6 col-lg-4 mb-4 mb-md-0" key={p._id}>
                    <Link
                      to={`/dashboard/admin/product/${p?.slug}`}
                      className="LinkCssremove"
                    >
                      <div className="card mb-2">
                        <div className="d-flex justify-content-between p-3">
                          <p className="lead mb-0">{p.name}</p>
                        </div>
                        <img
                          src={`${
                            import.meta.env.VITE_APP_API
                          }/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
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
                              Available:{" "}
                              <span className="fw-bold">{p.quantity}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
