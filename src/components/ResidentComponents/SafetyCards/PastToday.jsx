import React, { useState, useEffect } from 'react';
import filterVisitorsByDate from '../../../scripts/filter';
import PastGuestCard from './PastGuestCard';
import NoteP from './NoteP';

export default function PastToday({ allVisitors }) {
  const [todayVisitors, setTodayVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTodayVisitors = async () => {
        const visitors = await filterVisitorsByDate(allVisitors, 'today');
        console.log("Today's Visitors:",visitors);
        setTodayVisitors(visitors);
        return visitors;
    };
    getTodayVisitors();
    setLoading(false);
  }, [allVisitors]);

  return (
    <div className="flex flex-row items-center justify-center w-full h-[106px] py-[12px] px-[8px] gap-[10px] overflow-y-scroll">
      {loading ? (
        <NoteP text={"Loading..."}/>
      ) : todayVisitors.length > 0 ? (
        todayVisitors.map((visitor, index) => (
          <PastGuestCard
            key={index}
            image={visitor.image}
            name={visitor.full_name}
            checkOutTime={visitor.check_out}
            type={visitor.visitor_type}
          />
        ))
      ) : (
        <NoteP text={"No guests checked out today."}/>
      )}
    </div>
  );
}
