import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Card from "../../components/Card";

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
            <div className="container py-5 w-100">
              <div className="d-flex flex-wrap justify-content-around">
                {products?.map((p) => (
                  <div className="mb-4 mx-2" key={p._id}>
                    <Link
                      to={`/dashboard/admin/product/${p?.slug}`}
                      className="LinkCssremove"
                    >
                      <Card p={p} Admin={"true"}  />
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
