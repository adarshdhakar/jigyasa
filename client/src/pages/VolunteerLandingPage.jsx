// src/pages2/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">Welcome to the Rural School NGO</h1>
      <Link
        to="/volunteer/dashboard"
        className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
      >
        Go to Volunteer Dashboard
      </Link>
    </div>
  );
}
