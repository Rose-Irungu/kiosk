import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Upload } from 'lucide-react';
import selectImage from '../scripts/selectImage';
import { submitEmergency } from '../scripts/submitEmergency';
import { submitIncidence } from '../scripts/submitIncidence';

function Card6() {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [emergencyTriggered, setEmergencyTriggered] = useState(false);
  const [incidentSubmitted, setIncidentSubmitted] = useState(false);

  const handleEmergency = () => {
    submitEmergency();
    setEmergencyTriggered(true);
  };

  const handleIncidentSubmit = () => {
    submitIncidence(type, description, image);
    setIncidentSubmitted(true);
  };

  return (
    <div className="flex flex-col justify-between w-full lg:max-w-[237px] h-auto lg:h-[594px] rounded-[10px] p-4 gap-[33px] bg-white border-none">
      <div className="flex flex-col justify-between w-full gap-6">
        <h1 className="font-inter font-bold text-[18px] leading-5 tracking-[1%] text-[#495057]">
          Emergency Actions
        </h1>

        <button
          className={`flex flex-row w-full h-[56px] border rounded-[4px] px-3 py-4 gap-2 text-white text-center items-center justify-center ${
            emergencyTriggered ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#E61C11]'
          }`}
          onClick={handleEmergency}
          disabled={emergencyTriggered}
        >
          <img
            src="/911.svg"
            alt="Emergency Icon"
            className="w-6 h-6 object-contain"
          />
          <span>Trigger Emergency</span>
        </button>
        <Link to="/triggers/security" className="flex-1 min-w-0" >
          <button className="flex items-center justify-center border border-[#005E0E] w-full h-[56px] rounded-[4px] px-6 text-center">
            <span className="font-inter text-[14px] leading-5 tracking-[0.01em] text-[#005E0E]">
              OPEN ROLL CALL
            </span>
          </button>
        </Link>
      </div>

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
              <option value="">Type</option>
              <option value="maintenance_issue">Maintenance Issue</option>
              <option value="poor_service">Poor Service</option>
              <option value="neighbour_dispute">Neighbour Dispute</option>
              <option value="suspicious_activity">Suspicious Activity</option>
            </select>

            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Describe incident"
              className="w-full h-[70px] rounded-[4px] p-[10px] bg-[#F4F4F4] text-[14px] font-inter font-normal leading-5 tracking-[0.01em] text-[#495057] resize-none"
              disabled={incidentSubmitted}
            />

            <div className="flex flex-col items-center w-full rounded-[4px] gap-2 bg-[#F4F4F4] p-[10px]">
              <div
                className={`flex justify-center items-center w-10 h-10 p-[5px] ${
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
                <Upload size={20} />
              </div>
              <p className="font-inter text-[14px] leading-5 tracking-[1%] text-center text-[#495057]">
                Upload a Photo
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

export default Card6;
