 import { createIncidence } from "../services/securityDashboardService";
 export const submitIncidence = (type, description, image) =>{

    const incidenceData = {
        incident_type: type,
        incident_description: description,
        incident_image_url: image
    };

    console.log(`${type}, ${description}, ${image} submitted successfully`);
    createIncidence(incidenceData);
}