const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("./models/Product");

dotenv.config();

const products = [
  {
    name: "Classic T-Shirt",
    category: "Fashion",
    price: 799,
    rating: 4.5,
    image: "/images/products/product-1.jpg",
    description: "Comfortable cotton t-shirt for everyday casual wear.",
  },
  {
    name: "Running Shoes",
    category: "Footwear",
    price: 1499,
    rating: 4.6,
    image: "/images/products/product-2.jpg",
    description: "Lightweight running shoes designed for daily workouts.",
  },
  {
    name: "Smart Watch",
    category: "Electronics",
    price: 2499,
    rating: 4.4,
    image: "/images/products/product-3.jpg",
    description: "Modern smartwatch with useful features for everyday life.",
  },
  {
    name: "Travel Backpack",
    category: "Bags",
    price: 1199,
    rating: 4.5,
    image: "/images/products/product-4.jpg",
    description: "Spacious and durable backpack for travel and daily use.",
  },
  {
    name: "Sports Running Shoes",
    category: "Footwear",
    price: 1799,
    rating: 4.7,
    image: "/images/products/product-5.jpg",
    description: "Comfortable running shoes with a lightweight design.",
  },
  {
    name: "Premium Smart Watch",
    category: "Electronics",
    price: 2999,
    rating: 4.6,
    image: "/images/products/product-6.jpg",
    description: "Stylish smartwatch with useful fitness and daily features.",
  },
  {
    name: "Digital Camera",
    category: "Electronics",
    price: 42999,
    rating: 4.8,
    image: "/images/products/product-7.jpg",
    description: "Digital camera for capturing clear and detailed photos.",
  },
  {
    name: "Desktop Monitor Setup",
    category: "Electronics",
    price: 18999,
    rating: 4.5,
    image: "/images/products/product-8.jpg",
    description: "Modern desktop setup for home office and everyday work.",
  },
  {
    name: "Laptop Backpack",
    category: "Bags",
    price: 1599,
    rating: 4.6,
    image: "/images/products/product-9.jpg",
    description: "Durable backpack with multiple compartments for daily use.",
  },
  {
    name: "Premium Casual T-Shirt",
    category: "Fashion",
    price: 899,
    rating: 4.5,
    image: "/images/products/product-10.jpg",
    description: "Soft and comfortable t-shirt suitable for casual occasions.",
  },
  {
    name: "Smartphone and Watch",
    category: "Electronics",
    price: 24999,
    rating: 4.7,
    image: "/images/products/product-11.jpg",
    description: "Modern smartphone and smartwatch lifestyle technology setup.",
  },
  {
    name: "Non Stick Cookware Set",
    category: "Kitchen",
    price: 3499,
    rating: 4.6,
    image: "/images/products/product-12.jpg",
    description: "Useful non stick cookware set for everyday kitchen needs.",
  },
  {
    name: "Ladies Handbag",
    category: "Fashion",
    price: 1999,
    rating: 4.7,
    image: "/images/products/product-13.jpg",
    description: "Elegant handbag with a stylish design for everyday use.",
  },
  {
    name: "Sports Shoes and Watch",
    category: "Footwear",
    price: 2199,
    rating: 4.6,
    image: "/images/products/product-14.jpg",
    description: "Comfortable sports shoes designed for active daily use.",
  },
  {
    name: "Camera Travel Backpack",
    category: "Bags",
    price: 2499,
    rating: 4.7,
    image: "/images/products/product-15.jpg",
    description: "Protective travel backpack designed for camera equipment.",
  },
  {
    name: "Home Decor Collection",
    category: "Furniture",
    price: 2999,
    rating: 4.5,
    image: "/images/products/product-16.jpg",
    description: "Modern home decor items for creating a comfortable interior.",
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Atlas connected successfully");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("16 products added successfully.");

    process.exit(0);
  } catch (error) {
    console.error("Product seeding failed:", error.message);
    process.exit(1);
  }
};

seedProducts();