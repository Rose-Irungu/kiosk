import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";
import toast from "react-hot-toast";


export const visitsuser = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.VISITS_USER); 
    return response.data; 
  } catch (error) {
    console.error("Failed to fetch visit logs", error);
    throw error;
  }
};

export const approveVisit = async (visitId) => {
  try {
    const promise = api.post(API_ENDPOINTS.APPROVE_VISITOR, {
      "action":"approve", "visit_id": visitId
    })
    const res = await toast.promise(promise, {
      loading: "Approving visit",
      success: "Visit approved succesfully",
      error: "Failed to approve"
    })
    return res.data
    } catch (error) {
      console.log("Error occurred")
    }
}

export const cancelVisit = async (visitId) => {
  try {
    const promise = api.post(API_ENDPOINTS.APPROVE_VISITOR, {
      "action":"cancel", "visit_id": visitId
    })
    const res = await toast.promise(promise, {
      loading: "Cancelling the visit",
      success: "Visit cancelled succesfully",
      error: "Failed to cancel"
    })
    return res.data
    } catch (error) {
      console.log("Error occurred")
    }
}

export const blacklistVisitor = async(payload) => {
  try {
    const promise = api.post(API_ENDPOINTS.BLACKLIST_VISITOR, payload)
    const res = await toast.promise(promise, {
      loading: "Blacklisting....",
      success: "Done",
      error: "Error occured"
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const unBlacklistVisitor = async(payload) => {
  try {
    const promise = api.post(API_ENDPOINTS.UN_BLACKLIST_VISITOR, payload)
    const res = await toast.promise(promise, {
      loading: "Un-blacklisting....",
      success: "Done",
      error: "Error occured"
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const addFavourite = async (visitorId) => {
  try {
    const response = await api.post(API_ENDPOINTS.ADD_FAVOURITE, { visitor_id: visitorId });
    return response.data;
  } catch (error) {
    console.error("Error adding favourite:", error);
    throw error;
  }
};

// export const addFavourite = async (visitorId) => {
//   try {
//     const response = await api.delete(`${API_ENDPOINTS.ADD_FAVOURITE}${visitorId}/`);
//     return response.data;
//   } catch (error) {
//     console.error("Error removing favourite:", error);
//     throw error;
//   }
// };

