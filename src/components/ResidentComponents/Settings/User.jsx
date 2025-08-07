import { useRef, useState, useEffect } from 'react';
import { userService } from '../../../services/user';

export default function User({ image, name, unit, id }) {
  const [currentImage, setCurrentImage] = useState(image);
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    setCurrentImage(image);
  }, [image]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profile_picture', file);

      try {
        const res = await userService.updateUser(id, formData);
        if (res.result_code === 0){
          const updatedUser = res.data;
          setCurrentImage(updatedUser.profile_picture);
          localStorage.setItem('userInfo', JSON.stringify(updatedUser));
        }
        console.log(res.message);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };


  return (
    <div
      className='flex flex-col justify-center items-center text-center w-full h-[328px]'
      style={{
        background:
          'radial-gradient(circle at bottom right, #00D21E 5%, #2D2264 30%)',
      }}
    >
      <div className='relative w-[150px] h-[150px]'>
        <div className='w-full h-full rounded-full overflow-hidden border-[1px] border-[#2D2264]'>
          <img
            src={currentImage}
            className='w-full h-full object-cover'
            alt='User'
          />
        </div>

        <div
          className='absolute top-1 right-1 w-[32px] h-[32px] bg-white rounded-full p-1 shadow cursor-pointer z-10'
          onClick={handleEditClick}
        >
          <img
            src='/edit.svg'
            className='w-full h-full object-contain'
            alt='Edit'
          />
        </div>

        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          accept='image/*'
          className='hidden'
        />
      </div>

      <p className='font-dmsans font-semibold text-[24px] text-[#E6EFE7] leading-[100%] tracking-[0] mt-4'>
        {name}
      </p>
      <p className='font-dmsans font-semibold text-[20px] text-[#FFFFFF80] leading-[100%] tracking-[0]'>
        {unit}
      </p>
    </div>
  );
}
