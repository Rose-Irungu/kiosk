export default function EmergencyCard({
  icon = "/emg1.svg",
  title = "Emergency Alert",
  headline,
  timeAgo,
  instructionsTitle,
  instructions = [],
  notes = [],
}) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-[12px] p-6 mb-6 relative w-[964px] flex flex-col gap-[10px] text-[#610c07] font-sans">
      <div className="flex items-center mb-[20px]">
        <img src={icon} alt="emergency icon" className="w-8 h-8" />
        <h2 className="text-[#610c07] font-semibold text-2xl">{title}</h2>
      </div>

      {headline && <p className="text-[20px] font-medium">{headline}</p>}
      {timeAgo && <p className="text-[16px]">{timeAgo}</p>}

      {instructionsTitle && (
        <p className="text-[20px] font-semibold">{instructionsTitle}</p>
      )}

      <ul className="text-[20px] list-decimal pl-5 space-y-1">
        {instructions.map((step, idx) => (
          <li key={`instruction-${idx}`}>{step}</li>
        ))}
        {notes.map((note, idx) => (
          <li key={`note-${idx}`} className="text-[#610c07]">
            <span className="font-bold">Note:</span> {note}
          </li>
        ))}
      </ul>
    </div>
  );
}
