import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

// Fetch all emergencies
export const fetchEmergencies = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.EMERGENCY);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch emergencies." };
  }
};

// Update an existing emergency
export const updateEmergency = async (id, emergencyData) => {
  try {
    const response = await api.put(`${API_ENDPOINTS.EMERGENCY}/${id}`, emergencyData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update emergency." };
  }
};
