import React, { useEffect, useState } from 'react';

const AdminSchoolList = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch('http://localhost:5000/school/all');
        if (!res.ok) throw new Error('Failed to fetch school data');

        const data = await res.json();
        console.log('API response:', data);

        if (!data || !Array.isArray(data.schools)) {
          throw new Error('Invalid data format received');
        }

        setSchools(data.schools);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-blue-600">
        Loading schools...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-10">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        School Directory
      </h1>

      {!Array.isArray(schools) || schools.length === 0 ? (
        <p className="text-center text-gray-500">No schools found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schools.map((school) => {
            let createdDate = 'N/A';
            let updatedDate = 'N/A';
            try {
              createdDate = school.createdAt ? new Date(school.createdAt).toLocaleDateString() : 'N/A';
              updatedDate = school.updatedAt ? new Date(school.updatedAt).toLocaleDateString() : 'N/A';
            } catch {}

            return (
              <div
                key={school._id || Math.random()}
                className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {school.name || 'Unnamed School'}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Address:</strong> {school.address || 'Not provided'}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Email:</strong> {school.email || 'Not provided'}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Phone:</strong> {school.phone || 'Not provided'}
                </p>
                <div className="text-sm text-gray-500">
                  <strong>Status:</strong> {school.status || 'active'}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Created: {createdDate} | Updated: {updatedDate}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminSchoolList;
