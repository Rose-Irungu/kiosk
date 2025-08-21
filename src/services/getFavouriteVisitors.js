import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

export default async function getFavouriteVisitors(){
    try{
        const response = await api.get(API_ENDPOINTS.GET_FAVOURITE_VISITORS);
        console.log(`${response.data}fetched successfully`);
        return response.data;
    } catch(err){
        console.error(`Error ${err} occurred while fetching `);
        throw err;
    }
}