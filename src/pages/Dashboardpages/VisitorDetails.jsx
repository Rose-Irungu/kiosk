import React from 'react'
import Layout from '../../components/layout/Layout.jsx'
import { useLocation } from 'react-router-dom';

const VisitorDetails = () => {
    const location = useLocation();
    const visitorData = location.state?.visitorData;
    return (
        <>
            <Layout>
                {/* Overall container */}
                <div className='flex flex-col gap-4 items-center  '>
                    {/* container one with photo and mini details */}
                    <div className='bg-[#FFFF] border-[#005E0E] border-l-4 rounded-lg p-4 w-full'>
                        <div className='flex flex-row justify-start items-center gap-2'>
                            {/* photo */}
                            <div className='rounded-full w-[100px] h-[100px] bg-gray-400 overflow-hidden'>
                                <img
                                    src={visitorData.visitor_photo}
                                    alt="profile photo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* text */}
                            <div className='flex flex-col items-start gap-6 font-["Inter"] p-4'>
                                <p className='text-xl font-medium text-[#495057]'>{visitorData.visitor_name}</p>

                                <div className='flex flex-row justify-between gap-2 items-center'>
                                    <p className='text-sm text-[#495057]'>Current Status:</p>
                                    {/* badge */}
                                    <div
                                        className={`rounded-lg p-2 ${visitorData.status === "approved"
                                                ? "bg-[#005E0E1A]/50 text-green-800"
                                                : visitorData.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-gray-100 text-gray-800" // default for other statuses
                                            }`}
                                    >
                                        <p className='text-sm text-[#495057]'>
                                            {visitorData.status === "approved"
                                                ? "CHECKED IN"
                                                : visitorData.status === "pending"
                                                    ? "PENDING"
                                                    : visitorData.status === "checked_in"
                                                    ? "CHECKED IN"
                                                    : visitorData.status || "N/A"}
                                        </p>
                                    </div>

                                </div>


                            </div>

                        </div>


                    </div>
                    {/* container with details */}
                    <div className='flex flex-row items-start justify-between gap-2 w-full '>
                        {/* 1st left container  */}
                        <div className='bg-[#FFFF] shadow-[0px_1px_4px_0px_rgba(0,_0,_0,_0.1) ] rounded-lg p-4 w-[468.5px]  '>
                            <div className='flex flex-row gap-3 items-start justify-start mb-4 font-["Inter"] px-2'>
                                <img src="/personal-info.svg" alt="" />
                                <p className='font-medium text-base text-[#495057]'>Personal Information</p>
                            </div>

                            <div className='flex flex-row justify-between w-full border-b font-["Inter"] p-2 mb-4 text-[#495057]'>
                                <p className='text-sm'>Full Name</p>
                                <p className='text-sm'>{visitorData.visitor_name}</p>

                            </div>
                            <div className='flex flex-row justify-between w-full border-b font-["Inter"] p-2 mb-4 text-[#495057]'>
                                <p className='text-sm'>Phone Number</p>
                                <p className='text-sm'>{visitorData.phone_number ?? "N/A"}</p>

                            </div>

                            <div className='flex flex-row justify-between w-full border-b font-["Inter"] p-2 mb-4 text-[#495057]'>
                                <p className='text-sm'>Email</p>
                                <p className='text-sm'>{visitorData.visitor_email ?? "N/A"}</p>

                            </div>
                            <div className='flex flex-row justify-between w-full border-b font-["Inter"] p-2 mb-4 text-[#495057]'>
                                <p className='text-sm'>Car Number Plate</p>
                                <p className='text-sm'>{visitorData.car_number_plate ?? "N/A"}</p>

                            </div>


                            <div className='flex flex-row justify-between w-full border-b font-["Inter"] p-2 mb-4 text-[#495057]'>
                                <p className='text-sm'>Visitor Type</p>
                                <p className='text-sm'>{visitorData.visitor_type ?? "N/A"}</p>

                            </div>

                        </div>

                        {/* 2nd right container  */}
                        <div className='bg-[#FFFF] shadow-[0px_1px_4px_0px_rgba(0,_0,_0,_0.1) ] rounded-lg p-4 w-[468.5px]  '>
                            <div className='flex flex-row gap-3 items-start justify-start mb-4 font-["Inter"] px-2'>
                                <img src="/carbon_order-details.svg" alt="" />
                                <p className='font-medium text-base text-[#495057]'>Current Visit Details</p>
                            </div>

                            <div className='flex flex-row justify-between w-full border-b font-["Inter"] p-2 mb-4 text-[#495057]'>
                                <p className='text-sm'>Visit Unit</p>
                                <p className='text-sm'>{visitorData.unit_number ?? "N/A"}</p>

                            </div>
                            <div className='flex flex-row justify-between w-full border-b font-["Inter"] p-2 mb-4 text-[#495057]'>
                                <p className='text-sm'>Check-In Time</p>
                                <p className='text-sm'>{visitorData.check_in ?? "N/A"}</p>

                            </div>

                            <div className='flex flex-row justify-between w-full border-b font-["Inter"] p-2 mb-4 text-[#495057]'>
                                <p className='text-sm'>Visit Date</p>
                                <p className='text-sm'>{visitorData.visit_date ?? "N/A"}</p>

                            </div>
                            <div className='flex flex-row justify-between w-full border-b font-["Inter"] p-2 mb-4 text-[#495057]'>
                                <p className='text-sm'>Duration</p>
                                <p className='text-sm'>{visitorData.visit_date ?? "N/A"}</p>

                            </div>




                        </div>

                    </div>

                </div>
            </Layout>


        </>

    )
}

export default VisitorDetails
