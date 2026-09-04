import api from "./api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createOrder = async (orderData) => {
  const response = await api.post(
    "/orders",
    orderData,
    getAuthHeader()
  );

  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get(
    "/orders/my",
    getAuthHeader()
  );

  return response.data;
};

export const getAllOrders = async () => {
  const response = await api.get(
    "/orders",
    getAuthHeader()
  );

  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await api.put(
    `/orders/${id}`,
    { status },
    getAuthHeader()
  );

  return response.data;
};