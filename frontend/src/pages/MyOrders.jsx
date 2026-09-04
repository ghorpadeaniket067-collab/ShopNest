import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyOrders.css";

function MyOrders() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder = JSON.parse(
      localStorage.getItem("latestOrder") || "null"
    );

    setOrder(savedOrder);
  }, []);

  if (!order) {
    return (
      <main className="orders-page">
        <div className="container empty-orders">
          <h1>No Orders Yet</h1>

          <p>
            You have not placed any order yet.
          </p>

          <Link
            to="/products"
            className="btn orders-button"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page">
      <div className="container">
        <h1 className="page-title">My Orders</h1>

        <div className="order-card">
          <div className="order-header">
            <div>
              <span>Order ID</span>
              <h3>{order.id}</h3>
            </div>

            <div>
              <span>Date</span>
              <h3>{order.date}</h3>
            </div>

            <div className="order-status">
              {order.status}
            </div>
          </div>

          <div className="order-items">
            {order.items.map((item) => (
              <div
                className="order-item"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="order-item-info">
                  <h3>{item.name}</h3>

                  <p>
                    {item.quantity} × ₹{item.price}
                  </p>
                </div>

                <strong>
                  ₹{item.price * item.quantity}
                </strong>
              </div>
            ))}
          </div>

          <div className="order-total">
            <span>Total Amount</span>
            <strong>₹{order.total}</strong>
          </div>

          <div className="delivery-info">
            <h2>Delivery Details</h2>

            <p>{order.customer.name}</p>
            <p>{order.customer.email}</p>
            <p>{order.customer.phone}</p>
            <p>
              {order.customer.address},{" "}
              {order.customer.city} -{" "}
              {order.customer.pincode}
            </p>
          </div>
        </div>

        <div className="continue-shopping">
          <Link
            to="/products"
            className="btn orders-button"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

export default MyOrders;