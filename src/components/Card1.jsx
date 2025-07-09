import { useState, useEffect } from "react";

export default function Card1({
  cardTitle,
  link,
  linkHref,
  icon,
  endpoint,
}) {
  const [no, setNo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setNo(data.count);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [endpoint]);

  return (
    <div
      id="container"
      className="basis-full w-full md:basis-1/2 md:w-1/2 lg:basis-1/4 lg:w-1/4 p-2"
    >
      <div className="flex items-center justify-between h-full rounded-xl bg-white p-6 shadow-md">
        <div id="details" className="flex flex-col gap-1">
          <h1 className="text-sm font-dmsans font-semibold text-gray-700">{cardTitle}</h1>

          {loading && <h2 className="animate-pulse text-gray-400">…</h2>}
          {error && <h2 className="text-gray-600">0</h2>}
          {!loading && !error && (
            <h2 className="text-base font-dmsans font-bold text-gray-600">{no}</h2>
          )}

          <a
            href={linkHref}
            className="text-xs font-dmsans font-medium text-indigo-700 underline"
          >
            {link}
          </a>
        </div>

        <div
          id="icon"
          className="flex items-center justify-center ml-4 flex-shrink-0 text-green-500 text-4xl"
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
