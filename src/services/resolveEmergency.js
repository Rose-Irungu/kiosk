import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

export default async function resolveEmergency(comment) {
  try {
    const payload = {
        is_helpful:true,
        comment:comment
    }
    const response = await api.post(
      API_ENDPOINTS.RESOLVE_EMERGENCY,
      payload
    );

    return response?.data || null;
  } catch (err) {
    console.error(
      `Error: ${err?.message || err} occurred while resolving emergency`
    );
    return null;
  }
}
