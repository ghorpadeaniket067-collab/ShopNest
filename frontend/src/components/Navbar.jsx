import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const updateCounts = () => {
    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const wishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    const totalCartItems = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    setCartCount(totalCartItems);
    setWishlistCount(wishlist.length);

    const token = localStorage.getItem("token");
    const user = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    setIsLoggedIn(!!token);

    setIsAdmin(
      user?.isAdmin === true ||
      user?.isAdmin === "true"
    );
  };

  useEffect(() => {
    updateCounts();

    window.addEventListener(
      "storage",
      updateCounts
    );

    window.addEventListener(
      "cartUpdated",
      updateCounts
    );

    window.addEventListener(
      "wishlistUpdated",
      updateCounts
    );

    window.addEventListener(
      "authUpdated",
      updateCounts
    );

    return () => {
      window.removeEventListener(
        "storage",
        updateCounts
      );

      window.removeEventListener(
        "cartUpdated",
        updateCounts
      );

      window.removeEventListener(
        "wishlistUpdated",
        updateCounts
      );

      window.removeEventListener(
        "authUpdated",
        updateCounts
      );
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(
      new Event("authUpdated")
    );

    alert("Logout successful!");

    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">
          ShopNest
        </Link>

        <nav className="nav-links">
          <Link to="/">
            Home
          </Link>

          {isLoggedIn && (
            <>
              <Link to="/products">
                Products
              </Link>

              <Link to="/wishlist">
                ♡ Wishlist
                {wishlistCount > 0 && (
                  <span className="nav-count">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link to="/cart">
                🛒 Cart
                {cartCount > 0 && (
                  <span className="nav-count">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link to="/orders">
                My Orders
              </Link>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          )}

          {isLoggedIn && isAdmin && (
            <Link to="/admin">
              Admin
            </Link>
          )}

          {isLoggedIn && (
            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;