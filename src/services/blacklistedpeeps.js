import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

export const getAllBlackListed = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.BLACKLIST_PEEPS); 
    return response.data;
  } catch (error) {
    console.error("Failed to get blacklisted visitors ", error);
    throw error;
  }
};

export const removeFromBlackList = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.BLACKLIST_PEEPS); 
    return response.data;
  } catch (error) {
    console.error("Failed to get blacklisted visitors ", error);
    throw error;
  }
};