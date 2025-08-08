export default function getVisitorType(visitorType) {
  try {
    switch (visitorType) {
      case "visitor":
        return "Visitor";
      case "company_visitor":
        return "Company";
      case "service_provider":
        return "Service";
      default:
        return "Unknown";
    }
  } catch (error) {
    console.log("Error establishing the visitor type");
    throw error;
  }
}
