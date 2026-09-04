import { Link } from "react-router-dom";
import products from "../data/products";
import "./AdminDashboard.css";

function AdminDashboard() {
  const orders = JSON.parse(
    localStorage.getItem("orders") || "[]"
  );

  return (
    <main className="admin-dashboard">
      <div className="container">
        <div className="admin-header">
          <div>
            <p>SHOPNEST ADMIN</p>
            <h1>Admin Dashboard</h1>
          </div>

          <Link
            to="/admin/products/add"
            className="btn admin-add-button"
          >
            + Add Product
          </Link>
        </div>

        <div className="admin-stats">
          <div className="admin-stat-card">
            <span>Products</span>
            <strong>{products.length}</strong>
          </div>

          <div className="admin-stat-card">
            <span>Orders</span>
            <strong>{orders.length}</strong>
          </div>

          <div className="admin-stat-card">
            <span>Store</span>
            <strong>Active</strong>
          </div>
        </div>

        <div className="admin-menu">
          <Link to="/admin/products">
            <h2>Manage Products</h2>
            <p>Add, edit and delete products.</p>
          </Link>

          <Link to="/admin/orders">
            <h2>Manage Orders</h2>
            <p>View orders and update order status.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;