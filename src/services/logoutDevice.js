import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";
import toast from "react-hot-toast";

export default async function logoutDevice(device_id){
    try{
        const response = await api.post(API_ENDPOINTS.LOGGED_DEVICES,{
            'action': "logout_device",
            'device_id':device_id
        });
        return response;
    } catch(error){
        console.log("Failed to log out prevoius device", error)
        throw error;
    } finally{
        setTimeout(()=>{
            toast.success('Device logged out successfully');
        },5000);
    }
}