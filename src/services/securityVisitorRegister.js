import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

export const securityRegistervisitor = async (userData) => {
    try {
        const response = await api.post(API_ENDPOINTS.SECURITY_REGISTER_VISITOR, userData);
        return response.data;
        }catch (error) {
        console.error('Error in Registering user',error);
        throw error;
    }
};
