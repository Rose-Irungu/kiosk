import api from './api';
import { API_ENDPOINTS } from '../utils/constants';
import toast from 'react-hot-toast';


export const getInvitation = async (token) => {
  const res = await api.get(`${API_ENDPOINTS.GET_VISITOR}?token=${token}`);
  return res.data;
};

export const submitInvitation = async (token, formData) => {
  const promise = api.post(`${API_ENDPOINTS.REGISTER_VISITOR}?token=${token}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  },);
  const res = await toast.promise(promise, {
    loading: 'Submitting invitation...',
    success: 'Invitation submitted successfully!',
    error: 'Failed to submit invitation. Please try again.',
  });
  return res.data;
};

export const createInvitation = async (formData) => {
  const res = await api.post(API_ENDPOINTS.INVITE_VISITOR, formData);
  return res.data;
};

export const getAllVisitors = async () => {
  const res = await api.get(API_ENDPOINTS.GET_ALL_VISITORS);
  return res.data;
}
export const getMostVisitedUnits = async (filter = "today") => {
  const res = await api.get(`${API_ENDPOINTS.MOST_VISITED_UNITS}?filter=${filter}`);
  return res.data.results;
};

export const getVisitLogss = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.VISIT_LOGS);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch visit logs", error);
    throw error;
  }
};