import React, { useState, useEffect } from 'react';
import filterVisitorsByDate from '../../../scripts/filter';
import PastGuestCard from './PastGuestCard';
import NoteP from './NoteP';

export default function PastToday({ allVisitors }) {
  const [thisWeekVisitors, setThisWeekVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getThisWeekVisitors = async () => {
      const visitors = await filterVisitorsByDate(allVisitors, 'this_week');
      console.log("This week visitors:", visitors);
      setThisWeekVisitors(visitors);
      return visitors;
    };
    getThisWeekVisitors();
    setLoading(false);
  }, [allVisitors]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-[106px] py-[12px] px-[8px] gap-[10px] overflow-y-scroll">
      {loading ? (
        <NoteP text={"Loading"}/>
      ) : thisWeekVisitors.length > 0 ? (
        thisWeekVisitors.map((visitor, index) => (
          <PastGuestCard
            key={index}
            image={visitor.image}
            name={visitor.visitor_name}
            checkOutTime={visitor.check_out}
            type={visitor.visitor_type}
          />
        ))
      ) : (
        <NoteP text={"No guests checked out this week."}/>
      )}
    </div>
  );
}
