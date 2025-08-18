import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

/**
 * Submits emergency feedback.
 * @param {Object} payload - The feedback data.
 * @param {string} payload.emergencyHandled - "yes" or "no"
 * @param {string} [payload.message] - Optional user message
 */
export const submitEmergencyFeedback = async ({ emergencyHandled, message }) => {
  try {
    const response = await api.post(API_ENDPOINTS.EMERGENCY_FEEDBACK, {
      emergencyHandled,
      message: message || null,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to submit emergency feedback", error);
    throw error;
  }
};
