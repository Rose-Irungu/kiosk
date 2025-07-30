export default function Card7({
  link,
}) {
  return (
    
      <div className="flex grid columns-1 place-content-center  h-full rounded-xl bg-inherit p-6 shadow-md">
        
        <div className="item-self-center"><a href={link} className="text-white text-center  font-bold">Report an </a></div>  
         <div><a href={link} className="text-white text-center  font-bold">incident</a></div> 
      </div>
      );                                                 
}
