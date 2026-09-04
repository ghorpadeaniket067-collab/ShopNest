import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./AddProduct.css";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.image ||
      !formData.description
    ) {
      alert("Please fill all fields.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login as admin.");
      return;
    }

    try {
      await api.post(
        "/products",
        {
          name: formData.name.trim(),
          category: formData.category.trim(),
          price: Number(formData.price),
          image: formData.image.trim(),
          description: formData.description.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product added successfully!");
      navigate("/admin/products");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to add product."
      );
    }
  };

  return (
    <main className="admin-page">
      <div className="container">
        <div className="admin-form-card">
          <h1>Add Product</h1>

          <p>
            Add a new product to your ShopNest store.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Product Name</label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />

            <label htmlFor="category">Category</label>

            <input
              id="category"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              placeholder="Example: Fashion"
            />

            <label htmlFor="price">Price</label>

            <input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
            />

            <label htmlFor="image">Image URL</label>

            <input
              id="image"
              name="image"
              type="text"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
            />

            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="5"
            />

            <button
              type="submit"
              className="btn admin-submit"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default AddProduct;