import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

export const userService = {
  getAllUsers: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.ALL_USERS);
      return response.data;
    } catch (error) {
      console.error("Error during check-in:", error);
      throw error;
    }
  },
  addUser: async (formData) => {
    try {
      const response = await api.post(API_ENDPOINTS.ADD_USER, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          }
      },);
      return response.data;
    } catch (error) {
      console.error("Error during check-out:", error);
      throw error;
    }
  },
  
}


  