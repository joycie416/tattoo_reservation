"use client";

import Calendar from "./Calendar";

const CalendarContainer = () => {
  
  return (
    <Calendar
      dateFn={([date, day]) => (
        <div key={`day_${day}`} className="h-20 border">
          <p>{day}</p>
        </div>
      )}
    />
  );
};

export default CalendarContainer;
