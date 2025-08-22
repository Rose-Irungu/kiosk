import React, { useEffect, useState } from 'react';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';

// scripts
import selectImage from '../../../scripts/selectImage';
import { editVisitorAdmin } from '../../../services/visitorservice';

export default function EditVisitor({ guestID, name, phone, email, callback1 }) {
  const [newName, setNewName] = useState(name);
  const [newPhone, setNewPhone] = useState(phone);
  const [newImage, setNewImage] = useState('');
  const [guestUpdated, setGuestUpdated] = useState(false);

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
      const phoneVal = (newPhone ?? '').trim();
      const emailVal = (email ?? '').trim();

      // Append required fields
      formData.append('full_name', fullName);
      formData.append('phone_number', phoneVal);
      formData.append('email', emailVal);

      // Append image if selected
      if (newImage instanceof File || newImage instanceof Blob) {
        formData.append('profile_pic', newImage);
      }

      // Debugging output
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const result = await editVisitorAdmin(guestID, formData);
      console.log('Server response:', result);

      const success = result?.result_code === 0 || result?.success === true;
      if (success) {
        setGuestUpdated(true);
        toast.success('Guest update submitted successfully');
        callback1();
      } else {
        toast.error(result?.message || 'Failed to submit the guest update');
      }
    } catch (err) {
      console.error(
        'Error occurred while submitting the guest update:',
        err.response?.data || err.message
      );
      toast.error('Failed to submit the guest update');
    }
  };

  return (
    <div className='w-[250px] sm:w-[360px] h-[450px] rounded-[24px] bg-[#F5F4F5] p-[4px] sm:mt-[1px] mt-[100px]'>
      <div className='flex flex-row justify-between w-[240px] sm:w-[350px] h-[61px] rounded-t-[24px] border-b-[1px] border-[#E6FBE9] p-[20px] bg-[#FFFFFF]'>
        <h1 className='font-dmsans font-bold text-[24px] text-[#002706] leading-[100%]'>
          Visitor Details
        </h1>
        <div
          className='w-[30px] h-[30px] cursor-pointer'
          onClick={(e) => {
            e.stopPropagation();
            callback1();
          }}
        >
          <img src='/x.svg' alt='close' className='w-[30px] h-[30px]' />
        </div>
      </div>

      <div className='flex flex-col'>
        <h1 className='ml-[20px] mt-[10px] font-dmsans font-bold text-[18px] text-[#005E0E] leading-[100%]'>
          Personal Information
        </h1>

        <form onSubmit={handleSubmit} className='ml-[10px] p-[10px] pb-[5px]'>
          <label
            htmlFor='name'
            className='font-semibold font-dmsans text-[14px] text-[#000000]'
          >
            Name
          </label>
          <input
            id='name'
            type='text'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className='w-full h-[40px] rounded-[12px] border-[1px] border-[#333333] py-[10px] px-[20px]'
          />

          <label
            htmlFor='phone'
            className='font-semibold font-dmsans text-[14px] text-[#000000] mt-[10px]'
          >
            Phone
          </label>
          <input
            id='phone'
            type='text'
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            className='w-full h-[40px] rounded-[12px] border-[1px] border-[#333333] py-[10px] px-[20px]'
          />

          <label
            htmlFor='photo'
            className='font-semibold font-dmsans text-[14px] text-[#000000] mt-[10px]'
          >
            Select Photo
          </label>
          <div className='flex justify-end items-center cursor-pointer w-full h-[40px] border-[1px] border-[#005E0E] rounded-[8px] py-[7px] px-[10px] mt-[10px]
                          font-dmsans font-bold text-[16px] text-[#E6FBE9]'>
            <div
              className='bg-[#005E0E] border-[1px] border-[#005E0E] rounded-[2px]'
              onClick={() => {
                if (!guestUpdated) {
                  selectImage()
                    .then((file) => setNewImage(file))
                    .catch((err) =>
                      console.error('Image selection failed:', err)
                    );
                }
              }}
            >
              <Upload size={20} style={{ zIndex: '1' }} />
            </div>
          </div>

          <button
            type='submit'
            className='cursor-pointer w-full h-[40px] rounded-[8px] border-[1px] border-[#005E0E] py-[7px] px-[10px] bg-[#005E0E] mt-[10px]
                          font-dmsans font-bold text-[16px] text-[#E6FBE9]'
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
