import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; 
import { ArrowLeft } from 'lucide-react'; // 
import { Upload } from 'lucide-react';
import selectImage from '../../scripts/selectImage';
import { submitIncidence } from '../../scripts/submitIncidence';
import ResidentLayout from "../../components/ResidentComponents/ResidentLayout";

function ReportIncidentCard() {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [incidentSubmitted, setIncidentSubmitted] = useState(false);
  const navigate = useNavigate(); 

  const handleIncidentSubmit = () => {
    submitIncidence(type, description, image);
    setIncidentSubmitted(true);
  };

  const handleBackNavigation = () => {
    navigate(-1);
  };

  return (
    <ResidentLayout>
      <button 
          onClick={handleBackNavigation}
          className="flex items-center gap-2 text-[#005E0E] font-inter text-sm font-medium hover:text-[#004A0B] transition-colors self-start"
        >
          <ArrowLeft size={16} />
          Back to Reports
        </button>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col justify-between w-full lg:max-w-[400px] h-auto lg:h-[594px] rounded-[10px] p-4 gap-[33px] bg-white border-none">
        
        
        

        <div className="flex flex-col w-full gap-6">
          <h1 className="font-inter font-bold text-[18px] leading-5 tracking-[1%] text-[#495057]">
            {incidentSubmitted ? 'Incident Reported Successfully!' : 'Report Incident'}
          </h1>

          {/* Success message */}
          {incidentSubmitted && (
            <div className="flex flex-col items-center gap-4 p-6 bg-green-50 rounded-[8px] border border-green-200">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-green-700 text-center font-inter text-sm">
                Your incident report has been submitted successfully. Our team will review it shortly.
              </p>
            </div>
          )}

          {/* Form - only shown when incident not submitted */}
          {!incidentSubmitted && (
            <div className="flex flex-col w-full gap-4">
              <div className="flex flex-col gap-3">
                <select
                  name="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full h-[48px] rounded-[8px] px-[10px] bg-[#F4F4F4]"
                >
                  <option value="">Category</option>
                  <option value="maintenance_issue">Maintenance Issue</option>
                  <option value="poor_service">Poor Service</option>
                  <option value="neighbour_dispute">Neighbour Dispute</option>
                  <option value="suspicious_activity">Suspicious Activity</option>
                </select>

                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  placeholder="Add a short Note"
                  className="w-full h-[200px] rounded-[4px] p-[10px] bg-[#F4F4F4] text-[14px] font-inter font-normal leading-5 tracking-[0.01em] text-[#495057] resize-none"
                />

                <div className="flex flex-col items-center w-full rounded-[4px] gap-2 bg-[#F4F4F4] p-[10px]">
                  <div
                    className="flex justify-center items-center w-10 h-10 p-[5px] cursor-pointer"
                    onClick={() => {
                      selectImage().then((result) => {
                        setImage(result);
                      });
                    }}
                  >
                    <Upload size={20} />
                  </div>
                  <p className="font-inter text-[14px] leading-5 tracking-[1%] text-center text-[#495057]">
                    Upload Media (Optional)
                  </p>
                </div>
              </div>

              <button
                className="w-full h-[56px] rounded-[8px] px-6 flex justify-center items-center font-inter text-sm leading-5 tracking-[1%] text-white bg-[#005E0E]"
                onClick={handleIncidentSubmit}
              >
                SUBMIT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </ResidentLayout>
  );
  
}

export default ReportIncidentCard;