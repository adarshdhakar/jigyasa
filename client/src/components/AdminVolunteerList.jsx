import React, { useEffect, useState } from 'react';
import bgImage from '../images/image2.jpeg'; // Ensure image is present here

const AdminVolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch('/');
        const data = await response.json();
        setVolunteers(data);
      } catch (err) {
        console.error('Error fetching volunteers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  const assigned = volunteers.filter(v => v.assignedSchool);
  const unassigned = volunteers.filter(v => !v.assignedSchool);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: 'blur(30px)',
          zIndex: 0,
        }}
      />

      {/* Content container */}
      <div
        className="relative bg-white bg-opacity-90 rounded-xl shadow-xl w-full max-w-5xl p-8 z-10"
      >
        <h1 className="text-3xl font-bold text-blue-800 text-center mb-8">
          Volunteer Assignment Overview
        </h1>

        {loading ? (
          <p className="text-center text-blue-600">Loading volunteers...</p>
        ) : (
          <>
            {/* Assigned Volunteers */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                 Assigned Volunteers
              </h2>
              {assigned.length === 0 ? (
                <p className="text-gray-600">No assigned volunteers.</p>
              ) : (
                <ul className="space-y-2">
                  {assigned.map(v => (
                    <li
                      key={v._id}
                      className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-blue-900"
                    >
                      <strong>{v.name}</strong> – {v.assignedSchool}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Unassigned Volunteers */}
            <div>
              <h2 className="text-2xl font-semibold text-red-600 mb-4">
                 Unassigned Volunteers
              </h2>
              {unassigned.length === 0 ? (
                <p className="text-gray-600">Raj</p>
              ) : (
                <ul className="space-y-2">
                  {unassigned.map(v => (
                    <li
                      key={v._id}
                      className="bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-red-800"
                    >
                      <strong>{v.name}</strong> – Not Assigned
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminVolunteerList;
