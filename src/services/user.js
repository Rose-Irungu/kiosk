import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";
import toast from "react-hot-toast";

export const userService = {
  getAllUsers: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.ALL_USERS);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  addUser: async (formData) => {
    try {
      const response = await api.post(API_ENDPOINTS.ADD_USER, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  },

  addResident: async (formData) => {
    try {
      const response = await api.post(API_ENDPOINTS.ADD_RESIDENT, formData, {
        headers: {
          "Content-Type":  'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding resident:", error);
      throw error;
    }
  },

   addSecurity: async (formData) => {
    try {
      const response = await api.post(API_ENDPOINTS.ADD_SECURITY, formData, {
        headers: {
          "Content-Type":  'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding security:", error);
      throw error;
    }
  },


  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`${API_ENDPOINTS.DELETE_USER}${userId}/`);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  updateUser: async (userId, updatedData) => {
    console.log(updatedData)
    try {
      const promise = api.put(`${API_ENDPOINTS.UPDATE_USER}${userId}/`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      const response = await toast.promise(promise, {
        loading: "Updating user...",
        success: "User updated successfully!",
        error: (err) =>
          err?.response?.data?.message || "Failed to update user. Please try again.",
      });
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  toggleUserStatus: async (userId, currentStatus) => {
    try {
      const promise = api.put(`${API_ENDPOINTS.UPDATE_USER}${userId}/`, {
        is_active: !currentStatus,
      });
      const response = await toast.promise(promise, {
        loading: "Updating user status...",
        success: "User status updated successfully!",
        error: (err) =>
          err?.response?.data?.message || "Failed to update user status. Please try again.",
      });
      return response.data;
    } catch (error) {
      console.error("Error toggling user status:", error);
      throw error;
    }
    
  },

  addCars: async (payload) => {
    try {
      const promise = api.post(API_ENDPOINTS.ADD_CARS, payload);
      const response = await toast.promise(promise, {
        loading: "Updating user cars...",
        success: "User cars updated successfully!",
        error: (err) =>
          err?.response?.data?.message || "Failed to update user cars. Please try again.",
      });
      return response.data;
    } catch (error) {
      console.error("Error updating user cars:", error);
      throw error;
    }

  },



  getAllUnits: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.GET_UNITS);
      return response.data;
    } catch (error) {
      console.error("Error fetching units:", error);
      throw error;
    }
  },


};
export default userService;

