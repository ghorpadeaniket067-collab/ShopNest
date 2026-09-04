import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditProduct.css";

function EditProduct() {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;

  const [formData, setFormData] = useState(
    product || {
      name: "",
      category: "",
      price: "",
      image: "",
      description: "",
    }
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
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

    const savedProducts = JSON.parse(
      localStorage.getItem("adminProducts") || "[]"
    );

    const updatedProducts = savedProducts.map(
      (item) =>
        item.id === formData.id
          ? {
              ...formData,
              price: Number(formData.price),
            }
          : item
    );

    localStorage.setItem(
      "adminProducts",
      JSON.stringify(updatedProducts)
    );

    window.dispatchEvent(
      new Event("productsUpdated")
    );

    alert("Product updated successfully!");

    navigate("/admin/products");
  };

  if (!product) {
    return (
      <main className="admin-page">
        <div className="container edit-message">
          <h1>Product Not Found</h1>

          <button
            className="btn admin-submit"
            onClick={() =>
              navigate("/admin/products")
            }
          >
            Back to Products
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="container">
        <div className="admin-form-card">
          <h1>Edit Product</h1>

          <p>
            Update your ShopNest product details.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              Product Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />

            <label htmlFor="category">
              Category
            </label>

            <input
              id="category"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category"
            />

            <label htmlFor="price">
              Price
            </label>

            <input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
            />

            <label htmlFor="image">
              Image URL
            </label>

            <input
              id="image"
              name="image"
              type="text"
              value={formData.image}
              onChange={handleChange}
              placeholder="/images/products/product-1.jpg"
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
              Update Product
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default EditProduct;