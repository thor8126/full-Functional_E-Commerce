import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/category/get-category`
      );
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

  // get all products
  const getAllProucts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error("something went wrong");
    }
  };
  // lifecycle method
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProucts();
  }, [checked.length, radio.length]);

  // getTotal count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // fileter by categories
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // const filter products
  const filterProducts = async (req, res) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      console.log(data?.products);
      setProducts(data?.products);
    } catch (error) {
      console.log(error.message);
      toast.error("somethinh went wrong");
    }
  };

  // useEffect
  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="row mt-3">
        <div className="col-md-3">
          <h4 className="text-center">Fileter by categorty</h4>
          <div className="d-flex flex-column m-2">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Fileter by Prices</h4>
          <div className="d-flex flex-column m-2">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column m-2 w-50">
            <button
              type="button"
              className="btn btn-primary flex-fill me-1 w-75"
              data-mdb-ripple-color="dark"
              onClick={() => window.location.reload()}
            >
              Reset Filter
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap justify-content-around">
            {products?.map((p) => (
              <div className="mb-4 mx-3 " key={p._id}>
                <div className="card mb-2" style={{ width: "18rem" }}>
                  <div className="d-flex justify-content-between p-3">
                    <p className="lead mb-0">{p.name}</p>
                  </div>
                  <img
                    src={`${
                      import.meta.env.VITE_APP_API
                    }/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top rounded-3"
                    alt={p.name}
                    height={"270px"}
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <p className="small">
                        <a href="#!" className="text-muted">
                          {p.category.name}
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
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length > 0 && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
