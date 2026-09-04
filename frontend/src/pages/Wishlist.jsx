import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Wishlist.css";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    setWishlistItems(savedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlistItems.filter(
      (item) => item.id !== id
    );

    setWishlistItems(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  return (
    <main className="wishlist-page">
      <div className="container">
        <h1 className="page-title">My Wishlist</h1>

        {wishlistItems.length > 0 ? (
          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <div
                className="wishlist-item"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="wishlist-info">
                  <span>{item.category}</span>

                  <h3>{item.name}</h3>

                  <p>₹{item.price}</p>

                  <div className="wishlist-actions">
                    <Link
                      to={`/products/${item.id}`}
                      className="btn view-button"
                    >
                      View
                    </Link>

                    <button
                      className="remove-wishlist"
                      onClick={() =>
                        removeFromWishlist(item.id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-wishlist">
            <p>Your wishlist is empty.</p>

            <Link
              to="/products"
              className="btn view-button"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default Wishlist;