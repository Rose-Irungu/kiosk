import React, { useState, useRef, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { getRelativeTime } from '../../../utils/fomatters';
import { approveVisit, cancelVisit, blacklistVisitor, addFavourite, } from '../../../services/visitsuser';





const CardA = ({
  visit_id,
  visitor_id,
  visitor_name,
  check_in,
  stayTime,
  status,
  isFavorite,
  // phone,
  // email,
  tag,
  image,
  onApproveVisit,
  onCancelVisit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDetailsView, setShowDetailsView] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [isfavorite, setIsFavorite] = useState(false); 
  const modalRef = useRef(null);

  useEffect(() => {
    setIsFavorite(isFavorite);
  }, [isFavorite]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const visitorData = {
    visitor_name,
    visitor_id,
    check_in,
    stayTime,
    visit_id,
    status,
    tag,
    image,
    isFavorite,
    // phone,
    // email,
  };

  const {
    name: n = visitorData.visitor_name,
    time: t = getRelativeTime(visitorData.check_in),
    stayTime: s = visitorData.stayTime || '52 mins',
    status: st = (visitorData.status || 'pending').toLowerCase(),
    tag: tg = visitorData.tag || 'guest',
    image: img = visitorData.image || '/ellipse-20.png',
    phone: phone = visitorData.phone || 'N/A',
    email: email = visitorData.email || 'N/A',
    date
  } = visitorData;


  const openModal = () => {
    if (st !== 'expected') setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setShowDetailsView(false);
  };

  const handleApprove = async () => {
    await onApproveVisit(visit_id);
    closeModal();
  };
  const handleCancel = async () => {
    await onCancelVisit(visit_id);
    closeModal();
  };
  const handleAddToBlacklist = async () => {
    try {
      await blacklistVisitor({ visitor_id });
      closeModal();
    } catch (error) {
      console.error('Blacklist failed', error);
    }
  };

//   useEffect(() => {
//   const fetchFavourites = async () => {
//     try {
//       const data = await getallFavourite();
//       // Check if this visitor is in the favourites list
//       const isFav = data?.some(fav => fav.visitor_id === visitor_id);
//       setIsFavorite(isFav);
//     } catch (error) {
//       console.error("Error loading favourites:", error);
//     }
//   };

//   fetchFavourites();
// }, [visitor_id]);


  const toggleFavorite = async () => {
    

  try {
      setIsLoading(true);
      const res = await addFavourite(visitor_id); 
      console.log("Toggle Favourite Response:", res.data);
      
      setIsFavorite(res.data.isFavorite); 
    
  } catch (error) {
    console.error("Error toggling favourite:", error);
  } finally {
    setIsLoading(false);
  }
};




  return (
    <>
      <div className="relative inline-block w-full md:w-auto">
        <div
          className="bg-white rounded-lg p-7 px-7 md:p-4 md:px-6 flex items-center w-full justify-between h-auto md:h-15 md:w-auto shadow-md cursor-pointer"
          onClick={openModal}
        >

          <div className="flex items-center gap-1.5">
            <img className="w-10 h-10 rounded-full object-cover" src={img} alt={n} />
            <div className="flex flex-col gap-0.5 w-[145px]">
              <div className="text-green-900 text-sm font-medium">{n}</div>
              {st === "checked_in" ? (
                <div className="text-gray-500 text-xs font-medium">Check in time: {t}</div>
              ) : (
                <div className="text-gray-500 text-xs font-medium">Today</div>
              )}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
          >
            <Heart
              size={18}
              className={`cursor-pointer transition-colors ${isfavorite ? "text-red-500 fill-red-500" : "text-gray-400"
                }`}
            />
          </button>
        </div>


      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
          ref={modalRef}
        >
          {showDetailsView ? (

            <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
              <h2 className="text-lg font-semibold text-green-900 mb-4">Visitor Details</h2>
              <p className="text-sm text-gray-700 mb-2"><strong>Name:</strong> {n}</p>
              <p className="text-sm text-gray-700 mb-2"><strong>Check-in Time:</strong> {t}</p>
              <p className="text-sm text-gray-700 mb-4"><strong>tag:</strong> {tg}</p>
              <button
                onClick={closeModal}
                className="mt-2 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
              >
                Close
              </button>
            </div>
          ) : st === 'pending' ? (

            <div className="bg-white rounded-2xl border border-green-300 p-5 flex flex-col gap-4 w-[292px] shadow-md">
              <div className="flex gap-3 items-start">
                <img className="w-10 h-10 rounded-full object-cover" src={img} alt={n} />
                <div className="flex flex-col gap-1 w-[217px]">
                  <div className="flex justify-between w-full">
                    <div className="text-neutral-900 text-sm font-medium">{n}</div>
                    <div className="bg-purple-100 text-purple-900 text-xs font-medium px-2 py-0.5 rounded-full">
                      {tg}
                    </div>
                  </div>
                  <div className="text-gray-600 text-[10px] font-medium">Today</div>
                </div>
              </div>
              <div className="flex justify-between w-[258px]">
                <button
                  onClick={handleApprove}
                  className="bg-green-900 text-white text-sm font-medium px-4 py-2 rounded w-[110px]"
                >
                  Approve
                </button>
                <button
                  onClick={handleCancel}
                  className="border border-green-900 text-green-900 text-sm font-medium px-4 py-2 rounded w-[110px]"
                >
                  Decline
                </button>
              </div>
            </div>






          ) : st === "checked_in" ? (
            // isEditing ? (
            //   // EDIT MODAL
            //   <div className="bg-[#f5f4f5] rounded-2xl p-6 w-[517px] h-[605px] shadow-md">
            //     <h2 className="text-green-900 font-semibold text-lg mb-4">Edit Visitor</h2>
            //     <input
            //       type="text"
            //       defaultValue={n}
            //       className="w-full mb-3 px-3 py-2 rounded border border-gray-300"
            //     />
            //     <input
            //       type="text"
            //       defaultValue={phone}
            //       className="w-full mb-3 px-3 py-2 rounded border border-gray-300"
            //     />
            //     <input
            //       type="email"
            //       defaultValue={email}
            //       className="w-full mb-3 px-3 py-2 rounded border border-gray-300"
            //     />
            //     <div className="flex justify-end gap-3 mt-4">
            //       <button
            //         onClick={() => setIsEditing(false)}
            //         className="px-4 py-2 border rounded text-gray-700"
            //       >
            //         Cancel
            //       </button>
            //       <button
            //         onClick={() => {
            //           // TODO: call updateVisitor API here
            //           setIsEditing(false);
            //         }}
            //         className="px-4 py-2 bg-green-900 text-white rounded"
            //       >
            //         Save
            //       </button>
            //     </div>
            //   </div>
            // ) : (

              <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4 w-[350px] shadow-md">

                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <h2 className="text-green-900 font-semibold text-lg">Visitor Details</h2>
                  <div className="flex items-center gap-3">

                    <button
                      onClick={(e) => {
                        if (isloading) return;
                        e.stopPropagation();
                        toggleFavorite();
                      }}
                    >
                      <Heart
                        size={20}
                        className={`cursor-pointer transition-colors ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"
                          }`}
                      />
                    </button>
                    {/* Close button
                  <button onClick={() => setShowModal(false)} className="text-gray-500">
                    ✕
                  </button> */}
                  </div>
                </div>

                <div>
                  <h3 className="text-green-900 text-sm font-semibold mb-2">
                    Personal Information
                  </h3>
                  <div className="flex items-center gap-3">
                    <img
                      className="w-14 h-14 rounded-full object-cover"
                      src={img}
                      alt={n}
                    />
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-medium">{n}</span>
                      <span className="text-gray-700 text-sm">Phone: {phone}</span>
                      <span className="text-gray-700 text-sm">Email: {email}</span>
                    </div>
                  </div>


                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-green-900 text-white text-sm font-medium px-4 py-1.5 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={handleAddToBlacklist}
                      className="text-red-600 text-sm font-medium px-4 py-1.5 rounded border border-red-600"
                    >
                      Add to Blacklist
                    </button>
                  </div>
                </div>


                <div>
                  <h3 className="text-green-900 text-sm font-semibold mb-2">
                    Visit Information
                  </h3>
                  <div className="text-gray-700 text-sm">
                    <p>Guest Type: {tg}</p>
                    <p>Check in date: {date}</p>
                    <p>Check in time: {t}</p>
                  </div>
                </div>
              </div>
            )
          
             : null}


        </div>

      )}
    </>

  );
};

export default CardA;
