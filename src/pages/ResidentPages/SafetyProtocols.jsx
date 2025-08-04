import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtocolCard from '../../components/ResidentComponents/Buttons/ProtocolCard';
import FireSafety from '../../components/ResidentComponents/SafetyCards/FireSafety';
import SecurityConcerns from '../../components/ResidentComponents/SafetyCards/SecurityConcerns';
import VisitorDeliveries from '../../components/ResidentComponents/SafetyCards/VisitorDeliveries';
import ElectricityWater from '../../components/ResidentComponents/SafetyCards/ElectricityWater';
import LiftSafety from '../../components/ResidentComponents/SafetyCards/LiftSafety';
import EmergencyPreparedness from '../../components/ResidentComponents/SafetyCards/EmergencyPrepearedness';
import SectionHeading from '../../components/ResidentComponents/SafetyCards/SectionHeading';
import EmergencyContacts from '../../components/ResidentComponents/SafetyCards/EmergencyContacts';
import Remember from '../../components/ResidentComponents/SafetyCards/Remember';
import ResidentLayout from '../../components/ResidentComponents/ResidentLayout';

export default function SafetyProtocols() {
    const navigate = useNavigate();
    const [activeCardId, setActiveCardId] = useState(null); 
    const handleCardClick = (id) => {
        setActiveCardId(id);
    };
  return (
    <ResidentLayout>
    <div className="flex flex-wrap justify-start mb-[12px] space-y-4">
        <div className='flex lg:flex-row w-full lg:h-[376px] rounded-[12px] p-[20px] gap-[46px] bg-[#FFFFFF] sm:flex-col sm:space-y-4 md:flex-col md:space-y-4'>
            <div className='flex flex-col w-[349px] h-[336px] gap-[12px] bg-[#FFFFFF]'>
                <ProtocolCard image="/fire.svg" label={"Fire Safety"} callback={()=>navigate("")} onCardClick={handleCardClick} id="card1" activeCardId={activeCardId}/>
                <ProtocolCard image="/warn.svg" label={"Security Concerns"} callback={()=>navigate("")} onCardClick={handleCardClick} id="card2" activeCardId={activeCardId}/>
                <ProtocolCard image="/msee.svg" label={"Visitors and Deliveries"} callback={()=>navigate("")} onCardClick={handleCardClick} id="card3" activeCardId={activeCardId}/>
                <ProtocolCard image="/nare.svg" label={"Electricity and Water"} callback={()=>navigate("")} onCardClick={handleCardClick} id="card4" activeCardId={activeCardId}/>
                <ProtocolCard image="/elevator.svg" label={"Lift Safety"} callback={()=>navigate("")} onCardClick={handleCardClick} id="card5" activeCardId={activeCardId}/>
                <ProtocolCard image="/shield.svg" label={"Emergency Preparedness"} callback={()=>navigate("")} onCardClick={handleCardClick} id="card6" activeCardId={activeCardId}/>
            </div>
            <div className='flex flex-col w-[728px] md:w-full sm:w-full h-[256.8px] gap-[21px]'>
                {activeCardId == 'card1' ? (<FireSafety/>) : activeCardId == 'card2' ? (<SecurityConcerns/>) : activeCardId == 'card3' ? <VisitorDeliveries/> : activeCardId == 'card4'? (<ElectricityWater/>) : activeCardId == 'card5' ? (<LiftSafety/>) : (<EmergencyPreparedness/>)}
            </div>
        </div>
        <div className='flex flex-row items-center justify-center w-full h-[102px] rounded-[12px] p-[10px] gap-[10px] bg-[#E6FBE9]'>
            <Remember />
        </div>
        <div className='flex flex-col w-full h-[432px] rounded-[12px] p-[20px] gap-[12px] bg-[#FFFFFF]'>
            <SectionHeading icon="/phone0.svg" text="Emergency Contacts"/>
            <EmergencyContacts icon1="/security0.svg" icon2="/phone-light.svg" heading="West Brook Security Guards" phoneOne="0712345678" phoneTwo="0723456789" />
            <EmergencyContacts icon1="/ex.svg" icon2="/phone-light.svg" heading="Nairobi County Fire & Rescue Services" phoneOne="0780000000" phoneTwo="0790000000" /> 
            <EmergencyContacts icon1="/group1.svg" icon2="/phone-light.svg" heading="Ambulances" phoneOne="1800-098-765" phoneTwo="1800-123-456" />         
        </div>
    </div>
    </ResidentLayout>
  );
}
