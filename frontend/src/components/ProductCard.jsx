import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  const addToCart = () => {
    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingProduct = savedCart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = savedCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...savedCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));

    alert("Product added to cart!");
  };

  const addToWishlist = () => {
    const savedWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    const alreadyAdded = savedWishlist.some(
      (item) => item.id === product.id
    );

    if (alreadyAdded) {
      alert("Product is already in wishlist!");
      return;
    }

    const updatedWishlist = [
      ...savedWishlist,
      product,
    ];

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );

    alert("Product added to wishlist!");
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </Link>

      <div className="product-info">
        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p className="product-rating">
          ⭐ {product.rating} / 5
        </p>

        <p className="product-price">
          ₹{product.price}
        </p>

        <div className="product-actions">
          <Link
            to={`/products/${product.id}`}
            className="btn product-btn"
          >
            View Details
          </Link>

          <button
            className="cart-icon-button"
            onClick={addToCart}
            aria-label="Add product to cart"
          >
            🛒
          </button>

          <button
            className="wishlist-button"
            onClick={addToWishlist}
            aria-label="Add product to wishlist"
          >
            ♡
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;