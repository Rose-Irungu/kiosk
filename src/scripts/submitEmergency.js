import { createEmergency } from '../services/securityDashboardService';
export const submitEmergency = () => {
    const emergencyData = {
        emergency_type: "sos"
    }

    createEmergency(emergencyData);
    console.log("Emergency submitted successfully");
};