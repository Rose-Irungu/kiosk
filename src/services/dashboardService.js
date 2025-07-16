import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const getCurrentVisitors = async () => {
  const res = await api.get(API_ENDPOINTS.GET_CURRENT_VISITORS);
  return res.data;
};

export const getActiveIncidents = async () => {
  const res = await api.get(API_ENDPOINTS.GET_ACTIVE_INCIDENTS);
  return res.data;
};

export const getEmergenciesToday = async () => {
  const res = await api.get(API_ENDPOINTS.GET_EMERGENCIES_TODAY);
  return res.data;
};

export const getTotalActiveUsers = async () => {
  const res = await api.get(API_ENDPOINTS.GET_TOTAL_ACTIVE_USERS);
  return res.data;
};

export const getLatestPanicAlert = async () => {
  const res = await api.get(API_ENDPOINTS.GET_LATEST_PANIC_ALERT);
  return res.data;
};

export const resolvePanicAlert = async (alertId) => {
  const res = await api.post(API_ENDPOINTS.RESOLVE_PANIC_ALERT, { alertId });
  return res.data;
};
export const getDashboardStatistics = async () => {
  const res = await api.get(API_ENDPOINTS.DASHBOARD_STATISTICS);
  return res.data;
};
