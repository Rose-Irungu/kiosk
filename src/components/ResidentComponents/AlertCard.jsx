export default function AlertCard() {
  return (
    
    <div className=" bg-[#005e0e] rounded-[12px] w-[964px]  p-5 flex flex-col items-center justify-center gap-1">
      <img
        src="/tabler-clock-filled0.svg"
        alt="clock icon"
        className="w-8 h-8 mb-1"
      />
      <span className="text-white font-medium text-[20px]">You have</span>
      <span className="text-[#ffe100] font-semibold text-[32px]">0:00</span>
      <span className="text-white font-medium text-[20px]">
        Minutes to Evacuate
      </span>
    </div>
  );
}
