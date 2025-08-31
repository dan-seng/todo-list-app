import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './Calendar.css';

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const events = [
    { title: 'Meeting', date: '2025-09-01' },
    { title: 'Project Deadline', date: '2025-09-10' },
  ];

  const navigate = (action) => {
    const newDate = new Date(currentDate);
    if (action === 'prev') {
      newDate.setFullYear(newDate.getFullYear() - 1);
    } else {
      newDate.setFullYear(newDate.getFullYear() + 1);
    }
    setCurrentDate(newDate);
  };

  const renderCalendar = (monthOffset) => {
    const date = new Date(currentDate.getFullYear(), monthOffset, 1);
    
    return (
      <div key={monthOffset} className="calendar-month">
        <h3>{date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}</h3>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          initialDate={date}
          headerToolbar={false}
          height="auto"
          fixedWeekCount={false}
          dayMaxEvents={true}
          events={events}
        />
      </div>
    );
  };

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <button onClick={() => navigate('prev')} className="nav-button">
          &lt; Previous Quarter
        </button>
        <h2>Calendar {currentDate.getFullYear()}</h2>
        <button onClick={() => navigate('next')} className="nav-button">
          Next Quarter &gt;
        </button>
      </div>
      <div className="calendars-grid">
        {[...Array(9)].map((_, index) => renderCalendar(index))}
      </div>
    </div>
  );
}
