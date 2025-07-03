import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

export const kioskService = {
  checkIn: async (formData) => {
    try {
      const response = await api.post(API_ENDPOINTS.VISITOR_CHECKIN, formData);
      return response.data;
    } catch (error) {
      console.error("Error during check-in:", error);
      throw error;
    }
  },
  checkOut: async (formData) => {
    try {
      const response = await api.post(API_ENDPOINTS.VISITOR_CHECKOUT, formData);
      return response.data;
    } catch (error) {
      console.error("Error during check-out:", error);
      throw error;
    }
  },
  
}


  