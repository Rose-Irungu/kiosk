import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

export default async function submitEmergencyFeedback(id, feedback){
    try{
        const url = API_ENDPOINTS.EMERGENCY_UPDATE.replace("{id}", id);
        const response = await api.patch(url,{
            "emergency_status": "resolved",
            "emergency_resolution_comment":feedback,
        });
        return { response, status:true};
    } catch(err){
        console.error(`Error ${err} occurred while submitting the emergency`);
        throw err;
    }
}
