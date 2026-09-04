import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../services/orderService";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCartItems(savedCart);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isFormComplete = Object.values(
      formData
    ).every((value) => value.trim() !== "");

    if (!isFormComplete) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const orderItems = cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      const orderData = {
        customer: formData,
        items: orderItems,
        total,
      };

      await createOrder(orderData);

      localStorage.removeItem("cart");

      window.dispatchEvent(
        new Event("cartUpdated")
      );

      alert("Order placed successfully!");

      navigate("/orders");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to place order."
      );
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <div className="container empty-checkout">
          <h1>Your cart is empty</h1>

          <p>
            Add products before going to checkout.
          </p>

          <Link
            to="/products"
            className="btn checkout-button"
          >
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="container">
        <h1 className="page-title">
          Checkout
        </h1>

        <div className="checkout-layout">
          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >
            <h2>Delivery Details</h2>

            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            <label htmlFor="phone">
              Phone
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />

            <label htmlFor="address">
              Address
            </label>

            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              rows="4"
            />

            <div className="checkout-row">
              <div>
                <label htmlFor="city">
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </div>

              <div>
                <label htmlFor="pincode">
                  Pincode
                </label>

                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn checkout-button"
            >
              Place Order
            </button>
          </form>

          <div className="checkout-summary">
            <h2>Order Summary</h2>

            {cartItems.map((item) => (
              <div
                className="checkout-item"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>
                  <h3>{item.name}</h3>

                  <p>
                    {item.quantity} × ₹
                    {item.price}
                  </p>
                </div>
              </div>
            ))}

            <div className="checkout-total">
              <span>Total</span>

              <strong>₹{total}</strong>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Checkout;