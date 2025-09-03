import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from "lucide-react";
import AccordionItem from '../../components/AccordionItem';
import { useNavigate } from 'react-router-dom';




const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>

      {/* Navbar */}

      <nav className='flex flex-row justify-between items-center bg-[#FFFF] h-[80px] shadow-[0px_1px_4px_0px_rgba(0,_0,_0,_0.25)] px-12'>
        {/* logo */}
        <div className='flex items-center justify-center'>
          <img src="visitor-gate-logo-purple.svg" alt="" />

        </div>
        {/* Navbar Links */}
        <div className='flex flex-row justify-between items-center gap-[24px] font-semibold text-[18px] text-[#2D2264]'>
          <Link className='underline'>Home</Link>
          <Link className='hover:underline'>Features</Link>
          <Link className='hover:underline'>Contact Us</Link>
        </div>
        {/* Get Started Button */}
        <div className='flex items-center h-[56px] w-[143px] rounded-[8px] ml-[30px] bg-white border border-[#2D2264] justify-center hover:bg-[#2D2264] hover:border-white hover:shadow-lg hover:transition-all duration-300 ease-in-out'>
          <button 
          onClick = {()=> navigate('/loginform')}
          className='flex items-center  text-[16px] font-["DM Sans"] text-[#2D2264] hover:text-white'>LIVE DEMO</button>
        </div>

         <div className='flex items-center h-[56px] w-[143px] rounded-[8px] bg-[#2D2264] hover:bg-[#2a1c73] justify-center'>
          <button className='flex items-center  text-[16px] font-["DM Sans"] text-white'>GET STARTED</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='flex flex-row items-center justify-between px-16 '
        style={{
          background: `linear-gradient(90deg,rgba(45, 34, 100, 1) 0%, rgba(80, 60, 177, 1) 50%, rgba(0, 210, 30, 1) 100%)`,

        }}>
        {/* text section + button overall container */}
        <div className='flex flex-col items-center gap-[32px] my-[148px] justify-start   '>
          {/* big text */}
          <div className='text-[40px]  items-center font-["DM Sans"] gap-[32px] tracking-[0.5px] '>
            <h1 className='mb-[32px] font-semibold text-white'>Smarter Visitor Management<br /> for Safer Spaces</h1>
            <p className='text-[16px] items-start mb-[32px] text-white'>Secure, Smart, and Simple Visitor Management.<br />
              VisitorGate helps you manage guests, security, and emergencies with ease — all from one intuitive dashboard.</p>

              

            <div className='bg-[#FFFF] rounded-[8px] border-1 border-[#000000] w-[157px] h-[56px] flex items-center justify-center font-semibold my-[56px]'>
              <button className='flex items-center text-[16px] '>
                GET STARTED
              </button>

            </div>

          </div>



        </div>
        {/* image and spices */}
        <div className='overflow-hidden'>
          <img src="/man-n-tab.png" alt="" />
          {/* <img className='absolute left-[790px] top-[106px]  ' src="/spice-1.png" alt="" /> */}

        </div>


      </section>

      {/* Features */}
      <section className='flex flex-col items-center gap-6 p-16'>
        <h1 className='text-center items-center text-[36px] font-bold tracking-[0.5px] text-[#2D2264] font-["DM Sans"]'>Features</h1>

        <div className='grid grid-rows-2 grid-flow-col gap-20 mt-[75px]'>
          {/* feature 1 */}
          <div className='flex flex-row items-start gap-4'>
            <div className="flex items-center justify-center w-10 h-10 bg-[#2D2264]/5 rounded-full shrink-0">
              <img className='w-[20px] h-[20px]' src="/f-1.svg" alt="" />
            </div>
            <div className="flex flex-col items-start gap-2 font-['DM Sans'] w-full text-[#333333] tracking-[0.5px]">
              <p className="font-bold text-[20px]">Secure Visitor Registration</p>
              <p className=" text-[16px]">
                Visitors register via phone. Ensures only authenticated guests gain access.
              </p>

            </div>
          </div>
          {/* feature 2 */}
          <div className='flex flex-row items-start gap-4'>
            <div className="flex items-center justify-center w-10 h-10 bg-[#2D2264]/5 rounded-full shrink-0">
              <img className='w-[20px] h-[20px]' src="/f-2.svg" alt="" />
            </div>
            <div className="flex flex-col items-start gap-2 font-['DM Sans'] w-full text-[#333333] tracking-[0.5px]">
              <p className="font-bold text-[20px]">Check-in / Check-out Logging</p>
              <p className=" text-[16px]">
                Digital logs with timestamps for every entry and exit. Monitored and validated by security personnel.
              </p>

            </div>
          </div>
          {/* feature 3 */}
          <div className='flex flex-row items-start gap-4'>
            <div className="flex items-center justify-center w-10 h-10 bg-[#005E0E]/5 rounded-full shrink-0">
              <img className='w-[20px] h-[20px]' src="/f-1.svg" alt="" />
            </div>
            <div className="flex flex-col items-start gap-2 font-['DM Sans'] w-full text-[#333333] tracking-[0.5px]">
              <p className="font-bold text-[20px]">Real-Time Visitor Approval Workflow</p>
              <p className=" text-[16px]">
                Residents receive instant notifications to approve or reject visitors.
              </p>

            </div>
          </div>

          {/* feature 4 */}
          <div className='flex flex-row items-start gap-4'>
            <div className="flex items-center justify-center w-10 h-10 bg-[#005E0E]/5 rounded-full shrink-0">
              <img className='w-[20px] h-[20px]' src="/f-1.svg" alt="" />
            </div>
            <div className="flex flex-col items-start gap-2 font-['DM Sans'] w-full text-[#333333] tracking-[0.5px]">
              <p className="font-bold text-[20px]">Emergency Protocols</p>
              <p className=" text-[16px]">
                SOS and Panic Buttons for residents and security to trigger alerts. Super admin manages roll calls and emergency responses in real time.
              </p>

            </div>
          </div>
          {/* feature 5 */}
          <div className='flex flex-row items-start gap-4'>
            <div className="flex items-center justify-center w-10 h-10 bg-[#005E0E]/5 rounded-full shrink-0">
              <img className='w-[20px] h-[20px]' src="/f-2.svg" alt="" />
            </div>
            <div className="flex flex-col items-start gap-2 font-['DM Sans'] w-full text-[#333333] tracking-[0.5px]">
              <p className="font-bold text-[20px]">Real-Time Notifications</p>
              <p className=" text-[16px]">
                Alerts via SMS, email, and in-app for visitor arrivals, approvals, and emergencies.
              </p>

            </div>
          </div>
          {/* feature 6 */}
          <div className='flex flex-row items-start gap-4'>
            <div className="flex items-center justify-center w-10 h-10 bg-[#005E0E]/5 rounded-full shrink-0">
              <img className='w-[20px] h-[20px]' src="/f-2.svg" alt="" />
            </div>
            <div className="flex flex-col items-start gap-2 font-['DM Sans'] w-full text-[#333333] tracking-[0.5px]">
              <p className="font-bold text-[20px]">Visitor Logs & Activity Reports</p>
              <p className=" text-[16px]">
                Viewable by role (security, admin) in daily, weekly, or custom reports.
              </p>

            </div>
          </div>


        </div>


      </section>


      {/* Get Started */}
      <section className='flex flex-col items-center p-16 '>
        <h1 className='text-center items-center text-[36px] font-bold tracking-[0.5px] text-[#2D2264] font-["DM Sans"]'>Get Started</h1>

        <p className='text-center text-[#000000] text-[18px] mt-[11px]'>Simple, transparent pricing for visitor gate. No hidden charges. One plan. Full access</p>
        {/* Overall Container holding packages */}
        <div className='flex flex-row justify-between gap-4 pt-10 items-stretch  '>

          {/* packages */}
          <div className='flex flex-row items-center justify-between'>
            <div className='relative h-full w-[410px] shadow-[0px_1px_10px_0px_rgba(45,_34,_100,_0.15)] rounded-[24px] overflow-hidden' style={{
              background: `linear-gradient(90deg, rgba(45, 34, 100, 1) 0%, rgba(80, 60, 177, 1) 50%, rgba(0, 210, 30, 1) 100%)`,
            }}>
              {/* Background Image */}
              <img className="absolute inset-0 w-full h-full object-cover" src="/another-man-tablet.png" alt="" />

              {/* Top-Left Text */}
              <div className="absolute top-4 left-4 z-10 text-white font-semibold p-4 py-6">
                <p className='font-bold text-[28px]'>Relax</p>
                <p className='font-semibold text-[18px]'>We've got the <br /> gate covered.</p>
              </div>
            </div>




          </div>
          {/* packages */}
          <div className='flex flex-row items-center justify-between'>
            <div className='h-full w-full bg-[#FFFF] shadow-[0px_1px_10px_0px_rgba(45,_34,_100,_0.15)] rounded-[24px] flex flex-col items-center p-12'>
              <h1 className='text-[#2D2264] text-[28px] font-bold'>Standard</h1>
              <p className='text-[#666666] text-[14px] '>No credit card required. Cancel anytime.</p>

              <p className='text-[#333333] text-[18px] mt-[24px] '>KES 4500 per month/per location.
                or Or KES 49,000 / Year (Save 10%)</p>
              {/* List */}
              <div className='flex flex-col items-start justify-center gap-4 mt-[48px]'>



                <div className='flex flex-row items-center gap-2 justify-between'>
                  <div className="justify-center items-center flex">
                    <img src="/ticky.svg" alt="" />
                  </div >

                  <p className='text-[18px] text-[#000000]'>Unlimited visitor check-ins</p>
                </div>

                <div className='flex flex-row items-center gap-2 justify-between'>
                  <div className="justify-center items-center flex">
                    <img src="/ticky.svg" alt="" />
                  </div >

                  <p className='text-[18px] text-[#000000]'>Unlimited visitor check-ins</p>
                </div>

                <div className='flex flex-row items-center gap-2 justify-between'>
                  <div className="justify-center items-center flex">
                    <img src="/ticky.svg" alt="" />
                  </div >

                  <p className='text-[18px] text-[#000000]'>Guard, Resident and Super Admin
                    dashboards</p>
                </div>

                <div className='flex flex-row items-center gap-2 justify-between'>
                  <div className="justify-center items-center flex">
                    <img src="/ticky.svg" alt="" />
                  </div >

                  <p className='text-[18px] text-[#000000]'>Emergency alert tools</p>
                </div>

                <div className='flex flex-row items-center gap-2 justify-between'>
                  <div className="justify-center items-center flex">
                    <img src="/ticky.svg" alt="" />
                  </div >

                  <p className='text-[18px] text-[#000000]'>Email + SMS notifications
                    (fair use policy)</p>
                </div>

                <div className='flex flex-row items-center gap-2 justify-between'>
                  <div className="justify-center items-center flex">
                    <img src="/ticky.svg" alt="" />
                  </div >

                  <p className='text-[18px] text-[#000000]'> Ongoing updates & support</p>
                </div>
              </div>

              <div className='bg-[#2D2264] rounded-[12px] h-[46px] w-[303px] p-4 flex items-center justify-center mt-[32px]'>
                <button className='flex items-center text-white text-[20px]'>
                  Start Free Trial
                </button>

              </div>



            </div>
            <div className='bg-[#FFFF] shadow-[0px_1px_10px_0px_rgba(45,_34,_100,_0.15)] rounded-[24px]'>

            </div>
            <div className='bg-[#FFFF] shadow-[0px_1px_10px_0px_rgba(45,_34,_100,_0.15)] rounded-[24px]'>

            </div>

          </div>
          {/* packages */}
          <div className='flex flex-row items-center justify-between'>
            <div className='bg-[#FFFF] shadow-[0px_1px_10px_0px_rgba(45,_34,_100,_0.15)] rounded-[24px] flex flex-col items-center p-12 h-full w-full'>
              <h1 className='text-[#2D2264] text-[28px] font-bold'>Enterprise</h1>
              <p className='text-[#666666] text-[14px] '>Custom solutions for 5+ locations.</p>

              <p className='text-[#333333] text-[18px] mt-[24px] '>Contact sales for tailored pricing and deals.</p>
              {/* List */}
              <div className='flex flex-col items-start justify-center gap-4 mt-[48px]'>



                <div className='flex flex-row items-center gap-2 justify-between'>
                  <div className="justify-center items-center flex">
                    <img src="/ticky.svg" alt="" />
                  </div >

                  <p className='text-[18px] text-[#000000]'>Centralized admin panel for 5+ locations</p>
                </div>

                <div className='flex flex-row items-center gap-2 justify-between'>
                  <div className="justify-center items-center flex">
                    <img src="/ticky.svg" alt="" />
                  </div >

                  <p className='text-[18px] text-[#000000]'>Location-specific visitor rules & workflows</p>
                </div>

                <div className='flex flex-row items-center gap-2 justify-between'>
                  <div className="justify-center items-center flex">
                    <img src="/ticky.svg" alt="" />
                  </div >

                  <p className='text-[18px] text-[#000000]'>Shared watchlists across buildings or branches</p>
                </div>

                <div className='flex flex-row items-center gap-2 justify-between'>
                  <div className="justify-center items-center flex">
                    <img src="/ticky.svg" alt="" />
                  </div >

                  <p className='text-[18px] text-[#000000]'>Dedicated account manager</p>
                </div>

                <div className='flex flex-row items-center gap-2 justify-between'>
                  <div className="justify-center items-center flex">
                    <img src="/ticky.svg" alt="" />
                  </div >

                  <p className='text-[18px] text-[#000000]'>99.9% uptime SLA</p>
                </div>

                <div className='flex flex-row items-center gap-2 justify-between'>
                  <div className="justify-center items-center flex">
                    <img src="/ticky.svg" alt="" />
                  </div >

                  <p className='text-[18px] text-[#000000]'> Phone & priority email support</p>
                </div>

                <div className='flex flex-row items-center gap-2 justify-between'>
                  <div className="justify-center items-center flex">
                    <img src="/ticky.svg" alt="" />
                  </div >

                  <p className='text-[18px] text-[#000000]'> Onboarding & training for staff</p>
                </div>
              </div>

              <div className='bg-[#2D2264] rounded-[12px] h-[46px] w-[303px] p-4 flex items-center justify-center mt-[32px]'>
                <button className='flex items-center text-white text-[20px]'>
                  Start Free Trial
                </button>

              </div>



            </div>
            <div className='bg-[#FFFF] shadow-[0px_1px_10px_0px_rgba(45,_34,_100,_0.15)] rounded-[24px]'>

            </div>
            <div className='bg-[#FFFF] shadow-[0px_1px_10px_0px_rgba(45,_34,_100,_0.15)] rounded-[24px]'>

            </div>

          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className='flex flex-col items-center bg-[#2D2264] gap-6 p-6'>
        <h1 className='text-[44px] font-bold text-white mt-[72px]'>What Our Clients Say</h1>
        <p className='text-[18px] text-white mt-[18px] mb-[55px]'>Trusted by the people who use it daily.</p>
        {/* Overall Container holding reviews */}
        <div className='flex flex-row justify-between gap-10 items-stretch'>
          {/* Review Boxes */}
          <div className='flex flex-col items-center bg-[#FFFFFF]  rounded-tr-lg rounded-bl-lg '>
            <div className='justify-center flex items-center px-16 pt-16 pb-10 relative w-full h-full'>
              <img
                src="./quote.svg"
                alt="quote"
                className="absolute top-[3px] left-[10px] w-[75px] h-[85.48px] mix-blend-normal"
              />

              <img
                src="./quote.svg"
                alt="quote"
                className="absolute top-[190.52px] right-[10px] w-[75px] h-[85.48px] mix-blend-normal"
              />
              <p className='italic font-light text-[18px]'>As a security officer, having the ability to verify visitors and activate emergency protocols from one dashboard has made my job much easier and safer.</p>
            </div>

            {/* Lower part of review box */}
            <div className='border-t-1 flex flex-row justify-between items-center w-full px-4 py-2 ' style={{ borderColor: "rgba(45, 34, 100, 0.5)" }}>
              <div className='flex items-center rounded-full bg-[#00234] w-16 h-16'>
                <img src="/boy-avatar.svg" className='object-cover w-full h-full' alt="" />

              </div>

              <div className='flex flex-col items-end  '>
                <p className='font-extrabold text-[18px] text-[#333333]'>DANILE GALLAGHER</p>
                <p className='font-semibold text-[18px] text-[#333333]/50 italic'>Head of Security Officer</p>
                <p className='font-extrabold text-[16px] text-[#2D2264]/50'>TechPoint Offices</p>

              </div>


            </div>

          </div>
          {/* Review Boxes */}
          <div className='flex flex-col items-center bg-[#FFFFFF]  rounded-tr-lg rounded-bl-lg '>
            <div className='justify-center flex items-center px-16 pt-16 pb-10 relative w-full h-full'>
              <img
                src="./quote.svg"
                alt="quote"
                className="absolute top-[3px] left-[10px] w-[75px] h-[85.48px] mix-blend-normal"
              />

              <img
                src="./quote.svg"
                alt="quote"
                className="absolute top-[190.52px] right-[10px] w-[75px] h-[85.48px] mix-blend-normal"
              />
              <p className='italic font-light text-[18px]'>We’ve reduced entry bottlenecks by 60% since switching to VisitorGate. It's intuitive, multilingual, and works flawlessly across devices.</p>
            </div>

            {/* Lower part of review box */}
            <div className='border-t-1 flex flex-row justify-between items-center w-full px-4 py-2 ' style={{ borderColor: "rgba(45, 34, 100, 0.5)" }}>
              <div className='flex items-center rounded-full bg-[#00234] w-16 h-16'>
                <img src="/boy-avatar.svg" className='object-cover w-full h-full' alt="" />

              </div>

              <div className='flex flex-col items-end  '>
                <p className='font-extrabold text-[18px] text-[#333333]'>FAITH K</p>
                <p className='font-semibold text-[18px] text-[#333333]/50 italic'>Facility Administrator</p>
                <p className='font-extrabold text-[16px] text-[#2D2264]/50'>The Local Data Company</p>

              </div>


            </div>

          </div>
          {/* Review Boxes */}
          <div className='flex flex-col items-center bg-[#FFFFFF]  rounded-tr-lg rounded-bl-lg '>
            <div className='justify-center flex items-center px-16 pt-16 pb-10 relative w-[420px] h-full'>
              <img
                src="./quote.svg"
                alt="quote"
                className="absolute top-[3px] left-[10px] w-[75px] h-[85.48px] mix-blend-normal"
              />

              <img
                src="./quote.svg"
                alt="quote"
                className="absolute top-[190.52px] right-[10px] w-[75px] h-[85.48px] mix-blend-normal"
              />
              <p className='italic font-light text-[18px]'>VisitorGate has completely transformed how we manage access at our apartment complex. The check-in process is now faster and more secure, and residents love the real-time alerts.</p>
            </div>

            {/* Lower part of review box */}
            <div className='border-t-1 flex flex-row justify-between items-center w-full px-4 py-2 ' style={{ borderColor: "rgba(45, 34, 100, 0.5)" }}>
              <div className='flex items-center rounded-full bg-[#00234] w-16 h-16'>
                <img src="/boy-avatar.svg" className='object-cover w-full h-full' alt="" />

              </div>

              <div className='flex flex-col items-end  '>
                <p className='font-extrabold text-[18px] text-[#333333]'>MARK COLGAN</p>
                <p className='font-semibold text-[18px] text-[#333333]/50 italic'>Property Manager</p>
                <p className='font-extrabold text-[16px] text-[#2D2264]/50'>GreenPark Apartments</p>

              </div>


            </div>

          </div>

        </div>

      </section>

      {/* FAQs */}
      <section className='flex flex-col items-center p-4 mb-16'>
        <h1 className='text-[36px] text-[#2D2264] font-bold mt-16'>FAQ's</h1>


        <AccordionItem question="1. Can I use the system on both desktop and mobile devices?"
          answer="yeah i mean sure" />

        <AccordionItem question="2. How do visitors check in using the system?"
          answer="yeah i mean sure" />

        <AccordionItem question="3. Is VisitorGate secure for managing sensitive visitor data?"
          answer="yeah i mean sure" />

        <AccordionItem question="4. Is there a free trial available?"
          answer="yeah i mean sure" />





      </section>

      {/* Contact Us */}
      <section className='flex flex-col items-center bg-[#2D2264]/50 '
        style={{
          backgroundImage: `linear-gradient(rgba(45, 34, 100, 0.5), rgba(45, 34, 100, 0.5)), url('/contact-apartment-us.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 1,
        }}>
        <div className='flex items-center justify-center flex-col'>
          <h3 className=' text-[44px] font-bold text-white mt-[97px]'>Contact Us</h3>
          <p className=' text-[18px]  text-white text-center'>Got a question? Need a demo?<br /> We’re here to help you secure your space — just drop us a message!</p>

        </div>

        <div className='flex flex-row justify-between items-center w-full '>
          {/* Contact Details */}
          <div className='flex flex-col items-center gap-[35px]  '>
            {/* Contact 1 */}
            <div className='flex flex-row items-center gap-6 ml-36'>
              <div className="flex items-center justify-center w-[60px] h-[60px] border border-[#fffff] rounded-[8px] shrink-0">
                <img className='w-[20px] h-[20px]' src="/ic-ct-1.svg" alt="" />
              </div>
              <div className="flex flex-col items-start gap-2 font-['DM Sans'] w-full text-[#333333] tracking-[0.5px]">
                <p className=" text-[20px] text-white">john@gmail.com</p>

              </div>

            </div>

            {/* Contact 1 */}
            <div className='flex flex-row items-center gap-6 ml-36'>
              <div className="flex items-center justify-center w-[60px] h-[60px] border border-[#fffff] rounded-[8px] shrink-0">
                <img className='w-[20px] h-[20px]' src="ic-ct-2 (2).svg" alt="" />
              </div>
              <div className="flex flex-col items-start gap-2 font-['DM Sans'] w-full text-[#333333] tracking-[0.5px]">
                <p className=" text-[20px] text-white">john@gmail.com</p>

              </div>

            </div>

            {/* Contact 1 */}
            <div className='flex flex-row items-center gap-6 ml-36'>
              <div className="flex items-center justify-center w-[60px] h-[60px] border border-[#fffff] rounded-[8px] shrink-0">
                <img className='w-[20px] h-[20px]' src="./ic-ct-2 (3).svg" alt="" />
              </div>
              <div className="flex flex-col items-start gap-2 font-['DM Sans'] w-full text-[#333333] tracking-[0.5px]">
                <p className=" text-[20px] text-white">john@gmail.com</p>

              </div>

            </div>

          </div>

          <div className='overflow-hidden '>
            <img src="/man-on-comp.png" alt="" />
          </div>


        </div>



      </section>


      {/* Footer */}
      <section className='bg-[#16112F] flex flex-row justify-between p-16'>
        {/* column 1 */}
        <div className='flex flex-col items-start '>
          <img src="./visitor-gate-white-logo.svg" alt="" />
          <p className='text-white text-[16px] font-medium tracking-[0.5px]'>Where Every Visitor Counts</p>

        </div>
        {/* column 2 */}
        <div className='flex flex-col items-start gap-[13px] text-white '>
          <h3 className='font-semibold text-[16px] '>Quick Links</h3>
          <Link className='text-[16px] tracking-[0.5px]'>Home</Link>
          <Link className='text-[16px] tracking-[0.5px]'>Features</Link>
          <Link className='text-[16px] tracking-[0.5px]'>Pricing</Link>

        </div>

        {/* column 3 */}
        <div className='flex flex-col items-start gap-[13px] text-white '>
          <h3 className='font-semibold text-[16px] '>Contacts</h3>
          <div className='flex flex-row items-center gap-2 justify-between'>
            <div className="justify-center items-center flex">
              <img src="/mail-contact.svg" alt="" />
            </div >

            <p className='text-[16px] text-white tracking-[0.5px]'>john@gmail.com</p>


          </div>

          <div className='flex flex-row items-center gap-2 justify-between'>
            <div className="justify-center items-center flex">
              <img src="/mail-contact.svg" alt="" />
            </div >

            <p className='text-[16px] text-white tracking-[0.5px]'>john@gmail.com</p>


          </div>

        </div>

      </section>


    </>

  )
}

export default Home
