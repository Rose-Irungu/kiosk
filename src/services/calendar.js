// retrieving a visitors based on date

import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

export const getVisitperDay = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.VISIT_LOGS); 
    return response.data;
  } catch (error) {
    console.error("Failed to fetch checked out visitors ", error);
    throw error;
  }
};