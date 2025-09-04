import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

// ✅ Check-in a visitor
async function checkInVisitor(email) {
  try {
    const response = await api.post(
      API_ENDPOINTS.CHECK_IN_VISITOR,
      { email }
    );
    return response.data;
  } catch (err) {
    console.error(`Error while checking in visitor:`, err);
    throw err;
  }
}

// ✅ Check-out a visitor
async function checkOutVisitor(email) {
  try {
    const response = await api.post(
      API_ENDPOINTS.CHECK_OUT_VISITOR,
      { email }
    );
    return response.data;
  } catch (err) {
    console.error(`Error while checking out visitor:`, err);
    throw err;
  }
}

export { checkInVisitor, checkOutVisitor };
