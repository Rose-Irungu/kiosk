import React, {useState} from 'react';

//components
import FavoriteDetail from './FavoriteDetail';
import EditVisitor from './EditVisitor';

export default function FavoriteCard({id, img, name, phone, email, time, function1, function2}) {
  //function1 - Invite guest
  //function2 - Edit guest
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleClose2 = () => setShowModal2(false);

  return (
    <div className='cursor-pointer flex flex-row w-full h-[64px] justify-between rounded-[8px] p-[12px] bg-[#FFFFFF]'
         onClick={()=> setShowModal(true)}
    >
        <div className='flex flex-row w-[216px] h-[40px] gap-[6px]'>
            <div className='w-[40px] h-[40px]'>
                <img src={img} className='w-[40px] h-[40px] object-cover'/>
            </div>
            <div className='flex flex-col w-[170px] h-[38px] gap-[2px]'>
                <h1 className='font-dmsans font-medium text-[16px] text-[#002706] leading-[100%] tracking-normal'>
                    {name}
                </h1>
                <p className='font-dmsans font-medium text-[12px] text-[#999999] leading-[100%] tracking-normal mt-[10px]'>
                    Last Visit: {time}
                </p>
            </div>
        </div>
        {showModal && <div className="fixed inset-0 flex items-center justify-center bg-black/40"
                           onClick={handleClose}
                      >
                        <div onClick={(e) => e.stopPropagation()}>
                            <FavoriteDetail img={img}
                                            name={name}
                                            phone={phone}
                                            email={email}
                                            callback1={()=> handleClose()}
                                            callback2={()=> function1()}
                                            callback3={()=> setShowModal2(true)}
                            />
                        </div>
                      </div>
        }
        {showModal2 && <div className="fixed inset-0 flex items-center justify-center bg-black/40">
                            <div onClick={(e) => e.stopPropagation()}>
                                <EditVisitor callback1={()=> handleClose2()}
                                             name={name}
                                             phone={phone}
                                             email={email}
                                             guestID={id}
                                />
                            </div>
                       </div>
        }
    </div>
  );
}