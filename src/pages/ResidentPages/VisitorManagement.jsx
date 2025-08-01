import React, { useState } from 'react'
import SecurityLayout from '../../components/SecurityComponents/SecurityLayout.jsx'

const VisitorManagement = () => {

    const buttons = [
        { id: 'btn1', label: 'Expected' }, ,
        { id: 'btn2', label: 'Pending' },
        { id: 'btn3', label: 'Onsite' },

    ];

    const datebuttons = [
        { id: 'dt1', day: 'sun', daynum: '12' }, ,
        { id: 'dt2', day: 'mon', daynum: '13' },
        { id: 'dt3', day: 'tue', daynum: '14' },
        { id: 'dt4', day: 'wed', daynum: '15' },
        { id: 'dt7', day: 'thurs', daynum: '18' },
        { id: 'dt8', day: 'fri', daynum: '19' },
        { id: 'dt9', day: 'sat', daynum: '20' },
        { id: 'dt10', day: 'sun', daynum: '21' },
        { id: 'dt11', day: 'mon', daynum: '22' },
        
        


    ];



    const [active, setActive] = useState(null);

    const [day, setDay] = useState(null);

    const handleClick = (id) => {
        setActive(id);

    };

    const changeColor = (id) => {
        setDay(id);
    }




    return (
        <>
            <SecurityLayout >

                {/* Main Container 1 - Guest List */}
                <div className='flex flex-col items-start gap-4 bg-[#E6FBE9] justify-between rounded-sm mx-auto mb-[32px] p-3 rounded-[12px]  '>
                    {/* h1, Icon and Invite Guest Button */}
                    <div className='flex flex-row justify-between items-center w-full'>
                        <div className='flex items-start gap-2 flex-row justify-between'>
                            <img src="/guests.svg" alt="" />
                            <h1 className='text-[24px] font-["DM Sans"] text-[#002706] font-semibold'>My Guests</h1>
                        </div>

                        <div className='flex h-[32px]  bg-[#005E0E] rounded-md text-white shadow items-center justify-between p-2 gap-2 text-[14px] font-semibold font-["DM Sans"] hover:bg-red-500 '>

                            <button className='flex items-center justify-between  ' ><img src="/plus-visitors.svg" alt="" />Invite Guest</button>

                        </div>

                    </div>
                    {/* Expected, Pending, Onsite Buttons */}
                    <div className='rounded-full flex flex-row justify-between gap-2 p-1 bg-[#333333]/10 w-full'>
                        {buttons.map((button) => (
                            <button key={button.id}
                                className={button.id === active ? ' items-center w-[315px] h-[32px]  justify-center rounded-full bg-[#B0F1B9]' : 'items-center rounded-full w-[315px] h-[32px]  justify-center bg-[#FFFF]'}
                                onClick={() => setActive(button.id)}>
                                {button.label}
                            </button>
                        ))}


                    </div>


                    {/* Guest Details Card */}
                    <div className='flex flex-col items-center w-full overflow-y-auto'>
                        <div className='w-[937px] h-[64px] bg-[#FFFF] mb-2 rounded-sm  flex flex-row items-center justify-between font-["DM Sans"] p-4 '>
                            <div className='flex flex-row justify-between gap-4 items-center '>

                                <div className="flex items-center justify-center w-10 h-10 bg-[#005E0E]/5 rounded-full shrink-0">
                                    <img src="/oui-gear2.svg" alt="" />
                                </div>

                                <div className='flex flex-col items-start w-full'>
                                    <p className='text-sm font-medium text-[#002706] '>Robert Nanjala</p>
                                    <p className='text-[12px] text-[#333333]'>Check In Time: 12PM</p>


                                </div>
                            </div>

                            <div className='rounded-md bg-[#B0F1B9] flex items-center w-[64px] h-[22px] justify-center '>
                                <p className='text-sm text-[#002706]'>guest</p>
                            </div>


                        </div>






                    </div>




                </div>



                {/* Main Container 2 - Callendar */}
                <div className='bg-[#B0F1B9]/50 flex flex-col gap-2 font-["DM Sans"] p-3 w-full mb-[32px] rounded-[12px]'>

                    <h1 className='text-[24px] font-semibold pb-4 '>See guests by date</h1>




                    <div className='flex flex-row items-center gap-6 border-[#54E168] border-[2.77974px] rounded-[33.3569px] bg-[#FFFF] py-4 px-4 font-["DM Sans"] w-full  '>
                        {datebuttons.map((datebutton) => (
                            <button key={datebutton.id}
                                className={datebutton.id === day ? ' text-[24px]  font-semibold bg-[#B0F1B9] flex flex-col justify-center w-[80px] h-[80px] border-[2.77974px] rounded-[22.2379px] border-[#54E168] items-center shadow-[6.04594px_6.04594px_12.0919px_0px_rgba(0,_88,_13,_0.25)]' : 'text-[24px]  bg-[#FFFF] flex flex-col justify-center w-[80px] h-[80px] border-[2.77974px] rounded-[22.2379px] border-[#54E168] items-center shadow-[6.04594px_6.04594px_12.0919px_0px_rgba(0,_88,_13,_0.25)]'}
                                onClick={() => setDay(datebutton.id)}>
                                <p className='text-[#6C50EF]' >{datebutton.day}</p>
                                <p >{datebutton.daynum}</p>

                            </button>
                        ))}
                    </div>



                </div>


                {/* Main Conatiner 3 - Restricted Guests Table */}
                <div className='flex flex-col gap-2  bg-[#F0EEFD] mb-[32px] p-3 rounded-[12px]'>
                    <div className='flex items-start gap-2 flex-row justify-start pb-4'>
                        <img src="/restricted-button.svg" alt="" />
                        <h1 className='text-[24px] font-["DM Sans"] text-[#002706] font-semibold'>Restricted Guests</h1>
                    </div>


                    <div className='w-[937px] h-[64px] bg-[#FFFF] mb-2 rounded-sm  flex flex-row items-center justify-between font-["DM Sans"] p-4 '>
                        <div className='flex flex-row justify-between gap-4 items-center '>

                            <div className="flex items-center justify-center w-10 h-10 bg-[#005E0E]/5 rounded-full shrink-0">
                                <img src="/oui-gear2.svg" alt="" />
                            </div>

                            <div className='flex flex-col items-start w-full'>
                                <p className='text-sm font-medium text-[#002706] '>Robert Nanjala</p>
                                <p className='text-[12px] text-[#333333]'>Check In Time: 12PM</p>


                            </div>
                        </div>




                    </div>




                </div>
            </SecurityLayout>


        </>






    )
}

export default VisitorManagement
