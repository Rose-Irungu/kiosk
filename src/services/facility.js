import toast from "react-hot-toast";
import { API_ENDPOINTS } from "../utils/constants";
import api from "./api";

export const addFacility = async (facilityData) => {
  try {
    const response = await api.post(API_ENDPOINTS.FACILITY_NAME, facilityData);
    return response.data;
  } catch (error) {
    console.error("Error adding facility:", error);
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