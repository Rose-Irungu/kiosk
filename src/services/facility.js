import toast from "react-hot-toast";
import { API_ENDPOINTS } from "../utils/constants";
import api from "./api";

export const getFacilityInfo = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.FACILITY_PROFILE);
    return response.data;
  } catch (error) {
    console.error("Error fetching facilities:", error);
    throw error;
  }
}

export const addFloor = async (floorData) => {
  try {
    const pro = api.post(API_ENDPOINTS.FLOOR, floorData);
    const response = await toast.promise(pro, {
      loading: "Adding floor...",
      success: "Floor added successfully!",
      error: "Failed to add floor. Please try again.",
    });
    return response;
  } catch (error) {
    console.error("Error adding floor:", error);
    throw error;
  }
}

export const addRoom = async (roomData) => {
  try {
    const pro = api.post(API_ENDPOINTS.ROOM, roomData);
    const response = await toast.promise(pro, {
      loading: "Adding room...",
      success: "Room added successfully!",
      error: "Failed to add room. Please try again.",
    });
    return response;
  } catch (error) {
    console.error("Error adding floor:", error);
    throw error;
  }
}

export const deleteRoom = async (roomId) => {
  try {
    const pro = api.delete(`${API_ENDPOINTS.ROOM}${roomId}/`);
    const response = await toast.promise(pro, {
      loading: "Deleting room...",
      success: "Room deleted successfully!",
      error: "Failed to delete room. Please try again.",
    });
    return response;
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error;
  }
}

export const deleteFloor = async (floorId) => {
  try {
    const pro = api.delete(`${API_ENDPOINTS.FLOOR}${floorId}/`);
    const response = await toast.promise(pro, {
      loading: "Deleting floor...",
      success: "Floor deleted successfully!",
      error: "Failed to delete floor. Please try again.",
    });
    return response;
  } catch (error) {
    console.error("Error deleting floor:", error);
    throw error;
  }
}

export const updateFacility = async (facilityId, facilityData) => {
  try {
    const pro = api.put(`${API_ENDPOINTS.FACILITY_NAME}${facilityId}/`, facilityData);
    const response = await toast.promise(pro, {
      loading: "Updating facility...",
      success: "Facility updated successfully!",
      error: "Failed to update facility. Please try again.",
    });
    return response.data;
  } catch (error) {
    console.error("Error updating facility:", error);
    throw error;
  }
}

export const getLatestEmergency = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.GET_LATEST_EMERGENCY);
    return response.data;
  } catch (error) {
    console.error("Error fetching facilities:", error);
    throw error;
  }
}