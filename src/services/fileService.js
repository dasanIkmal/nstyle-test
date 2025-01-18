import axios from "./axios";

const FileService = {
  async exportData() {
    try {
      const response = await axios.get("/export/download/exportAll", {
        responseType: "blob",
      });
      return response;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  },
};

export default FileService;
