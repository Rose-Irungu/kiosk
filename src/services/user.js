import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

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
      const response = await api.put(`${API_ENDPOINTS.UPDATE_USER}${userId}/`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data', // If you're uploading files like profile_picture
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },
    toggleUserStatus: async (userId, currentStatus) => {
    try {
      const response = await api.patch(`${API_ENDPOINTS.UPDATE_USER}${userId}/`, {
        is_active: !currentStatus,
      });
      return response.data;
    } catch (error) {
      console.error("Error toggling user status:", error);
      throw error;
    }
  },
  toggleUserStatus: async (userId, userData) => {
  try {
    const updatedData = {
      ...userData,
      is_active: !userData.is_active,
    };

    const response = await api.put(`${API_ENDPOINTS.UPDATE_USER}${userId}/`, updatedData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error toggling user status:", error);
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

