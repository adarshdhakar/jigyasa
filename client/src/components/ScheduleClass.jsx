import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Dialog } from '@headlessui/react';

const ScheduleCalendar = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formValues, setFormValues] = useState({
    date: '',
    volunteerId: '',
    volunteerEmail: '',
    subject: '',
    school: '',
    schoolEmail: '',
    grade: '',
    startTime: '',
  });

  const formatDate = (isoDateStr) => {
    const [year, month, day] = isoDateStr.split('-');
    return `${day}-${month}-${year}`;
  };

  const handleDateClick = (info) => {
    setFormValues({ ...formValues, date: info.dateStr });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { date, startTime, volunteerId, volunteerEmail, subject, school, schoolEmail, grade } = formValues;

    const formattedDate = formatDate(date);

    const newEvent = {
      title: `${subject} (${t('schedule.grade')} ${grade})`,
      start: `${date}T${startTime}`,
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
    setIsModalOpen(false);

    const scheduleData = {
      volunteerMail: volunteerEmail,
      schoolMail: schoolEmail,
      scheduleInfo: {
        date: formattedDate,
        time: startTime,
      },
    };

    try {
      const response = await fetch('http://localhost:5000/schedule/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scheduleData),
      });

      if (!response.ok) throw new Error(t('schedule.save_failed'));
      console.log(t('schedule.save_success'));
    } catch (err) {
      console.error(t('schedule.error_saving'), err.message);
    }
  };

  const renderEventContent = (eventInfo) => {
    const { start, title } = eventInfo.event;

    const formatTime = (timeStr) =>
      new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <div className="p-1 max-h-20 overflow-hidden whitespace-nowrap text-ellipsis text-xs bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200 rounded-sm">
        <strong>{title}</strong>
        <div>{formatTime(start)}</div>
      </div>
    );
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
  };

  const formatTime = (timeStr) =>
    new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
      <h1 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-300 mb-6">
        {t('schedule.title')}
      </h1>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={events}
        eventContent={renderEventContent}
        height="auto"
      />

      {/* Add Schedule Dialog */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 p-6 shadow-xl">
            <Dialog.Title className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-4">
              {t('schedule.add_schedule')}
            </Dialog.Title>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: t('schedule.volunteer_id'), name: 'volunteerId', type: 'text' },
                { label: t('schedule.volunteer_email'), name: 'volunteerEmail', type: 'email' },
                { label: t('schedule.subject'), name: 'subject', type: 'text' },
                { label: t('schedule.school_name'), name: 'school', type: 'text' },
                { label: t('schedule.school_email'), name: 'schoolEmail', type: 'email' },
                { label: t('schedule.grade'), name: 'grade', type: 'number' },
                { label: t('schedule.start_time'), name: 'startTime', type: 'time' }
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={formValues[name]}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  {t('schedule.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  {t('schedule.save')}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Event Detail Modal */}
      <Dialog open={!!selectedEvent} onClose={() => setSelectedEvent(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 p-6 shadow-xl">
            <Dialog.Title className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-4">
              {selectedEvent?.title}
            </Dialog.Title>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p>
                <strong>{t('schedule.time')}:</strong> {formatTime(selectedEvent?.start)}
              </p>
              <p>
                <strong>{t('schedule.volunteer')}:</strong> {selectedEvent?.extendedProps.volunteerId} (
                {selectedEvent?.extendedProps.volunteerEmail})
              </p>
              <p>
                <strong>{t('schedule.school')}:</strong> {selectedEvent?.extendedProps.school} (
                {selectedEvent?.extendedProps.schoolEmail})
              </p>
              <p>
                <strong>{t('schedule.grade')}:</strong> {selectedEvent?.extendedProps.grade}
              </p>
              <p>
                <strong>{t('schedule.subject')}:</strong> {selectedEvent?.extendedProps.subject}
              </p>
            </div>

            <div className="mt-4 text-right">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {t('schedule.close') || 'Close'}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ScheduleCalendar;
