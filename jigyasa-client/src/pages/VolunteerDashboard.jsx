import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area,
} from 'recharts';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react'; // optional icons

const VolunteerDashboard = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const COLORS = ['#4F46E5', '#22C55E', '#F59E0B'];

  const chartData = [
    { name: 'Sessions', value: 12 },
    { name: 'Hours', value: 26 },
    { name: 'Students', value: 48 },
  ];

  const pieData = [
    { name: 'One-on-One', value: 8 },
    { name: 'Group Sessions', value: 4 },
    { name: 'Workshops', value: 3 },
  ];

  const trendData = [
    { name: 'Week 1', sessions: 2 },
    { name: 'Week 2', sessions: 4 },
    { name: 'Week 3', sessions: 3 },
    { name: 'Week 4', sessions: 6 },
  ];

  const monthlyData = [
    { name: 'Jan', count: 4 },
    { name: 'Feb', count: 6 },
    { name: 'Mar', count: 7 },
    { name: 'Apr', count: 5 },
  ];

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors relative">
      {/* Floating Buttons */}
      <button
        onClick={() => navigate('/volunteer/schools')}
        className="fixed top-1/2 left-4 transform -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-md z-50 transition"
        title="Go to Schools"
      >
        <ArrowLeftCircle className="w-6 h-6" />
      </button>

      <button
        onClick={() => navigate('/volunteer/competition')}
        className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-md z-50 transition"
        title="Go to Competition"
      >
        <ArrowRightCircle className="w-6 h-6" />
      </button>

      <div className="max-w-6xl mx-auto pt-16 px-6">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-white">Welcome, Volunteer! 👋</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4F46E5" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Engagement Type</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name }) => name}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Area Chart */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Weekly Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="sessions" stroke="#10B981" fill="#D1FAE5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Secondary Bar Chart */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Monthly Sessions</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#F97316" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default VolunteerDashboard;
