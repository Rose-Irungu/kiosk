import React, {useState} from 'react';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';

//scripts
import selectImage from '../../../scripts/selectImage';

export default function EditVisitor({name, phone, email,callback1}) {
    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newImage, setNewImage] = useState('');
    const [guestUpdated, setGuestUpdated] = useState(false);

    const handleSubmit = async (e) =>{
        try{
            e.preventDefault();
            setGuestUpdated(true);
            toast.success('Guest update submitted successfully');
        } catch(err){
            console.error(`Error ${err} occurred while submitting the guest update`);
            toast.error('Failed to submit the guest update');
            throw err;
        }
    };

  return (
    <div className='w-[360px] h-[450px] rounded-[24px] bg-[#F5F4F5] p-[4px]'>
        <div className='flex flex-row justify-between w-[350px] h-[61px] rounded-t-[24px] border-b-[1px] border-[#E6FBE9] p-[20px] bg-[#FFFFFF]'>
            <div className='w-[185px] h-[41px] py-[5px] px-[1px] gap-[10px]'>
                <h1 className=' font-dmsans font-bold text-[24px] text-[#002706] leading-[100%] tracking-normal'>
                    Visitor Details
                </h1>
            </div>
            <div className='w-[30px] h-[30px] cursor-pointer'
                 onClick={(e) => { e.stopPropagation(); callback1(); }}
            >
                <img src="/x.svg" className='w-[30px] h-[30px]' />
            </div>
        </div>
        <div className='flex flex-col'>
            <h1 className='ml-[20px] mt-[10px] font-dmsans font-bold text-[18px] text-[#005E0E] leading-[100%] tracking-normal'>
                Personal Information
            </h1>
            <form onSubmit={()=>handleSubmit()} className='ml-[10px] p-[10px] pb-[5px]'>
                <label htmlFor="name" className='font-semibold font-dmsans text-[14px] text-[#000000] leading-[100%] tracking-normal'>Name</label>
                <input id='name' 
                       type="text" 
                       value={newName}
                       onChange={(e)=> setNewName(e.target.value)}
                       placeholder={name}
                       className='w-full h-[40px] rounded-[12px] border-[1px] border-[#333333] py-[10px] px-[20px] gap-[20px]'/>
                <label htmlFor="phone" className='font-semibold font-dmsans text-[14px] text-[#000000] leading-[100%] tracking-normal'>Phone</label>
                <input id='phone' 
                       type="text" 
                       value={newPhone}
                       onChange={(e)=>setNewPhone(e.target.value)}
                       placeholder={phone}
                       className='w-full h-[40px] rounded-[12px] border-[1px] border-[#333333] py-[10px] px-[20px] gap-[20px]'/>
                <label htmlFor="email" className='font-semibold font-dmsans text-[14px] text-[#000000] leading-[100%] tracking-normal'>Email</label>
                <input id='email' 
                       type="text"
                       value={newEmail}
                       onChange={(e)=>setNewEmail(e.target.value)} 
                       placeholder={email}
                       className='w-full h-[40px] rounded-[12px] border-[1px] border-[#333333] py-[10px] px-[20px] gap-[20px]'/>
                <label htmlFor="photo" className='font-semibold font-dmsans text-[14px] text-[#000000] leading-[100%] tracking-normal'>Select Photo</label>
                <div className='flex justify-end items-center cursor-pointer w-full h-[40px] border-[1px] border-[#005E0E] rounded-[8px] py-[7px] px-[10px] gap-[10px] mt-[10px]
                                    font-dmsans font-bold text-[16px] text-[#E6FBE9] leading-[100%] tracking-normal'
                >
                    <div className='bg-[#005E0E] border-[1px] border-[#005E0E] rounded-[2px]'
                        onClick={() => {
                        if (!guestUpdated) {
                            selectImage()
                            .then((result) => {
                                setNewImage(result);
                            })
                            .catch((err) => {
                                console.error('Image selection failed:', err);
                            });
                        }
                        }}
                    >
                        <Upload size={20} style={{zIndex:"1"}}/>
                    </div>
                </div>
                <button className='cursor-pointer w-full h-[40px] rounded-[8px] border-[1px] border-[#005E0E] py-[7px] px-[10px] gap-[10px] bg-[#005E0E] mt-[10px]
                                    font-dmsans font-bold text-[16px] text-[#E6FBE9] leading-[100%] tracking-normal'
                        type='submit'
                >
                    Save
                </button>
            </form>
        </div>
    </div>
  );
}