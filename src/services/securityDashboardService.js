import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

export const createEmergency = async (emergencyData) => {
    try{
        const url = API_ENDPOINTS.CREATE_EMERGENCY;
        const token = localStorage.getItem("token");
        const response = await api.post(url, emergencyData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const result = response.data;
        if(result.result_code === 0){
            return result.data;
        }else{
            throw new Error(result.message || "Emergency creation failed.");
        }
    } catch(error){
        throw error.message || "Something went wrong while creating emergencies.";
    }
};

export const createIncidence = async (incidenceData) => {
    try{
        const url = API_ENDPOINTS.CREATE_INCIDENCE;
        const response = await api.post(url, incidenceData);
        const result = response.data;
        if(result.result_code === 0){
            return result.data;
        }else{
            throw new Error(result.message || "Incidence creation failed.");
        }
    } catch(error){
        throw error.message || "Something went wrong while creating the incidence.";
    }
};

export const fetchStatistics = async () =>{
    try{
        const response = await api.get(API_ENDPOINTS.STATISTICS);
        const result = response.data;
        if(result.result_code === 0){
            return result.data;
        }else{
            throw new Error(result.message || "Failed to fetch statistics.");
        }
    } catch(error){
        throw error.message || "Something went wrong while fetching statistics.";
    }
};