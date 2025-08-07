import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";
import toast from "react-hot-toast";

export default async function blacklistVisitor(visitor_id){
    try{
        const response = await api.post(API_ENDPOINTS.BLACKLIST_GUEST,{
            'visitor_id': visitor_id,
            'reason':"Broke house rules"
        });
        return response;
    } catch(error){
        console.log("Failed to blacklist visitor", error);
        throw error;
    } finally{
        setTimeout(()=>{
            toast.success('Visitor blacklisted successfully');
        },5000);
    }
}