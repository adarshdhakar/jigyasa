import React from 'react';
import PropTypes from 'prop-types';
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useTranslation } from 'react-i18next';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatBox = ({ title, value, isLoading }) => (
  <div className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-6 text-center transition-transform transform hover:-translate-y-1">
    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">{title}</p>
    {isLoading ? (
      <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mx-auto w-1/2"></div>
    ) : (
      <p className="text-3xl font-bold text-gray-800 dark:text-white">{value}</p>
    )}
  </div>
);

StatBox.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isLoading: PropTypes.bool,
};

StatBox.defaultProps = {
  isLoading: false,
};

const MonthlyAnalysis = ({ assessmentData, attendanceData, isLoading }) => {
  const { t } = useTranslation();

  const pieChartData = {
    labels: [
      t('assessment.improved_performance', 'Improved Performance'),
      t('assessment.completed_assessments', 'Completed Assessments'),
      t('assessment.needs_improvement', 'Needs Improvement')
    ],
    datasets: [{
      data: [85, 75, 15],
      backgroundColor: [
        'rgba(75, 192, 192, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 99, 132, 0.8)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    }]
  };

  const lineChartData = {
    labels: [
      t('weeks.week1', 'Week 1'),
      t('weeks.week2', 'Week 2'),
      t('weeks.week3', 'Week 3'),
      t('weeks.week4', 'Week 4')
    ],
    datasets: [{
      label: t('attendance_chart_label', 'Average Attendance Rate (%)'),
      data: [88, 92, 90, 94],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
    scales: {
      y: { min: 80, max: 100 }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-6 mt-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        {t('monthly_analysis', 'Monthly Analysis')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-3">
            {t('assessment_of_schools', 'Assessment of Schools')}
          </h3>
          {isLoading ? (
            <div className="h-72 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          ) : (
            <>
              <div className="h-72 flex justify-center items-center">
                <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } } }} />
              </div>
              <ul className="mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                {assessmentData.map((itemKey, idx) => (
                  <li key={idx} className="border-b border-gray-200 dark:border-gray-600 pb-1">
                    {t(itemKey)}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div>
          <h3 className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-3">
            {t('live_attendance_tracking', 'Live Attendance Tracking')}
          </h3>
          {isLoading ? (
            <div className="h-72 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          ) : (
            <>
              <div className="h-72 flex justify-center items-center">
                <Line data={lineChartData} options={chartOptions} />
              </div>
              <ul className="mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                {attendanceData.map((itemKey, idx) => (
                  <li key={idx} className="border-b border-gray-200 dark:border-gray-600 pb-1">
                    {t(itemKey)}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

MonthlyAnalysis.propTypes = {
  assessmentData: PropTypes.arrayOf(PropTypes.string).isRequired,
  attendanceData: PropTypes.arrayOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool,
};

MonthlyAnalysis.defaultProps = {
  isLoading: false,
};

const Dashboard = () => {
  const { t } = useTranslation();

  const dashboardData = {
    stats: {
      volunteers: 15,
      schools: 60,
      ongoingPrograms: t('ongoing_programs_value', 'Science Fair')
    },
    assessmentData: [
      'assessment_data.0',
      'assessment_data.1',
      'assessment_data.2'
    ],
    attendanceData: [
      'attendance_data.0',
      'attendance_data.1',
      'attendance_data.2'
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatBox title={t('total_volunteers', 'Total Volunteers')} value={dashboardData.stats.volunteers} />
        <StatBox title={t('total_schools', 'Total Schools')} value={dashboardData.stats.schools} />
        <StatBox title={t('ongoing_programs', 'Ongoing Programs')} value={dashboardData.stats.ongoingPrograms} />
      </div>
      <MonthlyAnalysis 
        assessmentData={dashboardData.assessmentData}
        attendanceData={dashboardData.attendanceData}
      />
    </div>
  );
};

export default Dashboard;
