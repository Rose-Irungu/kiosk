import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

export const incidenceService ={
    getAllIncidence: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.INCIDENCE_LIST);
      return response.data;
    } catch (error) {
      console.error("Error during check-in:", error);
      throw error;
    }
  },
}