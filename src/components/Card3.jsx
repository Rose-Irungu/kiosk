import { useEffect, useState } from "react";

const STATS_ENDPOINT = "https://api.example.com/visitors/summary"; 

export default function Card3({ className = "" }) {
  // state for the three numbers + status flags
  const [stats, setStats] = useState({
    companyVisitors: 0,
    residentVisitors: 0,
    serviceProviders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* fetch on mount */
  useEffect(() => {
    const ctrl = new AbortController();

    (async () => {
      try {
        const res = await fetch(STATS_ENDPOINT, { signal: ctrl.signal });
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        setStats({
          companyVisitors: data.companyVisitors ?? 0,
          residentVisitors: data.residentVisitors ?? 0,
          serviceProviders: data.serviceProviders ?? 0,
        });
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Couldn’t load visitor stats.");
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => ctrl.abort(); // cancel fetch if component unmounts
  }, []);

  const cards = [
    { label: "Company's Visitors", value: stats.companyVisitors },
    { label: "Residents’ Visitors", value: stats.residentVisitors },
    { label: "Service Providers", value: stats.serviceProviders },
  ];

  return (
    <div
      className={`flex h-[340px] w-[260px] flex-col gap-3 rounded-[10px] bg-white py-6 px-4 ${className}`}
    >
      {loading && (
        <p className="text-center text-sm text-gray-500">Loading…</p>
      )}

      {error && (
        <p className="text-center text-sm text-red-500">{error}</p>
      )}

      {!loading &&
        !error &&
        cards.map(({ label, value }) => (
          <div
            key={label}
            className="w-[228px] h-[88px] flex flex-col gap-4 self-center rounded-[10px] border bg-white p-3"
          >
            <p className="font-dmsans text-sm leading-[20px] text-[#495057] lining-nums proportional-nums">
              {label}
            </p>
            <p className="font-dmsans text-[20px] font-bold leading-[20px] text-[#495057] lining-nums proportional-nums">
              {value}
            </p>
          </div>
        ))}
    </div>
  );
}
