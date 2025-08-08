export default function SetP({ text, callback }) {
  return (
    <div
      onClick={callback}
      className="h-8 px-2 text-[#00D21E] text-[12px] sm:text-sm font-medium cursor-pointer flex items-center justify-center font-dmsans leading-none"
    >
      {text}
    </div>
  );
}
