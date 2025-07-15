import { API_ENDPOINTS } from "../utils/constants";
import api from "./api";

export const authService = {
    sent_password_reset: async (formData) => {
        try {
        const response = await api.post(API_ENDPOINTS.SENT_PASSWORD_RESET, formData);
        return response.data;
        } catch (error) {
        console.error("Error during check-in:", error);
        throw error;
        }
    },
    loginUser: async (credentials) => {
      try {
        const response = await api.post(API_ENDPOINTS.LOGIN, credentials);

        return response.data;
      } catch (error) {
        throw error.response?.data || { message: 'Login failed. Please try again.' };
      }
    },

}