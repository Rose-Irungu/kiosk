import React from 'react';
import { Siren } from "lucide-react";
import { useState } from 'react';
import { Upload } from 'lucide-react';
import { selectImage } from '../scripts/selectImage';
import { submitEmergency } from '../scripts/submitEmergency';
import { submitIncidence } from '../scripts/submitIncidence';

function Card6() {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');


  return (
    <div className='flex flex-col justify-between w-[237px] h-[594px] rounded-[10px] p-[16px] gap-[33px] bg-[#ffffff] border-none'>
        <div className='flex flex-col justify-between w-[205px] h-[173px] gap-[24px]'>
            <h1 className='w-[205px] h[-20px] font-inter font-bold text-[18px] leading-5 tracking-[1%] text-[#495057]'>Emergency Actions</h1>
            <button className='flex flex-row w-[205px] h-[56px] border-[1px] rounded-[4px] px-[12px] py-[18px] bg-[#E61C11] gap-[8px] text-white text-center space-x-4'
                  onClick={() =>{submitEmergency()}}>

                 <div className='flex flex-row'>
                    <img src="/911.svg" alt="Emergency Icon"className="w-6 h-6 object-contain text-white"/>
                    <span>Trigger Emergency</span>
                 </div>
            </button>
            <button className='flex flex-row justify-center border-[1px] border-[#005E0E] w-[205px] h-[56px] rounded-[4px] py-[10px] px-[24px] gap-[10px] text-center'>
                <span className='w-[119px] h-[20px] font-inter text-[14px] leading-5 tracking-[1%] text-[#005E0E] text-center'>
                    OPEN ROLL CALL
                </span>
            </button>
        </div>
        <div className='flex flex-col w-[205px] h-[356px] gap-[24px]'>
            <h1 className='w-[205px] h[-20px] font-inter font-bold text-[18px] leading-5 tracking-[1%] text-[#495057]'>Report Incident</h1>
            <div className='flex flex-col w-[205px] h-[312px] gap-[16px]'>
                <div className='flex flex-col justify-center w-[205px] h-[240px] gap-[12px]'>
                    <select name="type" value={type} onChange={(e) => setType(e.target.value)} placeholder='Type' className="flex flex-row justify-between w-[205px] h-[48px] rounded-[8px] px-[10px] bg-[#F4F4F4]">
                        <option value="maintenance_issue">Maintenance Issue</option>
                        <option value="poor_service">Poor Service</option>
                        <option value="neighbour_dispute">Neighbour Dispute</option>
                        <option value="suspicious_activity">Suspicious activity</option>
                    </select>
                    <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder='Describe incident' className='flex flex-row w-[205px] h-[70px] rounded-[4px] p-[10px] gap-[10px] bg-[#F4F4F4] text-[14px] font-inter font-normal leading-5 tracking-[1%] text-[#495057] align-text-top' />
                    <div className='flex flex-col justify-center items-center w-[205px] h-[98px] rounded-[4px] gap-[8px] bg-[#F4F4F4] p-[10px]'>
                        <div className='flex flex-row w-[40px] h-[40px] p-[5px] gap-[10px] '>
                            <button className='flex justify-center items-center' onClick={() =>{selectImage().then((result) => {setImage(result)});}} value={image}>
                                <Upload size={20} />
                            </button>
                        </div>
                        <p className='w-[205px] h-[20px] font-inter text-[14px] leading-5 tracking-[1%] text-center'>
                            Upload a Photo
                        </p>
                    </div>
                </div>
                <button className='flex flex-col w-[205px] h-[56px] gap-[8px] rounded-[8px] px-[24px] bg-[#005E0E] justify-center font-inter text-sm leading-5 tracking-[1%] text-white'
                    onClick={() => {submitIncidence(type, description);}}>
                        SUBMIT
                </button>
            </div>
        </div>
    </div>
  )
}

export default Card6;