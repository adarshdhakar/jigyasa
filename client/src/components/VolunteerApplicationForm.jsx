import React, { useState, useEffect } from 'react';
import bgImage from '../images/image2.jpeg';

const VolunteerApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    qualification: '',
    location: '',
    email: '',
    phone: '',
  });

  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const res = await fetch('http://localhost:5000/applicant/all');
        const data = await res.json();
        setVolunteers(data.volunteers || []);
      } catch (err) {
        console.error('Error fetching volunteers:', err);
      }
    };

    fetchVolunteers();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const transformedData = {
      ...formData,
      age: parseInt(formData.age),
      qualification: formData.qualification.split(',').map(q => q.trim()),
      gender: formData.gender === 'male' ? 'M' : formData.gender === 'female' ? 'F' : 'O',
    };

    try {
      const response = await fetch('http://localhost:5000/applicant/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transformedData),
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        setFormData({
          name: '', age: '', gender: '', qualification: '',
          location: '', email: '', phone: '',
        });
      } else {
        alert('Failed to submit application.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred while submitting the application.');
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative p-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-full max-w-md mb-10">
        <h2 className="text-blue-800 text-2xl font-bold mb-6 text-center">Volunteer Application</h2>
        <form onSubmit={handleSubmit}>
          {[{ label: 'Name', id: 'name', type: 'text' },
            { label: 'Age', id: 'age', type: 'number' },
            { label: 'Location', id: 'location', type: 'text' },
            { label: 'Email', id: 'email', type: 'email' },
            { label: 'Phone Number', id: 'phone', type: 'tel' }].map(({ label, id, type }) => (
            <div className="mb-4" key={id}>
              <label htmlFor={id} className="block text-blue-700 text-sm font-semibold mb-1">
                {label}:
              </label>
              <input
                type={type}
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                required
                className="shadow appearance-none border border-blue-300 rounded w-full py-2 px-3 text-blue-900 bg-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <div className="mb-4">
            <label htmlFor="gender" className="block text-blue-700 text-sm font-semibold mb-1">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="shadow appearance-none border border-blue-300 rounded w-full py-2 px-3 text-blue-900 bg-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Select Gender --</option>
              <option value="male">Male (M)</option>
              <option value="female">Female (F)</option>
              <option value="other">Other (O)</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="qualification" className="block text-blue-700 text-sm font-semibold mb-1">
              Qualification (comma-separated):
            </label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
              placeholder="e.g. B.Sc, M.Sc, Ph.D"
              className="shadow appearance-none border border-blue-300 rounded w-full py-2 px-3 text-blue-900 bg-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>

      {/* Volunteer List */}
      <div className="relative z-10 bg-white/80 backdrop-blur rounded-xl shadow-md px-6 py-4 w-full max-w-md">
        <h3 className="text-blue-800 font-semibold text-lg mb-3 text-center">Existing Volunteers</h3>
        <ul className="list-disc list-inside text-blue-900">
          {volunteers.length === 0 ? (
            <li className="italic text-sm text-gray-500">No volunteers found.</li>
          ) : (
            volunteers.map((v) => (
              <li key={v._id}>{v.name}</li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default VolunteerApplicationForm;
