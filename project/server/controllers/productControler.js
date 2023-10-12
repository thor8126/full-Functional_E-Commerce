import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    let keys = [
      "name",
      "description",
      "price",
      "category",
      "quantity",
      "photo",
    ];

    [name, description, price, category, quantity, photo].forEach((key, i) => {
      if (!key) {
        return res.status(404).send({ message: `${keys[i]} is required` });
      }
    });
    if (photo.size > 1000000) {
      return res.status(404).send({ message: `photo size greater then 1 mb` });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: `${name} `,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating Product",
      error,
    });
  }
};

// get all produts
export const getProductController = async (eq, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "AllProducts",
      totalCount: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all products",
      error,
    });
  }
};

// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .find({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "One Product",
      totalCount: product.length,
      product: product[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting One Product",
      error,
    });
  }
};

// get product photot
export const getProductPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting One Photo from Product",
      error,
    });
  }
};

// delete a product
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted SuccessFully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Deleting Product",
      error,
    });
  }
};

// update product conroler
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    let keys = ["name", "description", "price", "category", "quantity"];

    [name, description, price, category, quantity].forEach((key, i) => {
      if (!key) {
        return res.status(400).send({ message: `${keys[i]} is required` });
      }
    });
    let products = await productModel.findById(req.params.pid);

    if (!products) {
      return res.status(404).send({ message: "Product not found" });
    }

    if (photo && photo.size > 1000000) {
      return res
        .status(400)
        .send({ message: `Photo size is greater than 1 MB` });
    }

    // Check if a new photo has been provided
    if (photo) {
      products.name = name;
      products.description = description;
      products.price = price;
      products.category = category;
      products.quantity = quantity;
      products.shipping = shipping;
      products.slug = slugify(name);
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    } else {
      // If no new photo provided, keep the existing photo
      products.name = name;
      products.description = description;
      products.price = price;
      products.category = category;
      products.quantity = quantity;
      products.shipping = shipping;
      products.slug = slugify(name);
    }

    products = await products.save();

    res.status(201).send({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Product",
      error: error.message,
    });
  }
};
