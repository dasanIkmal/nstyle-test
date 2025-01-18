import axios from "./axios";

const ServiceService = {
  async saveService(name, image, status, subcategories) {
    try {
      const response = await axios.post("/service/categories", {
        name: name,
        image: image,
        status: status,
        serviceSubCategoryDTO: subcategories,
      });
      return response;
    } catch (error) {
      console.error("Error during getting users:", error);
      throw error;
    }
  },
  async uploadFile(formData) {
    try {
      const response = await axios.post("/files/upload/img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Error during getting users:", error);
      throw error;
    }
  },
  async createService(service) {
    try {
      const response = await axios.post("/service/categories", service);
      return response;
    } catch (error) {
      console.error("Error during getting users:", error);
      throw error;
    }
  },
  async getAllServices() {
    try {
      const response = await axios.get("/service/categories");
      return response;
    } catch (error) {
      console.error("Error during getting users:", error);
      throw error;
    }
  },
};

export default ServiceService;
