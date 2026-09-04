const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products.",
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch product.",
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      rating,
      image,
      description,
    } = req.body;

    if (
      !name ||
      !category ||
      !price ||
      !image ||
      !description
    ) {
      return res.status(400).json({
        message: "Please fill all fields.",
      });
    }

    const product = await Product.create({
      name,
      category,
      price: Number(price),
      rating: rating || 4.5,
      image,
      description,
    });

    res.status(201).json({
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create product.",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    const {
      name,
      category,
      price,
      rating,
      image,
      description,
    } = req.body;

    product.name = name;
    product.category = category;
    product.price = Number(price);
    product.rating = rating || product.rating;
    product.image = image;
    product.description = description;

    const updatedProduct = await product.save();

    res.json({
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update product.",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    await product.deleteOne();

    res.json({
      message: "Product deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete product.",
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};