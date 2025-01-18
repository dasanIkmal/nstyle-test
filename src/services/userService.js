import axios from "./axios";

const UserService = {
  async getAllUsers() {
    try {
      const response = await axios.get("/users");
      return response;
    } catch (error) {
      console.error("Error during getting users:", error);
      throw error;
    }
  },
};

export default UserService;
