import { useEffect, useState } from "react";
import "./ManageOrders.css";

function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    setOrders(savedOrders);
  }, []);

  const updateStatus = (id, status) => {
    const updatedOrders = orders.map((order) =>
      order.id === id
        ? { ...order, status }
        : order
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    window.dispatchEvent(
      new Event("ordersUpdated")
    );
  };

  return (
    <main className="manage-orders">
      <div className="container">
        <div className="orders-heading">
          <div>
            <p>ADMIN PANEL</p>
            <h1>Manage Orders</h1>
          </div>
        </div>

        {orders.length > 0 ? (
          <div className="orders-table">
            <div className="order-table-header">
              <span>Order ID</span>
              <span>Customer</span>
              <span>Date</span>
              <span>Total</span>
              <span>Status</span>
            </div>

            {orders.map((order) => (
              <div
                className="order-table-row"
                key={order.id}
              >
                <strong>{order.id}</strong>

                <span>
                  {order.customer?.name ||
                    "Customer"}
                </span>

                <span>
                  {order.date || "N/A"}
                </span>

                <span>
                  ₹{order.total || 0}
                </span>

                <select
                  value={
                    order.status || "Processing"
                  }
                  onChange={(event) =>
                    updateStatus(
                      order.id,
                      event.target.value
                    )
                  }
                >
                  <option value="Processing">
                    Processing
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-orders">
            No orders available.
          </p>
        )}
      </div>
    </main>
  );
}

export default ManageOrders;