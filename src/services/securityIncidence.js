import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

export const securityIncidenceService ={
    getAllIncidence: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.SECURITY_INCIDENCE);
      return response.data;
    } catch (error) {
      console.error("Error during check-in:", error);
      throw error;
    }
  },
}