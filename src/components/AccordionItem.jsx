import React from 'react'
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Optional: you can use any icon lib



const AccordionItem = ({ question, answer }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col items-start w-[834px] gap-[32px] mt-12 font-['Inter'] ">
            <div
                className="flex justify-between items-center w-full cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-base  text-gray-500">{question} </h3>
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <img src="/plus-accord.svg" alt="" />}
            </div>
            {isOpen && (
                <div className='flex justify-start items-start border w-full p-6 ' style={{ borderColor: "rgba(0, 94, 14, 0.2)" }}>
                    <p className="text-gray-600 text-base">
                    {answer}
                </p>
                </div>
                
            )}
        </div>
    )
}

export default AccordionItem
