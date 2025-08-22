import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";
export default async function editVisitor(payload){
    try{
        const response = await api.put(API_ENDPOINTS.EDIT_VISITOR_FORM, payload,{
            headers: { "Content-Type": "multipart/form-data" },
        });
        return {response, status:true}
    }catch(err){
        console.error(`Error ${err} occurred while updating the guest`);
        throw err;
    }
}