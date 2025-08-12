import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  createInvitation,
  getInvitation,
  submitInvitation,
} from "../services/visitorservice";

export const useVisitorForm = () => {
  const { token: urlToken } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const token = urlToken;

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    visit_date: "",
    plate_number: "",
    visitor_type: "visitor",
  
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isVisitorMode, setIsVisitorMode] = useState(false);
  const [isSecurityMode, setIsSecurityMode] = useState(false);
  const [isResidentMode, setIsResidentMode] = useState(false);

  useEffect(() => {
    if (token) {
      
      setIsVisitorMode(true);
      setIsSecurityMode(false);
      setIsResidentMode(false);
      fetchInvitationData();
    } else if (location.pathname.includes("security-checkin")) {
      
      setIsSecurityMode(true);
      setIsVisitorMode(false);
      setIsResidentMode(false);
    } else {
      
      setIsResidentMode(true);
      setIsVisitorMode(false);
      setIsSecurityMode(false);
    }
  }, [token, location.pathname]);

  const fetchInvitationData = async () => {
    if (!token) return;

    setLoading(true);
    setError("");
    try {
      const response = await getInvitation(token);
      const { data } = response;
      const visitor = data;
      const visit = visitor.latest_visit;

      setFormData((prevData) => ({
        ...prevData,
        full_name: visitor.full_name || "",
        email: visitor.email || "",
        phone_number: visitor.phone_number || "",
        plate_number: visitor.plate_number || "",
        visitor_type: visitor.visitor_type || "visitor",
        visit_date: visit?.visit_date || "",
        host_name: visit?.host_name || "", 
        unit_number: visit?.unit_number || "", 
      }));
    } catch (err) {
      setError("Failed to load invitation data");
      console.error("Error fetching invitation:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      for (const key in formData) {
        if (formData[key]) {
          data.append(key, formData[key]);
        }
      }

      if (isVisitorMode && token) {
        await submitInvitation(token, data);
        navigate("/landingpage");
      } else {
        
        await createInvitation(data);
        if (isResidentMode) {
          navigate("/guestregsuccess");
        } else {
          alert("Visitor registered successfully!");
        }
      }
    } catch (err) {
      setError("Failed to submit form");
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    isVisitorMode,
    isSecurityMode,
    isResidentMode,
    token,
    handleInputChange,
    handleSubmit,
  };
};
