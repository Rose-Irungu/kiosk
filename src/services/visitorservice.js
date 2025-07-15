import api from './api';
import { API_ENDPOINTS } from '../utils/constants';


export const getInvitation = async (token) => {
  const res = await api.get(`${API_ENDPOINTS.GET_VISITOR}?token=${token}`);
  return res.data;
};

export const submitInvitation = async (token, formData) => {
  console.log(`-------------------- ${API_ENDPOINTS.REGISTER_VISITOR}?token=${token}`);
  
  const res = await api.post(`${API_ENDPOINTS.REGISTER_VISITOR}?token=${token}`, formData,{
      headers: {
          'Content-Type': 'multipart/form-data',
      }
  },);
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
