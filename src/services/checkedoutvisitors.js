import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

export const getCheckedOut = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_CHECKOUT_VISITORS); 
    return response.data; // Assuming response is directly the array
  } catch (error) {
    console.error("Failed to fetch checked out visitors ", error);
    throw error;
  }
};
