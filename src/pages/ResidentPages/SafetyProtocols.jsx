import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtocolCard from '../../components/ResidentComponents/Buttons/ProtocolCard';

export default function SafetyProtocols() {
    const navigate = useNavigate();
    const [activeCardId, setActiveCardId] = useState(null); 
    const handleCardClick = (id) => {
        setActiveCardId(id);
    };
  return (
    <div className="flex flex-wrap justify-start mb-[12px] space-y-4">
        <div className='flex flex-row w-full lg:h-[376px] rounded-[12px] p-[20px] gap-[46px] bg-[#FFFFFF]'>
            <div className='flex flex-col w-[349px] h-[336px] gap-[12px] bg-[#FFFFFF]'>
                <ProtocolCard image="/fire.svg" label={"Fire Safety"} callback={()=>navigate("")} onCardClick={handleCardClick} id="card1" activeCardId={activeCardId}/>
                <ProtocolCard image="/warn.svg" label={"Security Concerns"} callback={()=>navigate("")} onCardClick={handleCardClick} id="card2" activeCardId={activeCardId}/>
                <ProtocolCard image="/msee.svg" label={"Visitors and Deliveries"} callback={()=>navigate("")} onCardClick={handleCardClick} id="card3" activeCardId={activeCardId}/>
                <ProtocolCard image="/nare.svg" label={"Electricty and Water"} callback={()=>navigate("")} onCardClick={handleCardClick} id="card4" activeCardId={activeCardId}/>
                <ProtocolCard image="/elevator.svg" label={"Lift Safety"} callback={()=>navigate("")} onCardClick={handleCardClick} id="card5" activeCardId={activeCardId}/>
                <ProtocolCard image="/shield.svg" label={"Emergency Preparedness"} callback={()=>navigate("")} onCardClick={handleCardClick} id="card6" activeCardId={activeCardId}/>
            </div>
            <div className='flex flex-col w-[728px] h-[256.8px] gap-[21px]'></div>
        </div>
        <div className='flex flex-row w-full h-[102px] rounded-[12px] p-[10px] gap-[10px] bg-[#E6FBE9]'></div>
        <div className='flex flex-col w-full h-[432px] rounded-[12px] p-[20px] gap-[12px] bg-[#FFFFFF]'></div>
    </div>
  );
}
