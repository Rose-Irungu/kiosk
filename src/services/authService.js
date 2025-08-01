import toast from "react-hot-toast";
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

  logoutUser: async() => {
    try {
      const res = await api.post(API_ENDPOINTS.LOG_OUT, { "action": "logout_current_device"});
      if (res.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("userRole");
        toast.success("Logout successful.");
        window.location.href = "/loginform";
      } else {
        console.error("Logout failed:", res.data);
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Error during logout:", error);
    }
    
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
