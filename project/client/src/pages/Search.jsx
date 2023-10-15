import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/Search";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const { values, setvalues } = useSearch();
  const navigate = useNavigate();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results?.length < 1
              ? "No Products Found"
              : `Found ${values?.results?.length}`}
          </h6>
          <div className="d-flex flex-wrap justify-content-around mt-4">
            {values?.results?.map((p) => (
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
        </div>
      </div>
    </Layout>
  );
};

export default Search;
