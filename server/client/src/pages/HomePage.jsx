import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Box } from "@mui/material";
import { Slider } from "@mui/material";
import HomeIntro from "../components/layout/HomeIntro";
import Card from "../components/Card";
function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const [value, setValue] = React.useState([0, 1000]);
  const [filterTimeout, setFilterTimeout] = useState(null);

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
    if (checked.length === 0 && value[0] === 0 && value[1] === 1000) {
      getAllProucts();
    }
  }, [checked, value]);

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

  useEffect(() => {
    filterProducts();
  }, [checked]);

  // const filter products
  const filterProducts = async (req, res) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/v1/product/product-filters`,
        { checked, value }
      );
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      console.log(error.message);
      toast.error("somethinh went wrong");
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Function to format the value with a dollar sign
  const valuetext = (value) => {
    return `$${value}`;
  };

  // Filter products with a delay
  const filterProductsWithDelay = (newValue) => {
    if (filterTimeout) {
      clearTimeout(filterTimeout); // Clear the previous timeout
    }

    // Set a new timeout to filter after 2000ms (2 seconds)
    const newFilterTimeout = setTimeout(() => {
      filterProducts(newValue);
    }, 2000);

    setFilterTimeout(newFilterTimeout);
  };

  // useEffect
  useEffect(() => {
    filterProductsWithDelay(value);
  }, [value]);

  return (
    <Layout title={"All Products - Best Offers"}>
      <HomeIntro />
      <div className="row mt-3">
        <div className="col-md-3">
          <h4 className="text-center">Fileter by categorty</h4>
          <div className="d-flex flex-column m-2">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                <h6>{c.name}</h6>
              </Checkbox>
            ))}
          </div>

          {/* price filter */}
          <h4 className="text-center mt-4">Fileter by Prices</h4>
          <div className="container">
            <Box sx={{ width: 300 }} className="w-100">
              <div className="d-flex flex-row  justify-align-align-content-between">
                <>
                  <p className="me-3 fw-bold">Low: ${value[0]}</p>
                  <Slider
                    className="me-3"
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={valuetext} // Use the valuetext function to format the label
                    min={0}
                    max={1000}
                    size="big"
                    sx={{
                      "& .MuiSlider-valueLabel": {
                        borderRadius: "50%", // Adjust the label border-radius
                        padding: "4px", // Adjust the padding for value label
                        fontSize: "15px",
                      },
                    }}
                  />
                  <p className="fw-bold">High: ${value[1]}</p>
                </>
              </div>
            </Box>
          </div>

          <div className="d-flex flex-column m-2 w-75">
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
              <Card p={p} key={p._id} />
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
