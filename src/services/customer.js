import axios from "./axios";

const CustomerService = {
  async getAllCustomers() {
    try {
      const response = await axios.get("/customers");
      return response;
    } catch (error) {
      console.error("Error during getting customers:", error);
      throw error;
    }
  },
  async saveCustomer(name, email, phone) {
    try {
      const response = await axios.post("/customers", {
        name: name,
        email: email,
        phone: phone,
      });
      return response;
    } catch (error) {
      console.error("Error during saving customers:", error);
      throw error;
    }
  },
};

export default CustomerService;
