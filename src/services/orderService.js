import axios from "./axios";

const OrderService = {
  async getAllOrders() {
    try {
      const response = await axios.get("/orders");
      return response;
    } catch (error) {
      console.error("Error during getting orders:", error);
      throw error;
    }
  },
  async saveOrder(order) {
    try {
      const response = await axios.post("/orders", {
        userId: order.userId,
        customerId: order.customer,
        totalBill: order.total,
        message: order.message,
        serviceIds: order.selectedServices,
      });
      return response;
    } catch (error) {
      console.error("Error during getting orders:", error);
      throw error;
    }
  },
};

export default OrderService;
