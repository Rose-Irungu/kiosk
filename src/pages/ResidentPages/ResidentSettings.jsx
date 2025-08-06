import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

//Components
import ResidentLayout from '../../components/ResidentComponents/ResidentLayout';
import User from '../../components/ResidentComponents/Settings/User';
import Header from '../../components/ResidentComponents/Settings/Header';
import PersonalInformation from '../../components/ResidentComponents/Settings/PersonalInformation';
import Cars from '../../components/ResidentComponents/Settings/Cars';
import HouseholdInformation from '../../components/ResidentComponents/Settings/HouseholdInformation';
import NotificationSettings from '../../components/ResidentComponents/Settings/NotificationSettings';
import DataStorageSettings from '../../components/ResidentComponents/Settings/DataStorageSettings';
import NoteP from '../../components/ResidentComponents/SafetyCards/NoteP';

//Scripts
import clearCache from '../../scripts/clearCache';

export default function ResidentSettings() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    const getUser = async() =>{
      const thisUser = await JSON.parse(localStorage.getItem("userInfo"));
      console.log(thisUser);
      setUser(thisUser);
    };
    getUser();
    setLoading(false);
  }, []);
  return (
    <ResidentLayout>
        <div className="flex flex-wrap flex-col justify-start mb-[12px] space-y-4">
          {loading? (<NoteP text="Loading"/>): (
            <>
              <User image={user.profile_picture} name={`${user.first_name} ${user.last_name}`} unit={user.unit}/>
              <Header icon="/msee.svg" text={"My Profile"}/>
              <PersonalInformation phone={user.phone_number} email={user.email}/>
              <Cars />
              <HouseholdInformation occupants={user.number_of_residents}/>
              <Header icon="/gear.svg" text={"My Settings"}/>
              <NotificationSettings/>
              <DataStorageSettings callback1={()=>clearCache(navigate, "/loginform")} callback2={()=>navigate("/resident/loggeddevices")}/>
            </>
          )}
        </div>
    </ResidentLayout>
  );
}