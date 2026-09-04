import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productsData from "../data/products";
import "./ManageProducts.css";

function ManageProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem(
      "adminProducts"
    );

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      localStorage.setItem(
        "adminProducts",
        JSON.stringify(productsData)
      );

      setProducts(productsData);
    }
  }, []);

  const deleteProduct = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    setProducts(updatedProducts);

    localStorage.setItem(
      "adminProducts",
      JSON.stringify(updatedProducts)
    );

    window.dispatchEvent(
      new Event("productsUpdated")
    );

    alert("Product deleted successfully!");
  };

  return (
    <main className="manage-products-page">
      <div className="container">
        <div className="manage-products-header">
          <div>
            <p>SHOPNEST ADMIN</p>
            <h1 className="page-title">
              Manage Products
            </h1>
          </div>

          <Link
            to="/admin/products/add"
            className="btn admin-add-button"
          >
            + Add Product
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="manage-products-grid">
            {products.map((product) => (
              <div
                className="manage-product-card"
                key={product.id}
              >
                <img
                  src={product.image}
                  alt={product.name}
                />

                <div className="manage-product-info">
                  <span>{product.category}</span>

                  <h3>{product.name}</h3>

                  <p>₹{product.price}</p>

                  <div className="manage-actions">
                    <Link
                      to="/admin/products/edit"
                      state={{ product }}
                      className="edit-button"
                    >
                      Edit
                    </Link>

                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteProduct(product.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-products">
            <h2>No Products Found</h2>

            <p>
              Add products from the Add Product page.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default ManageProducts;