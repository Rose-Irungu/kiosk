export default function Card8({
  link,
}) {
  return (
    
      <div className="flex grid columns-2 place-content-center  h-full rounded-xl bg-white p-6 shadow-md border-2 border-green-900">
        
        <div className="item-self-center"><a href={link} className="text-green-900 text-center font-bold">View Past </a></div>  
         <div><a href={link} className="text-green-900 text-center  font-bold">Reports</a></div> 
      </div>
    
  );
}
