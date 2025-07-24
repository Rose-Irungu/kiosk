import React, { useState } from 'react'
import Layout from '../../components/layout/Layout.jsx'
import { Upload, ChevronDown, Calendar } from "lucide-react";
import SecurityLayout from '../../components/SecurityComponents/SecurityLayout.jsx';
import { securityRegistervisitor } from '../../services/securityVisitorRegister.js';


export default function VisitorRegistration() {
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [FormData, setFormData] = useState({
        full_name: '',
        email: '',
        phone_number: '',
        visitor_type: '',
        visit_date: '',
        unit_number: '',
        plate_number: '',
        photo: ''
    })

    const handleChange = (e) => {
        setFormData({ ...FormData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        //  writing logic to send form to backend
        e.preventDefault()
        try {

            const result = await securityRegistervisitor(FormData);
            setSuccess("Visitor successfully registered")
            setError('')
            console.log(FormData)

        } catch (error) {
            console.error("failed to register visitor", error);
            setError("Registration Failed, Please try again");
            setSuccess('')
        }
    };

    return (
        <SecurityLayout>
            <div className="flex flex-col items-start p-6 gap-8 w-full max-w-md md:max-w-xl bg-white rounded-[10px] shadow-md mx-auto mt-10">
                <h2 className="text-2xl font-bold text-[#495057] font-['Inter']">
                    Visitor Registration
                </h2>

                <form action="" className="w-full font-['Roboto'] gap-4" onSubmit={handleSubmit} >
                    {success && <p>{success}</p>}

                    <div className="flex flex-col gap-2 w-full mt-1">
                        <label className="text-sm text-[#495057]  ">Full Name<span className='text-[#E61C11]'>*</span></label>
                        <input
                            type="text"
                            placeholder='e.g John Doe'
                            name='full_name'
                            value={FormData.full_name} onChange={handleChange}
                            className="h-12 px-4 rounded-lg   focus:ring-2 focus:ring-green-600 bg-[#F4F4F4] w-full"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 w-full mt-4">
                        <div className="flex flex-col gap-2 w-full md:w-1/2">
                            <label className="text-sm text-[#495057] ">
                                Email<span className="text-[#E61C11]">*</span>
                            </label>
                            <input
                                type="text"
                                className="h-12 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-[#F4F4F4] w-full"
                                placeholder='e.g john@gmail.com'
                                name='email'
                                value={FormData.email} onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full md:w-1/2">
                            <label className="text-sm text-[#495057] ">
                                Phone No.<span className="text-[#E61C11]">*</span>
                            </label>
                            <input
                                type="text"
                                name='phone_number'
                                value={FormData.phone_number} onChange={handleChange}
                                className="h-12 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-[#F4F4F4] w-full"
                                placeholder='e.g 07XXXXXXXX'
                            />
                        </div>
                    </div>


                    {/* Visitor Type */}
                    <div className="flex flex-col gap-2 w-full mt-4">
                        <label className="text-sm text-[#495057]  ">Visitor Type<span className='text-[#E61C11]'>*</span></label>
                        <div className="relative">
                            <select
                                className="appearance-none h-12 px-4 pr-10 rounded-lg bg-[#F4F4F4] focus:outline-none focus:ring-2 focus:ring-green-600 w-full text-[#495057]"
                                name='visitor_type'
                                value={FormData.visitor_type} onChange={handleChange}
                                required
                            >
                                <option value="">Select type</option>
                                <option value="visitor">visitor</option>
                                <option value="service_provider">service_provider</option>
                                <option value="company_visitor">company_visitor</option>
                            </select>

                            <ChevronDown
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#495057] pointer-events-none w-4 h-4"
                            />
                        </div>
                    </div>






                    {/* House Number + Car Number Plate */}
                    <div className="flex flex-col md:flex-row gap-6 w-full mt-4">
                        <div className="flex flex-col gap-2 w-full md:w-1/2">
                            <label className="text-sm text-[#495057] ">
                                House Number
                            </label>
                            <input
                                type="text"
                                className="h-12 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-[#F4F4F4] w-full"
                                placeholder='e.g B-05A'
                                name='unit_number'
                                value={FormData.unit_number} onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full md:w-1/2">
                            <label className="text-sm text-[#495057] ">
                                Car Number Plate
                            </label>
                            <input
                                type="text"
                                className="h-12 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-[#F4F4F4] w-full"
                                placeholder='e.g KDQ XXXX '
                                name='plate_number'
                                value={FormData.plate_number} onChange={handleChange}
                            />
                        </div>
                    </div>


                    <div className="flex flex-col gap-2 w-full mt-4">
                        <label className="text-sm text-[#495057] ">Photo</label>
                        <label
                            htmlFor="photo"
                            className="flex flex-col justify-center items-center gap-2 w-full h-[98px] bg-[#F4F4F4] rounded-[4px] cursor-pointer"
                        >
                            <Upload className="text-[#495057]" />
                            <span className="text-sm text-[#6C757D]">
                                {FormData.photo ? FormData.photo.name : "Upload a Photo"}
                            </span>
                            <input
                                id="photo"
                                type="file"
                                name="photo"
                                onChange={handleChange}
                                className="hidden"
                                accept="image/*"
                            />
                        </label>
                    </div>

                    <button className="flex items-center justify-center gap-4 w-full h-12 shadow-[0_1px_10px_rgba(0,0,0,0.25)] bg-[#005E0E] text-white  rounded-md hover:bg-green-700 transition mt-4 text-sm">
                        SUBMIT
                    </button>

                </form>


            </div>
        </SecurityLayout>
    );
}