export default function SubmitButton({ callback }) {
  return (
    <button
      className="h-8 px-4 bg-[#00D21E] hover:bg-[#00b51a] transition-colors text-white text-sm font-medium rounded-md flex items-center justify-center leading-none"
      onClick={callback}
    >
      Submit
    </button>
  );
}
