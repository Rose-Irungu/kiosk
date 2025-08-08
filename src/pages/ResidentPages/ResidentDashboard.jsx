import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
//import InviteGuest from '../../components/ResidentComponents/Buttons/InviteGuest';
import SosButton from '../../components/ResidentComponents/Buttons/SosButton';
import SafetyProtocolsButton from '../../components/ResidentComponents/Buttons/SafetyProtocolsButton';
import PastGuestsButton from '../../components/ResidentComponents/Buttons/PastGuestsButton';
import MyGuestsFrame from '../../components/ResidentComponents/ResidentCards/MyGuestsFrame';
import ResidentLayout from '../../components/ResidentComponents/ResidentLayout';
import PastToday from '../../components/ResidentComponents/SafetyCards/PastToday';
import PastThisWeek from '../../components/ResidentComponents/SafetyCards/PastThisWeek';
import PastThisMonth from '../../components/ResidentComponents/SafetyCards/PastThisMonth';
import NoteP from '../../components/ResidentComponents/SafetyCards/NoteP';

//Service imports
import {clickTest} from '../../services/residentDashboardServices';
import { submitEmergency } from '../../scripts/submitEmergency';
import { getAllVisitors } from '../../services/residentDashboardServices';

function ResidentDashboard() {

    const [activeCardId, setActiveCardId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [visitors, setVisitors] = useState([]);
    const navigate = useNavigate();

    const notify = () => {
    toast.custom((t) => (
        <div
        className={`bg-white border border-red-500 text-red-700 rounded px-4 py-2 flex items-center gap-4 shadow-md ${
            t.visible ? 'animate-enter' : 'animate-leave'
        }`}
        >
        <span>🚨 S.O.S triggered successfully</span>
        <button
            onClick={() => toast.dismiss(t.id)}
            className="ml-auto text-red-500 hover:text-red-700 font-bold"
        >
            ✖
        </button>
        </div>
    ), {
        duration: Infinity,
    });
    };

    useEffect(() =>{

        const getVisitors = async () =>{
            const allVisitors = await getAllVisitors();
            setVisitors(allVisitors);
            console.log("All visitors:", allVisitors);
            return allVisitors;
        };
        getVisitors();
        setLoading(false);
    }, []);

    const handleCardClick = (id) => {
        setActiveCardId(id);
    };

  return (
    <ResidentLayout>
     <div className="flex flex-wrap justify-start mb-[12px] space-y-4">
        <div className='flex flex-col w-full h-[341px] rounded-[12px] py-[12px] px-[8px] gap-[18px] bg-[#E6FBE9]'>
          <MyGuestsFrame/>
        </div>
        <div className='flex flex-col w-full lg:h-[222px] top-[521px] rounded-[12px] py-[8px] px-[12px] bg-[#F0EEFD] gap-[10px]'>
            <div className='flex flex-row justify-between w-full h-[32px]'>
                <div className='flex flex-row w-[182px] h-[32px]'>
                    <div className='h-[32px] w-[32px]'>
                        <img
                            src="/mgeni.svg"
                            className="w-full h-full text-red-500 mr-3"
                        />
                    </div>
                    <div className='w-[138px] h-[31px]'>
                        <h1 className='font-dmsans font-semibold text-[24px] sm:text-[18px] text-[#002706]'>Past Guests</h1>
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-between w-full h-[40px] rounded-[24px] py-[4px] px-[8px] gap-[10px]'>
                <PastGuestsButton label={"Today"} callback={() => clickTest} onCardClick={handleCardClick} id = "card1" activeCardId={activeCardId}/>
                <PastGuestsButton label={"This Week"} callback={() => clickTest} onCardClick={handleCardClick} id = "card2" activeCardId={activeCardId}/>
                <PastGuestsButton label={"This Month"} callback={() => clickTest} onCardClick={handleCardClick} id = "card3" activeCardId={activeCardId}/>
            </div>
            <div className='flex flex-row w-full h-[106px] py-[12px] px-[8px] gap-[10px]'>
                {loading? (<NoteP text={"Loading..."}/>) : (activeCardId == 'card1' ? (<PastToday allVisitors={visitors}/>) : activeCardId == 'card2' ? (<PastThisWeek allVisitors={visitors}/>) : <PastThisMonth allVisitors={visitors}/>)}
            </div>
        </div>
        <div className='flex flex-col w-full lg:h-[165px] lg:top-[784px] rounded-[12px] py-[10px] px-[20px] bg-[#FDE8E7]'>
            <div className='flex flex-row justify-between w-full h-[32px]'>
                <div className='flex flex-row justify-center gap-[12px] w-[262px] h-[32px]'>
                    <div className='h-[32px] w-[32px]'>
                        <img
                            src="/emg.svg"
                            className="w-full h-full text-red-500 mr-3"
                            alt="emergency icon"
                        />
                    </div>
                    <div className='w-[218px] h-[31px]'>
                        <h1 className='font-dmsans font-semibold sm:text-base text-[24px] text-[#610C07]'>Emergencies Panel</h1>
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-between w-full h-[96px] rounded-[12px] py-[12px] px-[14px] space-x-4'>
                <SosButton callback={() => {
                           submitEmergency();
                           notify();
                    }}/>
                <SafetyProtocolsButton callback={()=>navigate("/resident/safetyprotocols")}/>
            </div>
        </div>
     </div>
     </ResidentLayout>
  );
}

export default ResidentDashboard;