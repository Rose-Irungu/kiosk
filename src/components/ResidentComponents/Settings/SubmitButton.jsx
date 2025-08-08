export default function SubmitButton({ callback }) {
  return (
    <button
      className="h-[25px] sm:h-[32px] w-[50px] sm:w-[70px] px-4 bg-[#00D21E] hover:bg-[#00b51a] transition-colors text-white text-[12px] sm:text-sm font-medium rounded-md flex items-center justify-center leading-none"
      onClick={callback}
    >
      Submit
    </button>
  );
}
