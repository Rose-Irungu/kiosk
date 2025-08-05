import React, { useState } from 'react';
import { Link } from "react-router-dom";
import selectImage from '../scripts/selectImage';
import { submitIncidence } from '../scripts/submitIncidence';
import { Upload } from 'lucide-react';

function ReportIncidentCard() {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [incidentSubmitted, setIncidentSubmitted] = useState(false);

  

  const handleIncidentSubmit = () => {
    submitIncidence(type, description, image);
    setIncidentSubmitted(true);
  };

  return (
    <div className="flex flex-col justify-between w-full lg:max-w-[400px] h-auto lg:h-[594px] rounded-[10px] p-4 gap-[33px] bg-white border-none">
      

      <div className="flex flex-col w-full gap-6">
        <h1 className="font-inter font-bold text-[18px] leading-5 tracking-[1%] text-[#495057]">
          
          Report Incident
        </h1>

        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col gap-3">
            <select
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full h-[48px] rounded-[8px] px-[10px] bg-[#F4F4F4]"
              disabled={incidentSubmitted}
            >
              <option value="">Category</option>
              <option value="maintenance_issue">Maintenance Issue</option>
              <option value="poor_service">Poor Service</option>
              <option value="neighbour_dispute">Neighbor Dispute</option>
              <option value="suspicious_activity">Suspicious Activity</option>
            </select>

            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Add a short Note"
              className="w-full h-[200px] rounded-[4px] p-[10px] bg-[#F4F4F4] text-[14px] font-inter font-normal leading-5 tracking-[0.01em] text-[#495057] resize-none"
              disabled={incidentSubmitted}
            />

            <div className="flex flex-col items-center bg-green-600 w-full rounded-[4px] gap-2  p-[10px]">
              <div
                className={`flex justify-center items-center bg-green-600 w-5 h-5 p-[5px] ${
                  incidentSubmitted ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }`}
                onClick={() => {
                  if (!incidentSubmitted) {
                    selectImage().then((result) => {
                      setImage(result);
                    });
                  }
                }}
              >
                <Upload />
              </div>
              <p className=" text-[40px]  bg-green-600   text-center ">
                Upload Media (Optional)
              </p>
            </div>
          </div>

          <button
            className={`w-full h-[56px] rounded-[8px] px-6 flex justify-center items-center font-inter text-sm leading-5 tracking-[1%] text-white ${
              incidentSubmitted ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#005E0E]'
            }`}
            onClick={handleIncidentSubmit}
            disabled={incidentSubmitted}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportIncidentCard;
