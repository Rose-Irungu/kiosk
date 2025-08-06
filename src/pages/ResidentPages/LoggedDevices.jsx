import React from 'react';

//Components
import Header2 from '../../components/ResidentComponents/Settings/Header2';
import ResidentLayout from '../../components/ResidentComponents/ResidentLayout';
import CurrentDevice from '../../components/ResidentComponents/Settings/CurrentDevice';
import OtherDevice from '../../components/ResidentComponents/Settings/OtherDevice';
import { useNavigate } from 'react-router-dom';

//Sample test function
function testButton(){
    console.log('Signed out successfully!');
}

export default function LoggedDevices() {
    const navigate = useNavigate();
  return (
    <ResidentLayout>
        <div className="flex flex-wrap flex-col justify-start mb-[12px] space-y-4">
            <Header2 icon="/mshale.svg" text="Logged In Devices" callback={()=>navigate("/resident/settings")}/>
            <input type="text" className='flex flex-row w-full h-[40px] rounded-[8px] border-[1px] border-[#E6FBE9] gap-[10px] py-[3px] px-[16px] bg-[#FFFFFF] ' style={{marginTop:'16px'}} placeholder={"Search devices"}/>
            <CurrentDevice os="Android" place={"Nairobi, Kenya"} time={"4 hours ago"} browser={"chrome"}/>
            <OtherDevice os="Android" place={"Nairobi, Kenya"} time={"4 hours ago"} browser={"chrome"} callback={()=>testButton()}/>
        </div>
    </ResidentLayout>
  );
}