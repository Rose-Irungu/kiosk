import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";
import toast from "react-hot-toast";

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
  getAllResidents: async () => {
    try {
      const promise = api.get(API_ENDPOINTS.RESIDENT_LIST);
      const response = await toast.promise(promise, {
        loading: "Loading residents...",
        success: "Residents loaded successfully!",
        error: "Failed to load residents. Please try again.",
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching residents:", error);
      throw error;
      
    }
  },
  takeEmergencyRollCall: async (formData) => {
    try {
      const promise = api.post(API_ENDPOINTS.TAKE_EMERGENCY_ROLL_CALL, formData);
      const response = await toast.promise(promise, {
        loading: "Submitting roll call...",
        success: "Roll call submitted successfully!",
        error: "Failed to submit roll call. Please try again.",
      });
      return response.data;
    } catch (error) {
      console.error("Error submitting roll call:", error);
      throw error;
    }
  },
}