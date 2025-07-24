import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

export const getVisitLogs = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.VISIT_LOGS); // or "/api/visits/visit-logs/"
    return response.data; // Assuming response is directly the array
  } catch (error) {
    console.error("Failed to fetch visit logs", error);
    throw error;
  }
};
