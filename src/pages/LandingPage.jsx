import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative h-screen overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(108.11deg, rgba(45, 34, 100, 0.6) 48.75%, rgba(0, 210, 30, 0.6) 100%),
          url('/landing-page.png')
        `,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <div className="flex flex-wrap justify-center gap-10">
          <div 
          onClick={() => navigate('/home')}
      
          className="w-[350px] h-[110px] bg-[#130e2a] hover:bg-[#160c45] rounded-[24px] flex items-center justify-center p-[30px_20px] mt-20">
            <button className="text-white text-[34px] font-semibold text-center">KIOSK</button>
          </div>

          <div 
          onClick={()=> navigate('/loginform')}
          className="w-[350px] h-[110px] bg-[#130e2a] hover:bg-[#160c45]  rounded-[24px] flex items-center justify-center p-[30px_20px] mt-20">
            <button className="text-white text-[34px] font-semibold text-center">
              GET STARTED
            </button>
          </div>
        </div>
      </div>

      {/* Image stays where you want it */}
      <img
        src="/group-501.svg"
        alt="Decorative"
        className="absolute top-[10px] left-[565px] aspect-[150/130.29] h-auto"
      />
    </div>
  );
};

export default LandingPage;
