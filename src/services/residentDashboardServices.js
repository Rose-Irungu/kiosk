import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

export async function getAllVisitors(){
    try{
        const response = await api.get(API_ENDPOINTS.ALL_VISITORS);
        const result = await response.data; 
        console.log("Result:", result);

        if (result.result_code === 0){
            return result;
        } else {
            throw new Error(response.message || "Failed to retrieve all visitors.");
        }
    } catch(error){
        throw error.message || "Failed to retrieve visitors";
    }
}

export async function inviteGuest() {
    console.log("Guest invited successfully");
};
export async function clickTest(){
    console.log("Button clicked successfully");
}