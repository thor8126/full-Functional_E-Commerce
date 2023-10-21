import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShoeColor, ShoeSize, brands } from "../../components/material";
import CreatableSelect from "react-select/creatable";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState("");
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [brand, setBrand] = useState("");
  const [isAvailable, setIsAvailable] = useState("false");

  const categoryOptions = categories?.map((category) => ({
    label: category.name,
    value: category.name,
    id: category._id,
  }));

  const colorOptions = ShoeColor.map((color, index) => ({
    label: color,
    value: color,
    id: index, 
  }));

  const sizeOptions = ShoeSize.map((size, index) => ({
    label: size.toString(),
    value: size,
    id: index, 
  }));
  const brandOptions = brands.map((brand, index) => ({
    label: brand,
    value: brand,
    id: index, 
  }));
  // for availabe or not
  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];
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
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const sizeValues = sizes.map((size) => size);
      const colorValues = colors.map((color) => color);
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("photo", photo);
      productData.append("category", category.id);
      productData.append("brand", brand);
      productData.append("size", JSON.stringify(sizeValues));
      productData.append("colors", JSON.stringify(colorValues));

      productData.append("shipping", shipping === "yes" ? true : false);
      productData.append("isAvailable", isAvailable === "yes" ? true : false);
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success(`${data?.message}`);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  return (
    <Layout title={"DashBoard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>CreateProduct</h1>
            <div className="m-1 w-75">
              {/* category */}

              <CreatableSelect
                isClearable
                options={categoryOptions}
                className="mb-3"
                onChange={(newValue) => {
                  setCategory(newValue);
                }}
              />

              {/* size */}
              <CreatableSelect
                isMulti
                className="mb-3"
                options={colorOptions}
                onChange={(selectedOptions) => {
                  // Extract the selected color values
                  const selectedColors = selectedOptions.map(
                    (option) => option.value
                  );
                  setColors(selectedColors);
                }}
                placeholder="Please Select a Color"
              />

              {/* colors */}
              <CreatableSelect
                isMulti
                className="mb-3"
                options={sizeOptions}
                onChange={(selectedOptions) => {
                  // Extract the selected size values
                  const selectedSizes = selectedOptions.map(
                    (option) => option.value
                  );

                  setSizes(selectedSizes);
                }}
                placeholder="Please Select a Size"
              />
              {/* brand */}
              <CreatableSelect
                isClearable
                options={brandOptions}
                className="mb-3"
                onChange={(newValue) => {
                  setBrand(newValue.value);
                }}
                placeholder="Please Select a Brand"
              />

              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Write a price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <CreatableSelect
                  options={options}
                  placeholder="Shipped"
                  onChange={(value) => {
                    setShipping(value.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <CreatableSelect
                  options={options}
                  placeholder="isAvailable"
                  onChange={(value) => {
                    setIsAvailable(value.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label
                  className="
                  btn btn-outline-secondary col-md-12"
                >
                  {photo ? photo.name : " Upload Photo "}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={photo.name}
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
