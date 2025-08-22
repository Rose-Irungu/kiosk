import React, { useEffect, useState } from 'react';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';

// scripts
import selectImage from '../../../scripts/selectImage';
import { editVisitorAdmin } from '../../../services/visitorservice';

export default function EditVisitor({ guestID, name, phone, callback1 }) {
  const [newName, setNewName] = useState(name);
  const [newPhone, setNewPhone] = useState(phone);
  const [newImage, setNewImage] = useState('');
  const [guestUpdated, setGuestUpdated] = useState(false);

  // In case this component stays mounted and opens for another guest
  useEffect(() => {
    setNewName(name);
    setNewPhone(phone);
    setNewImage('');
    setGuestUpdated(false);
  }, [guestID, name, phone]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      const fullName = (newName ?? '').trim();
      const phoneVal = (newPhone ?? '').trim(); // keep as string to preserve leading 0s

      formData.append('full_name', fullName);
      formData.append('phone', phoneVal);
      if (newImage) formData.append('image', newImage);

      // Debug: see exactly what you're sending (files won't stringify)
      console.log('Submitting payload:', {
        full_name: fullName,
        phone: phoneVal,
        guestID,
        hasImage: !!newImage,
      });

      const result = await editVisitorAdmin(guestID, formData);
      const success = result?.status === true || result?.success === true || !!result;

      if (success) {
        setGuestUpdated(true);
        toast.success('Guest update submitted successfully');
        callback1();
      } else {
        toast.error('Failed to submit the guest update');
      }
    } catch (err) {
      console.error('Error occurred while submitting the guest update:', err);
      toast.error('Failed to submit the guest update');
    }
  };

  return (
    <div className='w-[360px] h-[450px] rounded-[24px] bg-[#F5F4F5] p-[4px]'>
      <div className='flex flex-row justify-between w-[350px] h-[61px] rounded-t-[24px] border-b-[1px] border-[#E6FBE9] p-[20px] bg-[#FFFFFF]'>
        <div className='w-[185px] h-[41px] py-[5px] px-[1px] gap-[10px]'>
          <h1 className='font-dmsans font-bold text-[24px] text-[#002706] leading-[100%] tracking-normal'>
            Visitor Details
          </h1>
        </div>
        <div
          className='w-[30px] h-[30px] cursor-pointer'
          onClick={(e) => {
            e.stopPropagation();
            callback1();
          }}
        >
          <img src='/x.svg' className='w-[30px] h-[30px]' />
        </div>
      </div>

      <div className='flex flex-col'>
        <h1 className='ml-[20px] mt-[10px] font-dmsans font-bold text-[18px] text-[#005E0E] leading-[100%] tracking-normal'>
          Personal Information
        </h1>

        <form onSubmit={handleSubmit} className='ml-[10px] p-[10px] pb-[5px]'>
          <label htmlFor='name' className='font-semibold font-dmsans text-[14px] text-[#000000] leading-[100%] tracking-normal'>
            Name
          </label>
          <input
            id='name'
            type='text'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className='w-full h-[40px] rounded-[12px] border-[1px] border-[#333333] py-[10px] px-[20px] gap-[20px]'
          />

          <label htmlFor='phone' className='font-semibold font-dmsans text-[14px] text-[#000000] leading-[100%] tracking-normal'>
            Phone
          </label>
          <input
            id='phone'
            type='text'
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            className='w-full h-[40px] rounded-[12px] border-[1px] border-[#333333] py-[10px] px-[20px] gap-[20px]'
          />

          <label htmlFor='photo' className='font-semibold font-dmsans text-[14px] text-[#000000] leading-[100%] tracking-normal'>
            Select Photo
          </label>
          <div className='flex justify-end items-center cursor-pointer w-full h-[40px] border-[1px] border-[#005E0E] rounded-[8px] py-[7px] px-[10px] gap-[10px] mt-[10px]
                          font-dmsans font-bold text-[16px] text-[#E6FBE9] leading-[100%] tracking-normal'>
            <div
              className='bg-[#005E0E] border-[1px] border-[#005E0E] rounded-[2px]'
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
              <Upload size={20} style={{ zIndex: '1' }} />
            </div>
          </div>

          <button
            className='cursor-pointer w-full h-[40px] rounded-[8px] border-[1px] border-[#005E0E] py-[7px] px-[10px] gap-[10px] bg-[#005E0E] mt-[10px]
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
