import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/Search";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
const Search = () => {
  const { values } = useSearch();
  const navigate = useNavigate();

  return (
    <Layout title={"Search results"}>
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl">Search Results</h1>
          <h6>
            {values?.results?.length < 1
              ? "No Products Found"
              : `Found ${values?.results?.length}`}
          </h6>
          <div className="flex flex-wrap justify-center mt-4">
            {values?.results?.map((p) => (
              <div className="mb-4 mx-3" key={p._id}>
                <div className="bg-white shadow-md w-72">
                  <div className="p-3">
                    <p className="text-lg mb-0">{p.name}</p>
                  </div>
                  <img
                    src={`${
                      import.meta.env.VITE_APP_API
                    }/api/v1/product/product-photo/${p._id}`}
                    className="rounded-md"
                    alt={p.name}
                    height={"270px"}
                  />
                  <div className="p-3">
                    <div className="flex justify-between">
                      <p className="text-sm">
                        <a href="#!" className="text-gray-500">
                          {p.category.name}
                        </a>
                      </p>
                      <p className="text-sm text-red-500">
                        <s>${(p.price + p.price * 0.5).toFixed(2)}</s>
                      </p>
                    </div>
                    <div className="flex justify-between mb-3">
                      <h5 className="mb-0 text-gray-800">{p.description}</h5>
                      <h5 className="mb-0 text-gray-800">
                        ${p.price.toFixed(2)}
                      </h5>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p className="text-gray-500 mb-0">
                        Available:{" "}
                        <span className="font-semibold">{p.quantity}</span>
                      </p>
                    </div>
                    <div className="flex flex-row">
                      <button
                        type="button"
                        className="bg-blue-500 text-white w-1/2 me-1 py-2 rounded-md"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        type="button"
                        className="bg-gray-500 text-white w-1/2 ms-1 py-2 rounded-md"
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
      <Link to="/">
        <button
          type="button"
          className="bg-black text-white px-4 py-2 rounded absolute bottom-4 left-1/2 transform -translate-x-1/2 hover:bg-gray-900"
        >
          <AiOutlineArrowLeft />
        </button>
      </Link>
    </Layout>
  );
};

export default Search;
