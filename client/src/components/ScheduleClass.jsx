import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const ScheduleCalendar = () => {
  const [events, setEvents] = useState([]);

  const formatDate = (isoDateStr) => {
    const [year, month, day] = isoDateStr.split('-');
    return `${day}-${month}-${year}`; // DD-MM-YYYY
  };

  const handleDateClick = async (info) => {
    const volunteerId = prompt('Enter Volunteer ID');
    const volunteerEmail = prompt('Enter Volunteer Email');
    const subject = prompt('Enter Subject');
    const school = prompt('Enter School Name');
    const schoolEmail = prompt('Enter School Email');
    const grade = prompt('Enter Grade');
    const startTime = prompt('Enter Start Time (HH:MM, 24hr)');

    if (
      volunteerId &&
      volunteerEmail &&
      subject &&
      school &&
      schoolEmail &&
      grade &&
      startTime
    ) {
      const isoDate = info.dateStr; // YYYY-MM-DD
      const formattedDate = formatDate(isoDate); // DD-MM-YYYY

      const newEvent = {
        title: `${subject} (Grade ${grade})`,
        start: `${isoDate}T${startTime}`,
        extendedProps: {
          volunteerId,
          volunteerEmail,
          school,
          schoolEmail,
          subject,
          grade,
        },
      };

      setEvents((prev) => [...prev, newEvent]);

      // ✅ Prepare payload for backend
      const scheduleData = {
        volunteerMail: volunteerEmail,
        schoolMail: schoolEmail,
        scheduleInfo: {
          date: formattedDate,
          time: startTime,
        },
      };
      
      console.log(scheduleData)

      try {
        const response = await fetch('http://localhost:5000/schedule/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(scheduleData),
        });

        if (!response.ok) throw new Error('Failed to save schedule');
        console.log('✅ Schedule saved successfully');
      } catch (err) {
        console.error('❌ Error saving schedule:', err.message);
      }
    }
  };

  const renderEventContent = (eventInfo) => {
    const { extendedProps, start, title } = eventInfo.event;
    const formatTime = (timeStr) =>
      new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <div style={{ lineHeight: '1.4', fontSize: '0.85rem' }}>
        <strong style={{ display: 'block', marginBottom: 2 }}>{title}</strong>
        <span style={{ display: 'block', color: '#555' }}>
          Time: {formatTime(start)}
        </span>
        <span style={{ display: 'block', color: '#777' }}>
          Volunteer: {extendedProps.volunteerId} ({extendedProps.volunteerEmail})
        </span>
        <span style={{ display: 'block', color: '#777' }}>
          School: {extendedProps.school} ({extendedProps.schoolEmail})
        </span>
      </div>
    );
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      dateClick={handleDateClick}
      events={events}
      eventContent={renderEventContent}
    />
  );
};

export default ScheduleCalendar;
