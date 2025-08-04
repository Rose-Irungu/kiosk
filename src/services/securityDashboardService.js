import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

export const createEmergency = async (emergencyData) => {
    try{
        const url = API_ENDPOINTS.CREATE_EMERGENCY;
        const response = await api.post(url, emergencyData);
        const result = response.data;
        if(result.result_code === 0){
            return result.data;
        }else{
            throw new Error(result.message || "Emergency creation failed.");
        }
    } catch(error){
        throw error.message || "Something went wrong while creating emergencies.";
    } finally{
        console.log("Emergency created successfully");
    }
};

export const createIncidence = async (formData) => {
  try {
    const url = API_ENDPOINTS.CREATE_INCIDENCE;
    const response = await api.post(url, formData, {headers: {
      'Content-Type': 'multipart/form-data',
    }});
    const result = response.data;

    if (result.result_code === 0) {
      return result.data;
    } else {
      throw new Error(result.message || "Incidence creation failed.");
    }
  } catch (error) {
    throw error.message || "Something went wrong while creating the incidence.";
  } finally {
    console.log("Incidence created successfully");
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

