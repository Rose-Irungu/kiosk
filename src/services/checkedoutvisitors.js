import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

export const getCheckedOut = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_CHECKOUT_VISITORS); 
    return response.data;
  } catch (error) {
    console.error("Failed to fetch checked out visitors ", error);
    throw error;
  }
};
