import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import DeletePrompt from "../../components/DeletePrompt";
import { ShoeColor, ShoeSize, brands } from "../../components/material";
import CreatableSelect from "react-select/creatable";

const UpdateProduct = () => {
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
  const [id, setId] = useState("");
  const params = useParams("");
  // this is for deleteConfomation
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const categoryOptions = categories?.map((category) => ({
    label: category.name,
    value: category.name,
    id: category._id,
  }));

  const colorOptions = ShoeColor.map((color, index) => ({
    label: color,
    value: color,
    id: index, // You can use an appropriate unique identifier
  }));

  const sizeOptions = ShoeSize.map((size, index) => ({
    label: size,
    value: size,
    id: index, // You can use an appropriate unique identifier
  }));

  const brandOptions = brands.map((brand, index) => ({
    label: brand,
    value: brand,
    id: index, // You can use an appropriate unique identifier
  }));
  // for availabe or not
  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  // get single product
  const getSingleProuct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/get-product/${
          params.slug
        }`
      );
      if (data?.success) {
        setName(data?.product.name);
        setDescription(data?.product?.description);
        setPrice(data?.product?.price);
        setCategory(data?.product?.category?._id);
        setBrand(data?.product?.category?._id);
        setShipping(data?.product?.shipping);
        setBrand(data?.product?.brand);
        setIsAvailable(data?.product?.isAvailable);
        setId(data?.product._id);
        let Color = data?.product?.colors;
        if (Color) {
          Color = Color.replace(/"/g, "");
          setColors(Color.split("-"));
        }
        let Size = data?.product?.size;
        if (Size) {
          Size = Size.replace(/"/g, "");
          setSizes(Size.split("-"));
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  useEffect(() => {
    getSingleProuct();
    // eslint-disable-next-line
  }, []);
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
    // eslint-disable-next-line
  }, []);

  // create product function
  const handleUpdate = async (e) => {
    console.log(category);
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
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("brand", brand);
      productData.append("size", formattedSizeString);
      productData.append("colors", formattedColorsString);
      productData.append("shipping", shipping === "yes" ? true : false);
      productData.append("isAvailable", isAvailable === "yes" ? true : false);
      console.log(productData);
      const { data } = await axios.put(
        `${import.meta.env.VITE_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success(`${data?.message}`);
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  // delete a product

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };
  const handleConfirmDelete = async () => {
    setShowDeleteConfirmation(false);

    try {
      // Perform the delete operation here
      const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_API}/api/v1/product/delete-product/${id}`
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

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <Layout title={"DashBoard - Update Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <CreatableSelect
                isClearable
                options={categoryOptions}
                className="mb-3"
                onChange={(newValue) => {
                  setCategory(newValue.id);
                }}
                value={categoryOptions.find((option) => option.id === category)}
              />

              {/* colors */}
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
                value={colors.map((color) => ({ label: color, value: color }))}
                x
              />

              {/* sizes */}
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
                value={sizes.map((size) => ({ label: size, value: size }))}
              />

              {/* brand */}
              <CreatableSelect
                isClearable
                options={brandOptions}
                className="mb-3"
                onChange={(newValue) => {
                  setBrand(newValue ? newValue.value : null);
                }}
                value={brand ? { label: brand, value: brand } : null}
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
                  value={
                    shipping === "yes"
                      ? { label: "yes", value: "yes" }
                      : { label: "no", value: "no" }
                  }
                />

                <div className="mb-3 mt-3">
                  <CreatableSelect
                    options={options}
                    placeholder="isAvailable"
                    onChange={(value) => {
                      setIsAvailable(value ? value.value : null);
                    }}
                    value={
                      isAvailable === "yes"
                        ? { label: "yes", value: "yes" }
                        : { label: "no", value: "no" }
                    }
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
                  {photo ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={photo.name}
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`${
                          import.meta.env.VITE_APP_API
                        }/api/v1/product/product-photo/${id}`}
                        alt={photo.name}
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3 d-flex flex-row">
                  <button
                    className="btn btn-primary m-1"
                    onClick={handleUpdate}
                  >
                    Update Product
                  </button>
                  <button className="btn btn-danger m-1" onClick={handleDelete}>
                    Delete Product
                  </button>
                </div>
                {showDeleteConfirmation && (
                  <DeletePrompt
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default UpdateProduct;
