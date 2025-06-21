import React from "react";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";

const stats = [
  { label: "Total Users", value: 1523 },
  { label: "Active Sessions", value: 89 },
  { label: "Feedbacks", value: 317 },
  { label: "Donations", value: 25000 }
];

const donationData = [
  { name: "Education", value: 12000 },
  { name: "Health", value: 6000 },
  { name: "Relief", value: 3000 },
  { name: "Other", value: 3000 }
];

const sessionData = [
  { name: "Mon", sessions: 20 },
  { name: "Tue", sessions: 45 },
  { name: "Wed", sessions: 30 },
  { name: "Thu", sessions: 50 },
  { name: "Fri", sessions: 40 },
  { name: "Sat", sessions: 25 },
  { name: "Sun", sessions: 15 }
];

const feedbackData = [
  { x: 1, y: 20 },
  { x: 2, y: 25 },
  { x: 3, y: 30 },
  { x: 4, y: 28 },
  { x: 5, y: 35 },
  { x: 6, y: 32 },
  { x: 7, y: 40 }
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#d0ed57"];

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-4xl font-bold mb-6">{t("welcome-dashboard")}</h1>

      {/* Charts Grid */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">

    {/* Bar Chart */}
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">{t("weekly_sessions")}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={sessionData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sessions" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* Pie Chart */}
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">{t("donation_distribution")}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={donationData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {donationData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>

    {/* Line Chart */}
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">{t("feedback_over_time")}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={feedbackData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="y" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>

    {/* Placeholder for 4th Chart (or repeat another if needed) */}
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">{t("donation_distribution")}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={donationData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {donationData.map((entry, index) => (
              <Cell key={`cell2-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
    </div>
  );
};

export default Dashboard;
