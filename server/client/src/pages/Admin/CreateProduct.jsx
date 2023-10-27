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
  const [category, setCategory] = useState(null);
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
    label: size,
    value: size.toString(),
    id: index,
  }));
  const brandOptions = brands.map((b, index) => ({
    label: b,
    value: b,
    id: index,
  }));

  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

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

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const formattedColorsString = colors
        .map((color) => `"${color}"`)
        .join("-");
      const formattedSizeString = sizes.map((s) => `"${s}"`).join("-");

      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("photo", photo);
      productData.append("category", category.id);
      productData.append("brand", brand);
      productData.append("size", formattedSizeString);
      productData.append("colors", formattedColorsString);

      productData.append("shipping", shipping === "yes" ? true : false);
      productData.append("isAvailable", isAvailable === "yes" ? true : false);
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
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
      <div className="container m-2 p-2">
        <div className="lg:flex">
          <div className="lg:w-1/4 mb-3 lg:mb-0">
            <AdminMenu />
          </div>
          <div className="lg:w-3/4">
            <h1 className="text-2xl">Create Product</h1>
            <div className="w-full lg:w-3/4 mx-auto">
              <CreatableSelect
                isClearable
                options={categoryOptions}
                className="mb-3"
                value={category}
                onChange={(newValue) => {
                  setCategory(newValue);
                }}
              />
              <CreatableSelect
                isMulti
                className="mb-3"
                options={colorOptions}
                value={colors}
                onChange={(selectedOptions) => {
                  const selectedColors = selectedOptions.map(
                    (option) => option.value
                  );
                  setColors(selectedColors);
                }}
                placeholder="Please Select a Color"
              />
              <CreatableSelect
                isMulti
                className="mb-3"
                options={sizeOptions}
                value={sizes}
                onChange={(selectedOptions) => {
                  const selectedSizes = selectedOptions.map(
                    (option) => option.value
                  );
                  setSizes(selectedSizes);
                }}
                placeholder="Please Select a Size"
              />
              <CreatableSelect
                isClearable
                options={brandOptions}
                className="mb-3"
                value={brand}
                onChange={(newValue) => {
                  setBrand(newValue);
                }}
                placeholder="Please Select a Brand"
              />
              <input
                type="text"
                value={name}
                placeholder="Write a name"
                className="border border-gray-300 rounded-md px-3 py-2 w-full mb-3 focus:outline-none focus:border-blue-500"
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                type="text"
                value={description}
                placeholder="Write a description"
                className="border border-gray-300 rounded-md px-3 py-2 w-full mb-3 focus:outline-none focus:border-blue-500"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                value={price}
                placeholder="Write a price"
                className="border border-gray-300 rounded-md px-3 py-2 w-full mb-3 focus:outline-none focus:border-blue-500"
                onChange={(e) => setPrice(e.target.value)}
              />
              <CreatableSelect
                options={options}
                placeholder="Shipped"
                value={shipping}
                onChange={(value) => {
                  setShipping(value.value);
                }}
                className="mb-3"
              />
              <CreatableSelect
                options={options}
                placeholder="isAvailable"
                value={isAvailable}
                onChange={(value) => {
                  setIsAvailable(value.value);
                }}
                className="mb-3"
              />
              <label className="btn btn-outline-secondary col-md-12 mb-3">
                {photo ? photo.name : " Upload Photo "}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
              {photo && (
                <div className="text-center mb-3">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={photo.name}
                    height="200"
                    className="img img-responsive"
                  />
                </div>
              )}
              <button
                className="bg-blue-500 text-white rounded px-4 py-2"
                onClick={handleCreate}
              >
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
