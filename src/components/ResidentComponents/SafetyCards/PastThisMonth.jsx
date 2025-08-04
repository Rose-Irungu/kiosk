import React, { useState, useEffect } from 'react';
import filterVisitorsByDate from '../../../scripts/filter';
import PastGuestCard from './PastGuestCard';
import NoteP from './NoteP';

export default function PastThisMonth({ allVisitors }) {
  const [thisMonthVisitors, setThisMonthVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getThisMonthVisitors = async () =>{
      const visitors = await filterVisitorsByDate(allVisitors, 'this_month');
      console.log("This month Visitors:",visitors);
      setThisMonthVisitors(visitors);
      return visitors;
    };
    
    getThisMonthVisitors();
    setLoading(false);
  }, [allVisitors]);

  return (
    <div className="flex flex-row items-center justify-center w-full h-[106px] py-[12px] px-[8px] gap-[10px] overflow-y-scroll">
      {loading ? (
        <NoteP text={"Loading..."}/>
      ) : thisMonthVisitors.length > 0 ? (
        thisMonthVisitors.map((visitor, index) => (
          <PastGuestCard
            key={index}
            image={visitor.image}
            name={visitor.visitor_name}
            checkOutTime={visitor.check_out}
            type={visitor.visitor_type}
          />
        ))
      ) : (
        <NoteP text={"No guests checked out this month."}/>
      )}
    </div>
  );
}
