import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);

        setProduct({
          ...response.data,
          id: response.data._id,
        });
      } catch (error) {
        setError("Product Not Found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item
      );
    } else {
      updatedCart = [
        ...savedCart,
        {
          ...product,
          quantity,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));

    alert(`${quantity} product(s) added to cart!`);
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

  if (loading) {
    return (
      <main className="product-details">
        <div className="container details-message">
          <h1>Loading Product...</h1>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="product-details">
        <div className="container details-message">
          <h1>Product Not Found</h1>

          <Link
            to="/products"
            className="btn back-link"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="product-details">
      <div className="container details-container">
        <div className="details-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="details-info">
          <span className="details-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <p className="details-rating">
            ⭐ {product.rating} / 5
          </p>

          <p className="details-price">
            ₹{product.price}
          </p>

          <p className="details-description">
            {product.description}
          </p>

          <div className="quantity-control">
            <button
              type="button"
              onClick={() =>
                setQuantity(
                  Math.max(1, quantity - 1)
                )
              }
            >
              -
            </button>

            <span>{quantity}</span>

            <button
              type="button"
              onClick={() =>
                setQuantity(quantity + 1)
              }
            >
              +
            </button>
          </div>

          <div className="details-actions">
            <button
              className="btn cart-button"
              onClick={addToCart}
            >
              Add to Cart
            </button>

            <button
              className="btn details-wishlist-button"
              onClick={addToWishlist}
            >
              ♡ Add to Wishlist
            </button>
          </div>

          <Link
            to="/products"
            className="back-link"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;