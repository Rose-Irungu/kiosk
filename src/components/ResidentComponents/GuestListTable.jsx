import React, { useState } from 'react'
import { User } from 'lucide-react';
import { useLocation } from 'react-router-dom';



const GuestListTable = () => {
    const location = useLocation();
    const { day, daynum, month, year, fullDate, guests } = location.state || {};
    const [isLoading, Loading] = useState(true);
    // const location = useLocation();
    // let data = location.state?.datedata;
    // console.log(datedata)

    // const [visitors, setVisitors] = useState([]);

    // useEffect(() => {
    //         fetchVisitors();
    //     }, []);



    //     const fetchVisitors = async () => {
    //     // setLoading(true);
    //     try {
    //       if (visitorTypeFilter !== "all") {
    //         data = data.filter((v) => v.visitor_type === visitorTypeFilter);
    //         setFilteredAllVisitors(data);
    //         setVisitors();
    //       } else {
    //         setVisitors(data)
    //       }
    //       // } else {
    //       //   setVisitors([]);
    //       //   setFilteredAllVisitors([]);
    //       //   setTotalEntries(0);
    //       // }
    //     } catch (error) {
    //       setVisitors([]);
    //     } finally {
    //     //   setLoading(false);
    //     }
    //   };


    return (
        <div>
            <div className='flex flex-col gap-2 justify-between item-start '>
                {/* h1 + invite guest button */}
                <div className='flex flex-row justify-between items-center w-full'>
                    <div className='flex items-start gap-2 flex-row justify-between'>

                        <h1 className='text-[24px] font-["DM Sans"] text-[#002706] font-semibold'>{daynum}/{month}/{year}</h1>
                    </div>

                    <div className='flex h-[32px]  bg-[#005E0E] rounded-md text-white shadow-[0px_1px_10px_0px_rgba(0,_0,_0,_1.5)]/50 items-center justify-between p-2 gap-2 text-[14px] font-semibold font-["DM Sans"] hover:bg-green-500 '>

                        <button className='flex items-center justify-between  ' onClick={() => navigate('/guestform')} ><img src="/plus-visitors.svg" alt="" />Invite Guest</button>

                    </div>

                </div>

                {/* table/cards */}
                {/* Overall container */}
                <div className='flex flex-col items-center   '>
                    {/* table row */}
                    {guests && guests.length > 0 ? (
                        guests.map(guest => (
                            <div key={guest.visitor_id} className='flex flex-row w-full h-[64px] bg-[#FFFF] items-center justify-between shadow-[2px_2px_4px_0px_rgba(0,_88,_13,_0.25)] rounded-[8px] gap-2 p-2 mb-2'>
                                <div className="flex items-center justify-center w-10 h-10 bg-[#005E0E]/5 rounded-full shrink-0">
                                    <img src={guest.image  || "/boy-avatar.svg"} className="w-10 h-10 rounded-full object-cover" alt="" />
                                </div>

                                <div className='flex  items-start w-full'>
                                    <p className='text-[16px] font-medium text-[#002706] '>{guest.visitor_name}</p>

                                </div>

                                <div className='rounded-md bg-[#D1C9FA] flex items-center p-1 h-[22px] justify-center '>
                                    <p className='text-sm text-[#2D2264]'>{guest.visitor_type}</p>
                                </div>


                            </div>
                        ))
                    ) : (
                       <div className="w-full  h-[300px] flex items-center justify-center mx-auto">
                                <p className="text-[#495057] text-base ">No guests here :(</p>
                            </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default GuestListTable