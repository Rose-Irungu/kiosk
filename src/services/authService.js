import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

// Logs in the user by posting credentials wrapped in a `user` object.
// credentials = { email, password }

export const loginUser = async (credentials) => {
  try {
    const response = await api.post(API_ENDPOINTS.LOGIN, {
      user: {
        email: credentials.email,
        password: credentials.password,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed. Please try again.' };
  }
};
