import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";
import toast from "react-hot-toast";

export default async function blacklistVisitor(visitor_id) {
  try {
    const response = await api.post(API_ENDPOINTS.BLACKLIST_GUEST, {
      visitor_id: visitor_id,
      reason: "Broke house rules"
    });

    if (response.status === 200) {
      toast.success('Visitor blacklisted successfully');
      return { response, status: true };
    } else {
      toast.error('Failed to blacklist visitor.');
      return { response, status: false };
    }

  } catch (error) {
    console.error("Failed to blacklist visitor", error);
    toast.error('An error occurred while blacklisting visitor.');
    return { error, status: false };
  }
}
