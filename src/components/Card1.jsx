import { Link } from 'react-router-dom'

export default function Card1({
  cardTitle,
  link,
  linkHref,
  icon,
  count,
  data=[],
}) {
          
  return (
    
    
    <div
      id="container"
      className="basis-full w-full md:basis-1/2 md:w-1/2 lg:basis-1/4 lg:w-1/4 p-2"
    >
      <div className="flex items-center justify-between h-full rounded-xl bg-white p-6 shadow-md">
        <div id="details" className="flex flex-col gap-1">
          <h1 className="text-sm font-dmsans font-semibold text-gray-700">{cardTitle}</h1>
          <h2 className="text-base font-dmsans font-bold text-gray-600">{count}</h2>
          <Link to={linkHref} state={{data,cardTitle}} className="text-xs font-dmsans font-medium text-[#40864a] underline"> {link}</Link>
          {/* <a
            href={linkHref}
            className="text-xs font-dmsans font-medium text-[#40864a] underline"
          >
            {link}
          </a> */}
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
