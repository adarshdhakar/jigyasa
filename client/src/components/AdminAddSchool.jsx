import React, { useState } from 'react';
import schoolBg from '../images/image1.jpeg';

const AdminAddSchool = () => {
  const [schoolData, setSchoolData] = useState({
    name: '',
    address: '',
    contact: {
      email: '',
      phone: '',
    },
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email' || name === 'phone') {
      setSchoolData((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [name]: value,
        },
      }));
    } else {
      setSchoolData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, address, contact } = schoolData;

    // Basic validation
    if (!name || !address || !contact.email || !contact.phone) {
      setMessage({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/school/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schoolData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'School added successfully!' });
        setSchoolData({
          name: '',
          address: '',
          contact: { email: '', phone: '' },
        });
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data?.error || 'Failed to add school.' });
      }
    } catch (error) {
      console.error('Error adding school:', error);
      setMessage({ type: 'error', text: 'An error occurred while adding the school.' });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat relative p-4"
      style={{ backgroundImage: `url(${schoolBg})` }}
    >
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 bg-white border border-blue-100 shadow-xl rounded-xl px-10 py-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Add New School</h2>

        {message.text && (
          <div
            className={`mb-4 p-3 rounded-md text-center font-medium ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-lg font-semibold text-blue-700 mb-1">School Name</label>
            <input
              type="text"
              name="name"
              value={schoolData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white text-blue-900"
              placeholder="e.g. Bluebell High School"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-blue-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={schoolData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white text-blue-900"
              placeholder="City, Locality, PIN"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-blue-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={schoolData.contact.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white text-blue-900"
              placeholder="school@example.com"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-blue-700 mb-1">Contact Number</label>
            <input
              type="tel"
              name="phone" // <-- Change this
              value={schoolData.contact.phone}
              onChange={handleChange}
              required
              pattern="\d{10}"
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white text-blue-900"
              placeholder="10-digit number"
            />
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add School
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddSchool;
