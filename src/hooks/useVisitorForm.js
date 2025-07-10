import { useState, useEffect } from 'react';
import { useParams, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { createInvitation, getInvitation, submitInvitation } from '../services/visitorservice';

export const useVisitorForm = () => {
  const { token: urlToken } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  // Get token from either URL params or query params
  const token = urlToken || searchParams.get('token');
  
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    visit_date: '',
    host_name: '',
    unit_number: '',
    plate_number: '',
    visitor_type: 'visitor',
    photo: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisitorMode, setIsVisitorMode] = useState(false);
  const [isSecurityMode, setIsSecurityMode] = useState(false);
  const [isResidentMode, setIsResidentMode] = useState(false);
  const navigate = useNavigate();

  // Determine the mode based on route and token
  useEffect(() => {
    console.log('Token found:', token); // Debug log
    
    if (token) {
      setIsVisitorMode(true);
      setIsSecurityMode(false);
      setIsResidentMode(false);
      fetchInvitationData();
    } else if (location.pathname.includes('security-checkin')) {
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
    setError('');
    try {
      console.log('Fetching invitation data for token:', token); // Debug log
      const response = await getInvitation(token);
      console.log('Received invitation data:', response); // Debug log
      
      // Extract data from the API response structure
      const { data } = response;
      const visitor = data;
      const visit = visitor.latest_visit;
      
      setFormData(prevData => ({
        ...prevData,
        full_name: visitor.full_name || '',
        email: visitor.email || '',
        phone_number: visitor.phone_number || '',
        plate_number: visitor.plate_number || '',
        visitor_type: visitor.visitor_type || 'visitor',
        visit_date: visit?.visit_date || '',
        host_name: visit?.host_name || '',
        unit_number: visit?.unit_number || '',
      }));
    } catch (err) {
      setError('Failed to load invitation data');
      console.error('Error fetching invitation:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isVisitorMode && token) {
        // Visitor completing the invitation
        navigate('/guestregsuccess')
        await submitInvitation(token, formData);
        
      } else {
        // Resident creating invitation or security filling form
        await createInvitation(formData);
        if (isResidentMode) {
          alert('Invitation sent successfully!');
        } else {
          alert('Visitor registered successfully!');
        }
      }
    } catch (err) {
      setError('Failed to submit form');
      console.error('Error submitting form:', err);
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
    token, // Return token for debugging
    handleInputChange,
    handleSubmit
  };
};