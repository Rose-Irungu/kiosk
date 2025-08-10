import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";
import toast from "react-hot-toast";

export const incidenceService = {
  getAllIncidence: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.INCIDENCE_LIST);
      return response.data;
    } catch (error) {
      console.error("Error during check-in:", error);
      throw error;
    }
  },

  getResidentIncidence: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.R_INCIDENCE_LIST);
      return response.data;
    } catch (error) {
      console.error("Error during check-in:", error);
      throw error;
    }
  },

  updateIncidentStatus: async (id, newStatus = "resolved") => {
    try {
      const url = API_ENDPOINTS.UPDATED_INCIDENTS.replace("{id}", id);
      console.log("Log the url", url);
      const response = await api.patch(url, 
        { incident_status: newStatus, resolution_comment: "................" });

      const result = response.data;

      if (result.result_code === 0) {
        return result;
      } else {
        throw new Error(result.message || "Incident update failed.");
      }
    } catch (error) {
      throw (
        error.message || "Something went wrong while updating the incident status."
      );
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
      const promise = api.post(
        API_ENDPOINTS.TAKE_EMERGENCY_ROLL_CALL,
        formData
      );
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
};
