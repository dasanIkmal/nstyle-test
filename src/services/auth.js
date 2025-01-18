import axios from "./axios";

const AuthService = {
  async register(username, email, password) {
    try {
      const response = await axios.post("/auth/register", {
        name: username,
        email: email,
        password: password,
      });
      return response; // Return the response data for further use
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  },
  async login(username, password) {
    try {
      const response = await axios.post("/auth/login", {
        username: username,
        password: password,
      });
      return response; // Return the response data for further use
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },
  async varifyOTP(email, otp) {
    try {
      const response = await axios.post("/auth/validateOTP", {
        email: email,
        otp: otp,
      });
      return response; // Return the response data for further use
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },
};

export default AuthService;
