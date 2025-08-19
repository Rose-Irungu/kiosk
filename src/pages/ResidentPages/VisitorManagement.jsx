import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import ResidentLayout from '../../components/ResidentComponents/ResidentLayout.jsx';
import { getAllBlackListed } from '../../services/blacklistedpeeps';
import { blacklistVisitor, unBlacklistVisitor, visitsuser, approveVisit, cancelVisit } from "../../services/visitsuser";
import { editVisitor } from "../../services/residentDashboardServices.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);



const VisitorManagement = ({ datedata = [] }) => {
  const [day, setDay] = useState(new Date().toDateString());
  const [datebuttons, setDateButtons] = useState([]);
  const [fileName, setFileName] = useState("name of existing file");

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  useEffect(() => {
    setDateButtons(generateDateButtons());
  }, []);

  const navigate = useNavigate();
  const [active, setActive] = useState('btn1');




  const goList = (dateObj) => {
    const selectedDateStr = `${dateObj.year}-${String(dateObj.month).padStart(
      2,
      "0"
    )}-${String(dateObj.daynum).padStart(2, "0")}`;
    const filteredGuests = guestlists.filter(
      (guest) => guest.visit_date === selectedDateStr
    );
    navigate("/resident/guestlist", {
      state: {
        selectedDate: selectedDateStr,
        guests: filteredGuests,
        day: dateObj.day,
        daynum: dateObj.daynum,
        month: dateObj.month,
        year: dateObj.year,
      },
    });
  };

  const [selectedGuest, setSelectedGuest] = useState(null);

  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  const openModal = (guest) => {
    setSelectedGuest(guest);
    setIsModalOpen(true);
  };

  const handleGuestModal = (guest) => {
    setSelectedGuest(guest);
    setIsGuestModalOpen(true);
  };

  const handleEditModal = (guest) => {
    setSelectedGuest(guest);
    setIsEditModalOpen(true);
  };

  // const closeModal = () => setIsModalOpen(false);

  // const toggleModal = () => {
  //   setIsModalOpen(!isModalOpen);
  // };

  useEffect(() => {
    if (isModalOpen || isGuestModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, isGuestModalOpen]);

  const restrictedModalRef = useRef(null);
  const guestModalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      isModalOpen &&
      restrictedModalRef.current &&
      !restrictedModalRef.current.contains(event.target)
    ) {
      setIsModalOpen(false);
    }

    if (
      isGuestModalOpen &&
      guestModalRef.current &&
      !guestModalRef.current.contains(event.target)
    ) {
      setIsGuestModalOpen(false);
    }
  };

  // Real Time Calendar------------------------------------------------------
  const generateDateButtons = () => {
    const today = new Date();
    const dates = [];

    for (let i = -4; i <= 4; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      dates.push({
        id: date.toDateString(),
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        daynum: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        isToday: i === 0,
      });
    }

    return dates;
  };

  // ---------------------------------------------------------------------

  // Guest List------------------------------------------------

  const [guestlists, setGuestLists] = useState([]);
  const statusCounts = {
    approved: guestlists.filter((guest) => guest.status === "approved").length,
    pending: guestlists.filter((guest) => guest.status === "pending").length,
    checked_in: guestlists.filter((guest) => guest.status === "checked_in")
      .length,
  };
  const buttons = [
    { id: "btn1", label: `Expected (${statusCounts.approved})` },
    { id: "btn2", label: `Pending (${statusCounts.pending})` },
    { id: "btn3", label: `Onsite (${statusCounts.checked_in})` },
  ];
  const [filteredGuests, setFilteredGuests] = useState([]);
  const fetchGuestList = async () => {
    // setLoading(true);
    try {
      const res = await visitsuser();
      if (res.result_code === 0) {
        let allData = res.data;
        console.log("Fetched Guests:", allData);
        setGuestLists(allData);
      } else {
        setGuestLists([]);
      }
    } catch (error) {
      console.error("Error fetching Guests:", error);
      setGuestLists([]);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    console.log("Filtering for:", active);
    console.log("Full guest list:", guestlists);

    if (guestlists.length) {
      const statusMap = {
        btn1: "approved",
        btn2: "pending",
        btn3: "checked_in",
      };
      const filtered = guestlists.filter(
        (guest) => guest.status === statusMap[active]
      );
      setFilteredGuests(filtered);
    }
  }, [active, guestlists]);
  useEffect(() => {
    fetchGuestList();
  }, []);

  // -------------------------------------------------------------------------------

  // Restricted List------------------------------------------------

  const [blacklists, setBlackLists] = useState([]);
  const fetchBlackListed = async () => {
    // setLoading(true);
    try {
      const res = await getAllBlackListed();
      if (res.result_code === 0) {
        let allData = res.data;
        console.log("Fetched Blacklisted visitors:", allData);
        setBlackLists(allData);
      } else {
        setBlackLists([]);
      }
    } catch (error) {
      console.error("Error fetching blacklisted visitors:", error);
      setBlackLists([]);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlackListed();
  }, []);

  // -------------------------------------------------------------------------------

  // Remove from Blacklist------------------------------------------------
  const handleRemoveFromBlacklist = async () => {
    try {
      const res = await unBlacklistVisitor({
        visitor_id: selectedGuest.visitor_id,
      });
      setBlackLists((prev) =>
        prev.filter((guest) => guest.visitor_id !== selectedGuest.visitor_id)
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error removing guest from blacklist:", error);
      // toast.error("An error occurred while removing the guest.");
    }
  };
  // ----------------------------------------------------------------------

  // Approve & Decline ----------------------------------------------------
  const handleApprove = async () => {
    try {
      await approveVisit(selectedGuest.visit_id)
      setGuestLists(prev =>
        prev.filter(guest => guest.visit_id !== selectedGuest.visit_id)
      );
      setIsGuestModalOpen(false);
    } catch (error) {

    }

  }
  const handleCancel = async () => {
    try {
      await cancelVisit(selectedGuest.visit_id)
      setGuestLists(prev =>
        prev.filter(guest => guest.visit_id !== selectedGuest.visit_id)
      );
      setIsGuestModalOpen(false);
    } catch (error) {

    }

  }

  //   ----------------------------------------------------------------------------------

  // Add To Blacklist
  const handleAddToBlacklist = async () => {
    try {
      const response = await blacklistVisitor({ visitor_id: selectedGuest.visitor_id });

      setBlackLists(prev =>
        prev.filter(guest => guest.visitor_id !== selectedGuest.visitor_id)
      );




    } catch (error) {
      console.error("Failed to blacklist visitor:", error);

    }
  };






  return (
    <>
      <ResidentLayout>
        {/* Main Container 1 - Guest List */}
        <div className="flex flex-col items-start gap-4 bg-[#E6FBE9] justify-between mx-auto mb-[32px] p-3 rounded-[12px] ">
          {/* h1, Icon and Invite Guest Button */}
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex items-start gap-2 flex-row justify-between">
              <img src="/guests.svg" alt="" />
              <h1 className='text-[24px] font-["DM Sans"] text-[#002706] font-semibold'>
                My Guests
              </h1>
            </div>

            <div className='flex h-[32px]  bg-[#005E0E] rounded-md text-white shadow items-center justify-between p-2 gap-2 text-[14px] font-semibold font-["DM Sans"] hover:bg-green-500 '>
              <button
                className="flex items-center justify-between "
                onClick={() => navigate("/guestform")}
              >
                <img src="/plus-visitors.svg" alt="" />
                Invite Guest
              </button>
            </div>
          </div>
          {/* Expected, Pending, Onsite Buttons */}
          <div className="rounded-full flex flex-row justify-between gap-2 p-1 bg-[#333333]/10 w-full">
            {buttons.map((button) => (
              <button
                key={button.id}
                className={
                  button.id === active
                    ? " items-center w-[315px] h-[32px]  justify-center rounded-full bg-[#B0F1B9] text-[14px] font-semibold"
                    : "items-center rounded-full w-[315px] h-[32px]  justify-center bg-[#FFFF] text-[14px] font-semibold"
                }
                onClick={() => setActive(button.id)}
              >
                {button.label}
              </button>
            ))}
          </div>

          {/* Guest Details Card */}
          <div className="flex flex-col items-start w-full overflow-y-scroll h-[221px] ">
            {filteredGuests.length > 0 ? (
              filteredGuests.map((guestlist, index) => (
                <button
                  onClick={() => handleGuestModal(guestlist)}
                  key={guestlist.id}
                  className='w-full h-[64px] bg-[#FFFF] mb-2 rounded-sm flex flex-row items-center justify-between font-["DM Sans"] p-4'
                >
                  <div className="flex flex-row justify-between gap-4 items-center ">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#005E0E]/5 rounded-full shrink-0">
                      <img
                        src={guestlist.image || "/boy-avatar.svg"}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <p className="text-sm font-medium text-[#002706] ">
                        {guestlist.visitor_name}
                      </p>
                      <p className="text-[12px] text-[#999999] font-medium">
                        {dayjs(guestlist.check_in).fromNow()}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-md bg-[#B0F1B9] flex items-center p-2 h-[22px] justify-center ">
                    <p className="text-sm text-[#002706]">
                      {guestlist.visitor_type}
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-[#495057] text-base ">No guests here :(</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Container 2 - Callendar */}
        <div className='bg-[#B0F1B9]/50 flex flex-col gap-2 font-["DM Sans"] p-3 w-full mb-[32px] rounded-[12px] '>
          <h1 className="text-[24px] font-semibold pb-4 ">
            See guests by date
          </h1>
          <div className="w-full overflow-x-auto scrollbar-hide ">
            <div className='inline-flex w-max items-center gap-6 border-[#54E168] border-[2.77974px] rounded-[33.3569px] bg-[#FFFF] py-4 px-4 font-["DM Sans"] w-full  '>
              {datebuttons.map((datebutton) => (
                <button
                  key={datebutton.id}
                  className={
                    datebutton.id === day
                      ? " text-[24px]  font-semibold bg-[#B0F1B9] flex flex-col justify-center w-[80px] h-[80px] border-[2.77974px] rounded-lg border-[#54E168] items-center shadow-[6.04594px_6.04594px_12.0919px_0px_rgba(0,_88,_13,_0.25)] hover:bg-[#B0F1B9]"
                      : "hover:bg-[#B0F1B9] text-[24px]  bg-[#FFFF] flex flex-col justify-center w-[80px] h-[80px] border-[2.77974px] rounded-lg border-[#54E168] items-center shadow-[6.04594px_6.04594px_12.0919px_0px_rgba(0,_88,_13,_0.25)]"
                  }
                  onClick={() => {
                    goList(datebutton);
                    // console.log(datebutton)
                  }}
                >
                  <p className="text-[#6C50EF]">{datebutton.day}</p>
                  <p>{datebutton.daynum}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Conatiner 3 - Restricted Guests Table */}
        <div className="flex flex-col gap-2  bg-[#F0EEFD] mb-[32px] p-3 rounded-[12px] overflow-y-auto  ">
          <div className="flex items-start gap-2 flex-row justify-start pb-4">
            <img src="/restricted-button.svg" alt="" />
            <h1 className='text-[24px] font-["DM Sans"] text-[#002706] font-semibold'>
              Restricted Guests
            </h1>
          </div>

          {/* {filteredGuests.length > 0 ? (
                            filteredGuests.map((guestlist, index) => ( */}

          {/* {blacklists.length > 0 ? (
                            blacklist.map((guestlist, index) => ( */}

          <div className='h-[227px] overflow-y-scroll'>
            {blacklists.length > 0 ? (
              blacklists.map((blacklist) => (


                <div onClick={() => openModal(blacklist)} className='w-full h-[64px] bg-[#FFFF] mb-2 rounded-sm  flex flex-row items-center justify-between font-["DM Sans"] p-4  '>

                  <button onClick={() => openModal(blacklist)} className='flex flex-row justify-between gap-4 items-center '>

                    <div className="flex items-center justify-center w-10 h-10 bg-[#005E0E]/5 rounded-full shrink-0">
                      <img src={blacklist.image || "/boy-avatar.svg"} className="w-10 h-10 rounded-full object-cover" alt="" />
                    </div>

                    <div className="flex flex-col items-start w-full">
                      <p className="text-sm font-medium text-[#002706] ">
                        {blacklist.full_name}
                      </p>
                      <p className="text-[12px] text-[#333333]">
                        {blacklist.reason}
                      </p>
                    </div>
                  </button>
                </div>
              ))
            ) : (
              <div className=" flex h-full w-full items-center justify-center">
                <p className="text-[#495057] text-base ">No guests here :(</p>
              </div>
            )}
          </div>
        </div>
      </ResidentLayout>

      {/* Table/Card Modal for Restricted */}
      {isModalOpen && selectedGuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-30 backdrop-blur-sm">
          <div
            className="flex flex-col items-center gap-2 bg-[#F5F4F5] w-[517px] h-[450px] rounded-[24px]"
            ref={restrictedModalRef}
          >
            <div className="flex flex-row w-full justify-between items-center border-b border-[#E6FBE9] shadow-[0px_1px_10px_0px_rgba(0,_88,_13,_0.25)] p-4">
              <h2 className="text-2xl text-[#002706] font-bold">Visitor Details</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="justify-end text-gray-500 hover:text-gray-700 cursor-pointer hover:bg-green-500"
              >
                <img src="/x-sign.svg" alt="" />
              </button>

            </div>

            <div className="flex flex-row justify-between w-full items-center  pt-4 px-4">
              <p className="font-bold text-lg text-[#005E0E]">Personal Information</p>
              <img src="/favorite.svg" alt="" />
            </div>

            <div className="flex flex-row items-center justify-start w-full  px-4 ">
              <div className="rounded-full bg-gray-500 w-[120px] h-[120px]">
                <img className="w-full h-full object-cover" src="/boy-avatar.svg" alt="" />

              </div>

              <div className="flex flex-col  items-start p-6">
                <p className="font-bold text-[#002706] text-xl">{selectedGuest.visitor_name}</p>
                <p className="font-medium text-[#002706] text-lg">Phone: <span className="text-[#002706] text-lg ">{selectedGuest.phone_number}</span></p>
                <p className="font-medium text-[#002706] text-lg">Email: <span className="text-[#002706] text-lg ">{selectedGuest.email || "N/A"}</span></p>

                <div className="flex flex-row items-center justify-between gap-4 mt-4">
                  <div className="rounded-lg bg-[#005E0E] flex items-center justify-center w-[91px] h-[35px] ">

                    <button onClick={handleEditModal} className="text-white font-bold text-base">Edit</button>
                  </div>


                  <div className=" flex items-center justify-center  h-[35px] p-2 ">

                    <button onClick={handleRemoveFromBlacklist} className=" font-bold text-base underline underline-[#D1190F] text-[#D1190F] hover:text-red-400 cursor-pointer">Remove From Blacklist</button>
                  </div>

                </div>

              </div>



            </div>

            <div className="flex flex-col  items-start w-full justify-start px-6" >
              <p className="font-bold text-lg text-[#005E0E]">Visit Information</p>
              <p className="font-medium text-[#002706] text-lg" >Blocked Since: {selectedGuest.visitor_type || "N/A"}</p>
              <p className="font-medium text-[#002706] text-lg">Last Check Out Date: {selectedGuest.visit_date || "N/A"}</p>

            </div>


          </div>
        </div>
      )}

      {/* Table/Card Modal for Guest */}

      {isGuestModalOpen && selectedGuest && (
        <>
        
        { selectedGuest.status === "approved" &&(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-30 backdrop-blur-sm">
            <div
              className='flex flex-col items-center gap-2 bg-[#F5F4F5] w-[517px] h-[518px] rounded-[24px]'
              ref={guestModalRef}
            >

              <div className="flex flex-row w-full justify-between items-center border-b border-[#E6FBE9] shadow-[0px_1px_10px_0px_rgba(0,_88,_13,_0.25)] p-4">
                <h2 className="text-2xl text-[#002706] font-bold">Visitor Details</h2>
                <button
                  onClick={() => setIsGuestModalOpen(false)}
                  className="justify-end text-gray-500 hover:text-gray-700 cursor-pointer hover:bg-green-500"
                >
                  <img src="/x-sign.svg" alt="" />
                </button>

              </div>

              <div className="flex flex-row justify-between w-full items-center  pt-4 px-4">
                <p className="font-bold text-lg text-[#005E0E]">Personal Information</p>
                <img src="/favorite.svg" alt="" />
              </div>

              <div className="flex flex-row items-center justify-start w-full  px-4 ">
                <div className="rounded-full bg-gray-500 w-[120px] h-[120px]">
                  <img className="w-full h-full object-cover" src="/boy-avatar.svg" alt="" />

                </div>

                <div className="flex flex-col  items-start p-6">
                  <p className="font-bold text-[#002706] text-xl">{selectedGuest.visitor_name}</p>
                  <p className="font-medium text-[#002706] text-lg">Phone: <span className="text-[#002706] text-lg ">{selectedGuest.phone_number || "N/A"}</span></p>
                  <p className="font-medium text-[#002706] text-lg">Email: <span className="text-[#002706] text-lg ">{selectedGuest.email || "N/A"}</span></p>

                  <div className="flex flex-row items-center justify-between gap-4 mt-4">
                    <div className="rounded-lg bg-[#005E0E] flex items-center justify-center w-[91px] h-[35px] ">

                      <button onClick={handleEditModal} className="text-white font-bold text-base">Edit</button>
                    </div>


                    <div className=" flex items-center justify-center  h-[35px] p-2 ">

                      <button onClick={handleAddToBlacklist} className=" font-bold text-base underline underline-[#D1190F] text-[#D1190F] hover:text-red-400 cursor-pointer">Add to Blacklist</button>
                    </div>

                  </div>

                </div>



              </div>

              <div className="flex flex-col  items-start w-full justify-start px-6" >
                <p className="font-bold text-lg text-[#005E0E]">Visitor Information</p>
                <p className="font-medium text-[#002706] text-lg" >Guest Type: {selectedGuest.visitor_type || "N/A"}</p>
                <p className="font-medium text-[#002706] text-lg">
                  Check In Date:{" "}
                  {selectedGuest.visit_date
                    ? dayjs(selectedGuest.visit_date).format("DD/MM/YYYY")
                    : "N/A"}
                </p>
                <p className="font-medium text-[#002706] text-lg">Check In time:{" "}
                  {selectedGuest.check_in ? dayjs(selectedGuest.check_in).fromNow() : "N/A"}</p>

              </div>

              <div className="flex justify-end items-end  w-full px-6 pt-4">
                <div className="border border-[#610C07] flex items-end justify-end px-2 py-1 rounded-lg">
                  <button className="text-[#610C07]">Delete Invitation</button>
                </div>
              </div>







              {/* Conditional Buttons based on status */}
              {/* {selectedGuest.status === "checked_in" && (
              <div className='flex flex-row justify-between items-center w-full font-["DM Sans"]'>
                <div className='flex bg-[#00580D] rounded-[8px] h-[32px] w-[110px] items-center justify-center p-2 hover:bg-green-500'>
                  <button
                    onClick={() => setIsDetailsModalOpen(true)}
                    className='flex items-center text-[12px] text-white'
                  >
                    Visitor Details
                  </button>
                </div>

                <div className='flex rounded-[8px] h-[32px] w-[110px] items-center justify-center p-2 hover:bg-gray-500 border border-[#00580D]'>
                  <button
                    onClick={handleAddToBlacklist}
                    className='flex text-[12px] text-[#00580D]'
                  >
                    Add To Blacklist
                  </button>
                </div>
              </div>
            )} */}


              {/* {selectedGuest.status === "pending" && (
              <div className='flex flex-row justify-between items-center w-full font-["DM Sans"]'>
                 <div className='flex bg-[#00580D] rounded-[8px] h-[32px] w-[110px] items-center justify-center p-2 hover:bg-green-500'>
                  <button onClick={handleApprove} className='flex items-center text-[12px] text-white'>
                    Approve
                  </button>
                </div> 

                <div className='flex rounded-[8px] h-[32px] w-[110px] items-center justify-center p-2 hover:bg-gray-500 border border-[#00580D]'>
                  <button onClick={handleCancel} className='flex text-[12px] text-[#00580D]'>
                    Decline
                  </button>
                </div> 
              </div>
            )} */}
            </div>
          </div>
        )}


        { selectedGuest.status === "pending" &&(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-30 backdrop-blur-sm">
            <div
              className='flex flex-col items-center gap-2 bg-[#F5F4F5] w-[517px] h-[518px] rounded-[24px]'
              ref={guestModalRef}
            >

              <div className="flex flex-row w-full justify-between items-center border-b border-[#E6FBE9] shadow-[0px_1px_10px_0px_rgba(0,_88,_13,_0.25)] p-4">
                <h2 className="text-2xl text-[#002706] font-bold">Visitor Details</h2>
                <button
                  onClick={() => setIsGuestModalOpen(false)}
                  className="justify-end text-gray-500 hover:text-gray-700 cursor-pointer hover:bg-green-500"
                >
                  <img src="/x-sign.svg" alt="" />
                </button>

              </div>

              <div className="flex flex-row justify-between w-full items-center  pt-4 px-4">
                <p className="font-bold text-lg text-[#005E0E]">Personal Information</p>
                <img src="/favorite.svg" alt="" />
              </div>

              <div className="flex flex-row items-center justify-start w-full  px-4 ">
                <div className="rounded-full bg-gray-500 w-[120px] h-[120px]">
                  <img className="w-full h-full object-cover" src="/boy-avatar.svg" alt="" />

                </div>

                <div className="flex flex-col  items-start p-6">
                  <p className="font-bold text-[#002706] text-xl">{selectedGuest.visitor_name}</p>
                  <p className="font-medium text-[#002706] text-lg">Phone: <span className="text-[#002706] text-lg ">{selectedGuest.phone_number || "N/A"}</span></p>
                  <p className="font-medium text-[#002706] text-lg">Email: <span className="text-[#002706] text-lg ">{selectedGuest.email || "N/A"}</span></p>

                  <div className="flex flex-row items-center justify-between gap-4 mt-4">
                    <div className="rounded-lg bg-[#005E0E] flex items-center justify-center w-[91px] h-[35px] ">

                      <button onClick={handleEditModal} className="text-white font-bold text-base">Approve</button>
                    </div>


                    <div className=" flex items-center justify-center  h-[35px] p-2 ">

                      <button onClick={handleAddToBlacklist} className=" font-bold text-base underline underline-[#D1190F] text-[#D1190F] hover:text-red-400 cursor-pointer">Decline</button>
                    </div>

                  </div>

                </div>



              </div>

              {/* <div className="flex flex-col  items-start w-full justify-start px-6" >
                <p className="font-bold text-lg text-[#005E0E]">Visitor Information</p>
                <p className="font-medium text-[#002706] text-lg" >Guest Type: {selectedGuest.visitor_type || "N/A"}</p>
                <p className="font-medium text-[#002706] text-lg">
                  Check In Date:{" "}
                  {selectedGuest.visit_date
                    ? dayjs(selectedGuest.visit_date).format("DD/MM/YYYY")
                    : "N/A"}
                </p>
                <p className="font-medium text-[#002706] text-lg">Check In time:{" "}
                  {selectedGuest.check_in ? dayjs(selectedGuest.check_in).fromNow() : "N/A"}</p>

              </div> */}

              <div className="flex justify-end items-end  w-full px-6 pt-4">
                <div className="border border-[#610C07] flex items-end justify-end px-2 py-1 rounded-lg">
                  <button className="text-[#610C07]">Delete Invitation</button>
                </div>
              </div>







              {/* Conditional Buttons based on status */}
              {/* {selectedGuest.status === "checked_in" && (
              <div className='flex flex-row justify-between items-center w-full font-["DM Sans"]'>
                <div className='flex bg-[#00580D] rounded-[8px] h-[32px] w-[110px] items-center justify-center p-2 hover:bg-green-500'>
                  <button
                    onClick={() => setIsDetailsModalOpen(true)}
                    className='flex items-center text-[12px] text-white'
                  >
                    Visitor Details
                  </button>
                </div>

                <div className='flex rounded-[8px] h-[32px] w-[110px] items-center justify-center p-2 hover:bg-gray-500 border border-[#00580D]'>
                  <button
                    onClick={handleAddToBlacklist}
                    className='flex text-[12px] text-[#00580D]'
                  >
                    Add To Blacklist
                  </button>
                </div>
              </div>
            )} */}


              {/* {selectedGuest.status === "pending" && (
              <div className='flex flex-row justify-between items-center w-full font-["DM Sans"]'>
                 <div className='flex bg-[#00580D] rounded-[8px] h-[32px] w-[110px] items-center justify-center p-2 hover:bg-green-500'>
                  <button onClick={handleApprove} className='flex items-center text-[12px] text-white'>
                    Approve
                  </button>
                </div> 

                <div className='flex rounded-[8px] h-[32px] w-[110px] items-center justify-center p-2 hover:bg-gray-500 border border-[#00580D]'>
                  <button onClick={handleCancel} className='flex text-[12px] text-[#00580D]'>
                    Decline
                  </button>
                </div> 
              </div>
            )} */}
            </div>
          </div>
        )}

        { selectedGuest.status === "checked_in" &&(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-30 backdrop-blur-sm">
            <div
              className='flex flex-col items-center gap-2 bg-[#F5F4F5] w-[517px] h-[518px] rounded-[24px]'
              ref={guestModalRef}
            >

              <div className="flex flex-row w-full justify-between items-center border-b border-[#E6FBE9] shadow-[0px_1px_10px_0px_rgba(0,_88,_13,_0.25)] p-4">
                <h2 className="text-2xl text-[#002706] font-bold">Visitor Details</h2>
                <button
                  onClick={() => setIsGuestModalOpen(false)}
                  className="justify-end text-gray-500 hover:text-gray-700 cursor-pointer hover:bg-green-500"
                >
                  <img src="/x-sign.svg" alt="" />
                </button>

              </div>

              <div className="flex flex-row justify-between w-full items-center  pt-4 px-4">
                <p className="font-bold text-lg text-[#005E0E]">Personal Information</p>
                <img src="/favorite.svg" alt="" />
              </div>

              <div className="flex flex-row items-center justify-start w-full  px-4 ">
                <div className="rounded-full bg-gray-500 w-[120px] h-[120px]">
                  <img className="w-full h-full object-cover" src="/boy-avatar.svg" alt="" />

                </div>

                <div className="flex flex-col  items-start p-6">
                  <p className="font-bold text-[#002706] text-xl">{selectedGuest.visitor_name}</p>
                  <p className="font-medium text-[#002706] text-lg">Phone: <span className="text-[#002706] text-lg ">{selectedGuest.phone_number || "N/A"}</span></p>
                  <p className="font-medium text-[#002706] text-lg">Email: <span className="text-[#002706] text-lg ">{selectedGuest.email || "N/A"}</span></p>

                  <div className="flex flex-row items-center justify-between gap-4 mt-4">
                    <div className="rounded-lg bg-[#005E0E] flex items-center justify-center w-[91px] h-[35px] ">

                      <button onClick={handleEditModal} className="text-white font-bold text-base">Edit</button>
                    </div>


                    <div className=" flex items-center justify-center  h-[35px] p-2 ">

                      <button onClick={handleAddToBlacklist} className=" font-bold text-base underline underline-[#D1190F] text-[#D1190F] hover:text-red-400 cursor-pointer">Add to Blacklist</button>
                    </div>

                  </div>

                </div>



              </div>

              <div className="flex flex-col  items-start w-full justify-start px-6" >
                <p className="font-bold text-lg text-[#005E0E]">Visitor Information</p>
                <p className="font-medium text-[#002706] text-lg" >Guest Type: {selectedGuest.visitor_type || "N/A"}</p>
                <p className="font-medium text-[#002706] text-lg">
                  Check In Date:{" "}
                  {selectedGuest.visit_date
                    ? dayjs(selectedGuest.visit_date).format("DD/MM/YYYY")
                    : "N/A"}
                </p>
                <p className="font-medium text-[#002706] text-lg">Check In time:{" "}
                  {selectedGuest.check_in ? dayjs(selectedGuest.check_in).fromNow() : "N/A"}</p>

              </div>

              <div className="flex justify-end items-end  w-full px-6 pt-4">
                <div className="border border-[#610C07] flex items-end justify-end px-2 py-1 rounded-lg">
                  <button className="text-[#610C07]">Delete Invitation</button>
                </div>
              </div>







              {/* Conditional Buttons based on status */}
              {/* {selectedGuest.status === "checked_in" && (
              <div className='flex flex-row justify-between items-center w-full font-["DM Sans"]'>
                <div className='flex bg-[#00580D] rounded-[8px] h-[32px] w-[110px] items-center justify-center p-2 hover:bg-green-500'>
                  <button
                    onClick={() => setIsDetailsModalOpen(true)}
                    className='flex items-center text-[12px] text-white'
                  >
                    Visitor Details
                  </button>
                </div>

                <div className='flex rounded-[8px] h-[32px] w-[110px] items-center justify-center p-2 hover:bg-gray-500 border border-[#00580D]'>
                  <button
                    onClick={handleAddToBlacklist}
                    className='flex text-[12px] text-[#00580D]'
                  >
                    Add To Blacklist
                  </button>
                </div>
              </div>
            )} */}


              {/* {selectedGuest.status === "pending" && (
              <div className='flex flex-row justify-between items-center w-full font-["DM Sans"]'>
                 <div className='flex bg-[#00580D] rounded-[8px] h-[32px] w-[110px] items-center justify-center p-2 hover:bg-green-500'>
                  <button onClick={handleApprove} className='flex items-center text-[12px] text-white'>
                    Approve
                  </button>
                </div> 

                <div className='flex rounded-[8px] h-[32px] w-[110px] items-center justify-center p-2 hover:bg-gray-500 border border-[#00580D]'>
                  <button onClick={handleCancel} className='flex text-[12px] text-[#00580D]'>
                    Decline
                  </button>
                </div> 
              </div>
            )} */}
            </div>
          </div>
        )}

        
        
          
        </>





      )}




      {isEditModalOpen && setIsEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div
            className="flex flex-col items-center gap-2 bg-[#F5F4F5] w-[517px] h-[530px] rounded-[24px]"

          >


            <div className="flex flex-row w-full justify-between items-center border-b border-[#E6FBE9] shadow-[0px_1px_10px_0px_rgba(0,_88,_13,_0.25)] p-4">
              <h2 className="text-2xl text-[#002706] font-bold">Visitor Details</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="justify-end text-gray-500 hover:text-gray-700 cursor-pointer hover:bg-green-500"
              >
                <img src="/x-sign.svg" alt="" />
              </button>

            </div>

            <div className="flex flex-row justify-between w-full items-center  pt-4 px-4">
              <p className="font-bold text-lg text-[#005E0E]">Personal Information</p>
              <img src="/favorite.svg" alt="" />
            </div>


            <form action="" className='flex flex-col w-full  gap-2 px-4  '>
              <div className="flex flex-col  mb-2 ">
                <label htmlFor="" className="font-semibold text-base text-[#000000]">Name</label>
                <input className="rounded-lg border border-[#333333] p-2" type="text" placeholder="Robert Nanjala"  />

              </div>

              <div className="flex flex-col  mb-2 ">
                <label htmlFor="" className="font-semibold text-base text-[#000000]">Phone</label>
                <input className="rounded-lg border border-[#333333] p-2" type="text" placeholder="+254-712-345-678" />

              </div>

              <div className="flex flex-col  mb-2 ">
                <label htmlFor="" className="font-semibold text-base text-[#000000]">Email</label>
                <input className="rounded-lg border border-[#333333] p-2" type="text" placeholder="rnanjala@gmail.com" />

              </div>

              <div className="flex flex-col  mb-2">
                <label className="font-semibold text-base text-[#000000]">Photo</label>
                <div className="flex rounded-lg border border-[#333333]  overflow-hidden">
                  <div className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-sm truncate">
                    {fileName}
                  </div>

                  {/* Upload button */}
                  <label className="bg-[#005E0E] text-white font-bold text-base px-4 py-2 cursor-pointer whitespace-nowrap hover:bg-green-800">
                    upload new photo
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center mb-2 mt-2 bg-[#005E0E] h-[50px] rounded-lg hover:bg-green-700">
                <button className="flex items-center text-sm font-bold text-white">Save Information</button>
              </div>

            </form>



          </div>







        </div>
      )}




    </>
  )
}

export default VisitorManagement;
