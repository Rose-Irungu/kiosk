import { createIncidence } from "../services/securityDashboardService";

export const submitIncidence = (type, description, imageFile) => {
  const formData = new FormData();
  formData.append("incident_type", type);
  formData.append("incident_description", description);
  formData.append("incident_image", imageFile); // ← this should match the backend's expected field name

  console.log(`${type}, ${description}, ${imageFile.name} submitted successfully`);
  createIncidence(formData); // Pass FormData instead of a plain object
};
