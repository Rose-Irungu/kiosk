import React from 'react'
import Layout from '../../components/layout/Layout.jsx'
import { Upload, ChevronDown, Calendar } from "lucide-react";
import SecurityLayout from '../../components/SecurityComponents/SecurityLayout.jsx';


export default function VisitorRegistration() {
    return (
        <SecurityLayout>
            <div className="flex flex-col items-start p-6 gap-8 w-full max-w-md md:max-w-xl bg-white rounded-[10px] shadow-md mx-auto mt-10">
                <h2 className="text-2xl font-bold text-[#495057] font-['Inter']">
                    Visitor Registration
                </h2>

                <form action="" className="w-full font-['Roboto'] gap-4">

                    <div className="flex flex-col gap-2 w-full mt-1">
                        <label className="text-sm text-[#495057] font-medium ">Full Name <span className='text-[#E61C11]'>*</span></label>
                        <input
                            type="text"
                            placeholder='e.g John Doe'

                            className="h-12 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-[#F4F4F4] w-full"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 w-full mt-4">
                        <div className="flex flex-col gap-2 w-full md:w-1/2">
                            <label className="text-sm text-[#495057] font-medium">
                                Email <span className="text-[#E61C11]">*</span>
                            </label>
                            <input
                                type="text"
                                className="h-12 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-[#F4F4F4] w-full"
                                placeholder='e.g john@gmail.com'
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full md:w-1/2">
                            <label className="text-sm text-[#495057] font-medium">
                                Phone No. <span className="text-[#E61C11]">*</span>
                            </label>
                            <input
                                type="text"
                                className="h-12 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-[#F4F4F4] w-full"
                                placeholder='e.g 07XXXXXXXX'
                            />
                        </div>
                    </div>


                    {/* Visitor Type + Date */}
                    <div className="flex flex-col md:flex-row gap-6 w-full mt-4">
                        <div className="flex flex-col gap-2 w-full md:w-1/2">
                            <label className="text-sm text-[#495057] font-medium">
                                Visitor Type <span className="text-[#E61C11]">*</span>
                            </label>

                            <div className="relative">
                                <select
                                    className="appearance-none h-12 px-4 pr-10 rounded-lg bg-[#F4F4F4] focus:outline-none focus:ring-2 focus:ring-green-600 w-full text-[#495057]"
                                    required
                                >
                                    <option value="">Select type</option>
                                    <option value="Resident Guest">Resident Guest</option>
                                    <option value="Contractor">Contractor</option>
                                    <option value="Delivery">Delivery</option>
                                    <option value="Official Visit">Official Visit</option>
                                    <option value="Others">Others</option>
                                </select>

                                <ChevronDown
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#495057] pointer-events-none w-4 h-4"
                                />
                            </div>
                        </div>


                        <div className="flex flex-col gap-2 w-full md:w-1/2">
                            <label className="text-sm text-[#495057] font-medium">
                                Date <span className="text-[#E61C11]">*</span>
                            </label>

                            <div className="relative w-full">
                                <input
                                    type="date"
                                    className="h-12 px-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-[#F4F4F4] w-full text-[#495057]"
                                    placeholder="Select a date"
                                />
                                {/* <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#495057] w-5 h-5 pointer-events-none" /> */}
                            </div>
                        </div>

                    </div>

                    {/* House Number + Car Number Plate */}
                    <div className="flex flex-col md:flex-row gap-6 w-full mt-4">
                        <div className="flex flex-col gap-2 w-full md:w-1/2">
                            <label className="text-sm text-[#495057] font-medium">
                                House Number
                            </label>
                            <input
                                type="text"
                                className="h-12 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-[#F4F4F4] w-full"
                                placeholder='e.g B-05A'
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full md:w-1/2">
                            <label className="text-sm text-[#495057] font-medium">
                                Car Number Plate
                            </label>
                            <input
                                type="text"
                                className="h-12 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-[#F4F4F4] w-full"
                                placeholder='e.g KDQ XXXX '
                            />
                        </div>
                    </div>


                    <div className="flex flex-col gap-2 w-full mt-4">
                        <label className="text-sm text-[#495057] font-medium ">Photo</label>
                        <label
                            htmlFor="photo"
                            className="flex flex-col justify-center items-center gap-2 w-full h-[98px] bg-[#F4F4F4] rounded-[4px] cursor-pointer"
                        >
                            <Upload className="text-[#495057]" />
                            <span className="text-sm text-[#6C757D]">Upload Photo</span>
                            <input id="photo" type="file" className="hidden" />
                        </label>
                    </div>

                    <button className="flex items-center justify-center gap-4 w-full h-12 shadow-[0_1px_10px_rgba(0,0,0,0.25)] bg-[#005E0E] text-white font-medium rounded-md hover:bg-green-700 transition mt-4 text-sm">
                        SUBMIT
                    </button>

                </form>


            </div>
        </SecurityLayout>
    );
}