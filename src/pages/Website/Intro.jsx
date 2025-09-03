import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from "lucide-react";
import AccordionItem from '../../components/AccordionItem';
import { useNavigate } from 'react-router-dom';




const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = React.useState("");

  const [activeSection, setActiveSection] = useState('home');
    const navigate = useNavigate();

  // Add scroll event listener to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");

    try {
      const formData = new FormData(event.target);

      // Add any additional form data if needed
      formData.append("subject", "New VisitorGate Inquiry");
      formData.append("from_name", "VisitorGate Website");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset(); // Reset the form
        // Optionally close the modal after a delay
        setTimeout(() => {
          setShowModal(false);
          setResult(""); // Clear the result message
        }, 2000);
      } else {
        setResult(data.message || "Error submitting form");
        console.error("Error details:", data);
      }
    } catch (error) {
      setResult("Failed to submit form. Please try again.");
      console.error("Submission error:", error);
    }
  };


  return (
    <>

      {/* Navbar */}

      <nav className='sticky top-0 z-50 flex flex-row justify-between items-center bg-[#FFFF] h-[80px] shadow-[0px_1px_4px_0px_rgba(0,_0,_0,_0.25)] px-12'>
        {/* logo */}
        <div className='flex items-center justify-center'>
          <a href="#home"><img src="visitor-gate-logo-purple.svg" alt="" /></a>

        </div>
        {/* Navbar Links */}
        <div className='flex flex-row justify-between items-center gap-[24px] font-semibold text-[18px] text-[#2D2264]'>
          <a href="#home" className={`${activeSection === 'home' ? 'underline' : 'hover:underline'}`}
            onClick={() => setActiveSection('home')} >Home</a>
          <a href="#features" className={`${activeSection === 'features' ? 'underline' : 'hover:underline'}`}
            onClick={() => setActiveSection('features')}>Features</a>
          <a href="#contact" className={`${activeSection === 'contact' ? 'underline' : 'hover:underline'}`}
            onClick={() => setActiveSection('contact')}>Contact Us</a>
        </div>
        {/* Get Started Button */}

          <div className='flex items-center h-[56px] w-[143px] rounded-[8px] ml-[30px] bg-white border border-[#2D2264] justify-center hover:bg-[#2D2264] hover:border-white hover:shadow-lg hover:transition-all duration-300 ease-in-out'>
          <button 
          onClick = {()=> navigate('/loginform')}
          className='flex items-center  text-[16px] font-["DM Sans"] text-[#2D2264] hover:text-white'>LIVE DEMO</button>
        </div>
        <div className='hover:bg-[#241a52]  transition-all duration-300 flex items-center h-[56px] w-[143px] rounded-[8px] bg-[#2D2264] justify-center'>
          <button className='flex items-center  text-[16px] font-["DM Sans"] text-white' onClick={() => setShowModal(true)}>GET STARTED</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className='flex flex-row items-center justify-between px-16  '
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

            <div className='bg-[#FFFF] rounded-[8px] border border-1 border-[#000000] w-[157px] h-[56px] flex items-center justify-center font-semibold my-[56px] hover:bg-white hover:text-purple-600 transition-colors duration-300'>
              <button className='flex items-center text-[16px] hover:text-purple-600  ' onClick={() => setShowModal(true)}>
                GET STARTED
              </button>

            </div>

          </div>



        </div>
        {/* image and spices */}
        <div className='overflow-hidden '>
          <img src="/man-n-tab.png" alt="" />
          {/* <img className='absolute left-[790px] top-[106px]  ' src="/spice-1.png" alt="" /> */}

        </div>


      </section>

      {/* Features */}
      <section id="features" className='flex flex-col items-center gap-6 p-16'>
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
      <section id="getstarted" className='flex flex-col items-center p-16 '>
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

              <div className='hover:bg-[#241a52] bg-[#2D2264] rounded-[12px] h-[46px] w-[303px] p-4 flex items-center justify-center mt-[32px]'>
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

              <div className='hover:bg-[#241a52] bg-[#2D2264] rounded-[12px] h-[46px] w-[303px] p-4 flex items-center justify-center mt-[32px]'>
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
      <section id="reviews" className="flex flex-col items-center bg-[#2D2264] gap-6 p-6">
        <h1 className="text-[44px] font-bold text-white mt-[72px]">
          What Our Clients Say
        </h1>
        <p className="text-[18px] text-white mt-[18px] mb-[55px]">
          Trusted by the people who use it daily.
        </p>

        {/* Overall Container */}
        <div className="flex flex-row flex-wrap justify-center gap-10 items-stretch">
          {[
            {
              text: "As a security officer, having the ability to verify visitors and activate emergency protocols from one dashboard has made my job much easier and safer.",
              name: "DANILE GALLAGHER",
              role: "Head of Security Officer",
              company: "TechPoint Offices",
              avatar: "/boy-avatar.svg"
            },
            {
              text: "We’ve reduced entry bottlenecks by 60% since switching to VisitorGate. It's intuitive, multilingual, and works flawlessly across devices.",
              name: "FAITH K",
              role: "Facility Administrator",
              company: "The Local Data Company",
              avatar: "/boy-avatar.svg"
            },
            {
              text: "VisitorGate has completely transformed how we manage access at our apartment complex. The check-in process is now faster and more secure, and residents love the real-time alerts.",
              name: "MARK COLGAN",
              role: "Property Manager",
              company: "GreenPark Apartments",
              avatar: "/boy-avatar.svg"
            }
          ].map((review, i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-white rounded-tr-lg rounded-bl-lg w-[350px] min-h-[380px]"
            >

              <div className="justify-center flex items-center px-8 pt-16 pb-10 relative flex-grow">
                <img
                  src="./quote.svg"
                  alt="quote"
                  className="absolute top-[3px] left-[10px] w-[75px] h-[85.48px] mix-blend-normal"
                />
                <img
                  src="./quote.svg"
                  alt="quote"
                  className="absolute bottom-[3px] right-[10px] w-[75px] h-[85.48px] mix-blend-normal"
                />
                <p className="italic font-light text-[18px] text-center">
                  {review.text}
                </p>
              </div>


              <div
                className="flex flex-row justify-between items-center w-full px-4 py-2 border-t"
                style={{ borderColor: "rgba(45, 34, 100, 0.5)" }}
              >
                <div className="flex items-center rounded-full overflow-hidden w-16 h-16">
                  <img
                    src={review.avatar}
                    className="object-cover w-full h-full"
                    alt={review.name}
                  />
                </div>
                <div className="flex flex-col items-end">
                  <p className="font-extrabold text-[18px] text-[#333333]">
                    {review.name}
                  </p>
                  <p className="font-semibold text-[18px] text-[#333333]/50 italic">
                    {review.role}
                  </p>
                  <p className="font-extrabold text-[16px] text-[#2D2264]/50">
                    {review.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* FAQs */}
      <section id="faqs" className='flex flex-col items-center p-4 mb-16'>
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
      <section id="contact" className='flex flex-col items-center bg-[#2D2264]/50 '
        style={{
          backgroundImage: `linear-gradient(rgba(45, 34, 100, 0.9), rgba(45, 34, 100, 0.9)), url('/contact-apartment-us.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 1,
        }}>
        <div className='flex items-center justify-center flex-col'>
          <h3 className=' text-[44px] font-bold text-white mt-[97px]'>Contact Us</h3>
          <p className=' text-lg  text-white text-center'>Got a question? Need a demo?<br /> We’re here to help you secure your space — just drop us a message!</p>

        </div>

        <div className='flex flex-row justify-between items-center w-full '>
          {/* Contact Details */}
          <div className='flex flex-col items-start gap-[35px]   '>
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
                <p className=" text-[20px] text-white">0720000000</p>

              </div>

            </div>

            {/* Contact 1 */}
            <div className='flex flex-row items-center gap-6 ml-36'>
              <div className="flex items-center justify-center w-[60px] h-[60px] border border-[#fffff] rounded-[8px] shrink-0">
                <img className='w-[20px] h-[20px]' src="./ic-ct-2 (3).svg" alt="" />
              </div>
              <div className="flex flex-col items-start gap-2 font-['DM Sans'] w-full text-[#333333] tracking-[0.5px]">
                <p className=" text-[20px] text-white">Kingstone Residences</p>

              </div>

            </div>

          </div>

          <div className='overflow-hidden '>
            <img src="/man-on-comp.png" alt="" />
          </div>


        </div>



      </section>


      {/* Footer */}
      <section id="footer" className='bg-[#16112F] flex flex-row justify-between p-16 px-20'>
        {/* column 1 */}
        <a className='flex flex-col items-start ' href='#home'>
          <img src="./visitor-gate-white-logo.svg" alt="" />
          <p className='text-white text-[16px] font-medium tracking-[0.5px]'>Where Every Visitor<br />Counts</p>

        </a>
        {/* column 2 */}
        <div className='flex flex-col items-start gap-[13px] text-white '>
          <h3 className='font-semibold text-base '>Quick Links</h3>
          <a href="#home"  className='text-base tracking-[0.5px] hover:text-gray-500'>Home</a>
          <a href="#features"  className='text-base tracking-[0.5px] hover:text-gray-500'>Features</a>
          <a href="#getstarted"  className='text-base tracking-[0.5px] hover:text-gray-500'>Pricing</a>
          <a  href="#reviews" className='text-base tracking-[0.5px] hover:text-gray-500'>Testimonials</a>
          <a href="#faqs"  className='text-base tracking-[0.5px] hover:text-gray-500'>FAQ</a>

        </div>

        {/* column 3 */}
        <div className='flex flex-col items-start gap-[13px] text-white '>
          <h3 className='font-semibold text-[16px]  '>Contacts</h3>
          <div className='flex flex-row items-center gap-2 justify-between'>
            <div className="justify-center items-center flex">
              <img src="/mail-contact.svg" alt="" />
            </div >

            <a href="mailto:john@gmail.com" className='text-[16px] text-white tracking-[0.5px] hover:text-gray-500'>john@gmail.com</a>


          </div>

          <div className='flex flex-row items-center gap-2 justify-between'>
            <div className="justify-center items-center flex">
              <img src="/ic_round-phone.svg" alt="" />
            </div >

            <a href="tel:+254720000000" className='text-[16px] text-white tracking-[0.5px] hover:text-gray-500'>0720000000</a>


          </div>

        </div>



      </section>

      {/* Form Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[856px] h-[500px] overflow-y-auto px-24 relative rounded-[50px]">
            <div className='flex flex-col justify-center items-center gap-[26px]'>
              <img src="/cuate.svg" alt="" />
              <h2 className="text-2xl font-semibold mb-4 text-[#2D2264] font-['DM Sans']">
                Fill in Your Contact Details
              </h2>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {result && (
              <div className={`p-4 mb-4 rounded-lg text-center ${result.includes("Successfully")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
                }`}>
                {result}
              </div>
            )}

            <form className="flex flex-col gap-2" onSubmit={onSubmit}>
              <input
                type="hidden"
                name="access_key"
                value="430cab00-2681-41d7-8027-6cd50c61645d"
              />

              <label className='text-[#00000]/50 text-sm'>Full Name</label>
              <input
                type="text"
                name="name"
                required
                className="border border-gray-300 rounded-[16px] px-2 py-2 focus:outline-none focus:border-[#2D2264] mb-1"
              />

              <label className='text-[#00000]/50 text-sm'>Phone</label>
              <input
                type="text"
                name="phone"
                required
                className="mb-1 border border-gray-300 rounded-[16px] px-2 py-2 focus:outline-none focus:border-[#2D2264]"
              />

              <label className='text-[#00000]/50 text-sm'>Email</label>
              <input
                type="email"
                name="email"
                required
                className="mb-1 border border-gray-300 rounded-[16px] px-2 py-2 focus:outline-none focus:border-[#2D2264]"
              />

              <label className='text-[#00000]/50 text-sm'>Where are you located</label>
              <input
                type="text"
                name="place"
                required
                className="mb-1 border border-gray-300 rounded-[16px] px-2 py-2 focus:outline-none focus:border-[#2D2264]"
              />

              <div className='flex bg-[#2D2264] text-white py-2 rounded-[16px] hover:bg-[#241a52] transition justify-center mt-6'>
                <button
                  type="submit"
                  className="flex items-center font-semibold"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



    </>

  )
}

export default Home
