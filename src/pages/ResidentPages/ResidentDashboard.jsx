import React, { useState, useEffect } from 'react';
import MyGuestsFrame from '../../components/ResidentComponents/ResidentCards/MyGuestsFrame';
import ResidentLayout from '../../components/ResidentComponents/ResidentLayout';
import Favorites from '../../components/ResidentComponents/Favorites/Favorites';
import NoteP from '../../components/ResidentComponents/SafetyCards/NoteP';

//Service imports
import getFavouriteVisitors from '../../services/getFavouriteVisitors';

function ResidentDashboard() {
    const [loading, setLoading] = useState(true);
    const [visitors, setVisitors] = useState([]);


    useEffect(() =>{

        const getVisitors = async () =>{
            const faveVisitors = await getFavouriteVisitors();
            setVisitors(faveVisitors);
            console.log("Favourite visitors:", faveVisitors);
            return faveVisitors;
        };
        getVisitors();
        console.log(`The shit got here`);
        setLoading(false);
    }, []);

  return (
    <ResidentLayout>
     <div className="flex flex-wrap flex-col justify-center mb-[12px] space-y-4">
        <div className='flex flex-col w-full h-[341px] rounded-[12px] py-[12px] px-[8px] gap-[18px] bg-[#E6FBE9]'>
          <MyGuestsFrame/>
        </div>
        <div className='flex flex-col w-full h-[341px] rounded-[12px] py-[12px] px-[8px] gap-[18px] bg-[#E6FBE9]'>
          {loading? (<NoteP text={"Loading..."}/>) : (<Favorites guests={visitors}/>)}
        </div>
     </div>
     </ResidentLayout>
  );
}

export default ResidentDashboard;