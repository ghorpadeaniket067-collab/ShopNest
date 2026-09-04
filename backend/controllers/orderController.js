const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const {
      customer,
      items,
      total,
    } = req.body;

    if (
      !customer ||
      !items ||
      items.length === 0 ||
      total === undefined
    ) {
      return res.status(400).json({
        message: "Invalid order details.",
      });
    }

    const order = await Order.create({
      customer,
      items,
      total: Number(total),
      status: "Processing",
    });

    res.status(201).json({
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to place order.",
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      "customer.email": req.user.email,
    }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders.",
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders.",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    order.status = status;

    const updatedOrder = await order.save();

    res.json({
      message: "Order status updated.",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update order status.",
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};