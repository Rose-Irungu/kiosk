import api from './api';
import endpoints from './endpoints';

export const getInvitation = async (token) => {
  const res = await api.get(endpoints.INVITATION_DETAIL(token));
  return res.data;
};

export const submitInvitation = async (token, formData) => {
  const res = await api.post(endpoints.INVITATION_SUBMIT(token), formData);
  return res.data;
};

export const createInvitation = async (formData) => {
  const res = await api.post(endpoints.INVITATIONS, formData);
  return res.data;
};
