import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

export const residentIncidenceService ={
    getAllIncidence: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.Resident_Incidence);
      return response.data;
    } catch (error) {
      console.error("Error during check-in:", error);
      throw error;
    }
  },
}