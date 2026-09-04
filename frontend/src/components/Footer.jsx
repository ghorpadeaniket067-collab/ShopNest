import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            ShopNest
          </Link>

          <p>
            Simple, reliable and convenient online shopping.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <div className="footer-links">
          <h3>Account</h3>

          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/orders">My Orders</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2026 ShopNest. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;