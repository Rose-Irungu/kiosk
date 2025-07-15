import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

// Fetch all emergencies
export const fetchEmergencies = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.EMERGENCY_LIST);
    const result = response.data;

    if (result.result_code === 0) {
      return {
        all: result.data.all_emergencies,
        latest: result.data.latest_emergency,
        ongoingCount: result.data.ongoing_emergencies_count,
        resolvedCount: result.data.resolved_emergencies_count
      };
    } else {
      throw new Error(result.message || "Failed to retrieve emergencies.");
    }

  } catch (error) {
    throw error.message || "Something went wrong while fetching emergencies.";
  }
};

// Update an existing emergency
export const updateEmergency = async (id) => {
  try {
    const url = API_ENDPOINTS.EMERGENCY_UPDATE.replace("{id}", id);
    const response = await api.put(url, { emergency_status: "resolved" });

    const result = response.data;

    if (result.result_code === 0) {
      return result.data; // returns { id: <id>, emergency_status: "resolved" }
    } else {
      throw new Error(result.message || "Emergency update failed.");
    }
  } catch (error) {
    throw error.message || "Something went wrong while updating the emergency.";
  }
};