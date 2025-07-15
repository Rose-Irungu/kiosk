// src/services/loginService.js

import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Logs in the user by posting credentials wrapped in a `user` object.
 *
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} - Login response with tokens & user info
 */
export const loginUser = async (credentials) => {
  try {
    const response = await api.post(API_ENDPOINTS.LOGIN, {
      user: {
        email: credentials.email,
        password: credentials.password,
      }
    });

    return response.data;
  } catch (error) {
    // Bubble up the error message or fallback to a default
    throw error.response?.data || { message: 'Login failed. Please try again.' };
  }
};
