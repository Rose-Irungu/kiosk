import React, {useState, useEffect} from 'react';

//Components
import Header2 from '../../components/ResidentComponents/Settings/Header2';
import ResidentLayout from '../../components/ResidentComponents/ResidentLayout';
import CurrentDevice from '../../components/ResidentComponents/Settings/CurrentDevice';
import OtherDevice from '../../components/ResidentComponents/Settings/OtherDevice';
import { useNavigate } from 'react-router-dom';
import NoteP from '../../components/ResidentComponents/SafetyCards/NoteP';

//scripts
import { getLoggedDevices } from '../../services/getLoggedDevices';
import logoutDevice from '../../services/logoutDevice';

export default function LoggedDevices() {
  const [loggedDevices, setLoggedDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async() =>{

    const response = await getLoggedDevices();
    setLoading(true);

    setLoggedDevices(response);
    setLoading(false);
    return  response;
    
  }

  useEffect(()=>{
    fetchData();
  },[]);

  console.log("Logged devices:", loggedDevices)

  
  return (
    <ResidentLayout>
        <div className="flex flex-wrap flex-col justify-start mb-[12px] space-y-4">
          {loading ? (<NoteP text="Loading.."/>): (
            <>
              <Header2 icon="/mshale.svg" text="Logged In Devices" callback={()=>navigate("/resident/settings")}/>
              <input type="text" className='flex flex-row w-full h-[40px] rounded-[8px] border-[1px] border-[#E6FBE9] gap-[10px] py-[3px] px-[16px] bg-[#FFFFFF] ' style={{marginTop:'16px'}} placeholder={"Search devices"}/>
              <CurrentDevice os="Android" place={"Nairobi, Kenya"} time={"4 hours ago"} browser={"chrome"}/>
              {loggedDevices.length > 0 && loggedDevices.map((device) =>{
                return <OtherDevice key={device.device_id} os={device.os} place={"Nairobi, Kenya"} time={"4 hours ago"} browser={device.browser} callback={()=>logoutDevice(device.device_id)}/>
              })}
            </>
          )}
        </div>
    </ResidentLayout>
  );
}