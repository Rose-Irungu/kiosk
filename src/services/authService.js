import { API_ENDPOINTS } from "../utils/constants";
import api from "./api";

export const authService = {
  sent_password_reset: async (formData) => {
    try {
      const response = await api.post(
        API_ENDPOINTS.SENT_PASSWORD_RESET,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error during sent email:", error);
      throw error;
    }
  },
  password_reset: async (formData) => {
    try {
      const response = await api.post(
        API_ENDPOINTS.SENT_PASSWORD_RESET,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error during reset password:", error);
      throw error;
    }
  },
  loginUser: async (credentials) => {
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, credentials);

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Login failed. Please try again." }
      );
    }
  },

  logoutUser: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userRole");   
    window.location.href = "/loginform";
  },

  changePassword: async (formData) => {
    try {
      const response = await api.post(API_ENDPOINTS.CHANGE_PASSWORD, formData);

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Password change failed. Please try again.",
        }
      );
    }
  },
};
