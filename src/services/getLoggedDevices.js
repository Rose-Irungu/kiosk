import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

export async function getLoggedDevices(){
    try{
        const response = await api.get(API_ENDPOINTS.LOGGED_DEVICES);
        const result = await response.data; 
        // console.log("Result:", result);
        return result;

        // if (result.result_code === 0){
        //     return result;
        // } else {
        //     throw new Error(response.message || "Failed to retrieve logged in devices.");
        // }
    } catch(error){
        throw error.message || "Failed to retrieve logged in devices";
    }
}