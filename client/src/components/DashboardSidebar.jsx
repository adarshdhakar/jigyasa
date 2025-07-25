import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Menu,
  School,
  PersonAdd,
  Dashboard,
  ExpandLess,
  ExpandMore,
  Add,
  Schedule,
  Assessment,
  Upload,
} from '@mui/icons-material';

const menuItems = [
  { key: 'menu.schedule', icon: <Schedule fontSize="small" />, path: '/schedule' },
  { key: 'menu.evaluation_volunteer', icon: <Assessment fontSize="small" />, path: '/evaluate-volunteer' },
  { key: 'menu.upload', icon: <Upload fontSize="small" />, path: '/upload' },
];

const DashboardSidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [schoolOpen, setSchoolOpen] = useState(false);
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const [schoolSearch, setSchoolSearch] = useState('');
  const [volunteerSearch, setVolunteerSearch] = useState('');

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const toggleSchool = () => setSchoolOpen(!schoolOpen);
  const toggleVolunteer = () => setVolunteerOpen(!volunteerOpen);

  const isActive = (path) => location.pathname === path;

  const menuItemClass = (path) =>
    `flex items-center px-4 py-2 rounded-md transition text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 ${
      isActive(path) ? 'bg-gray-200 dark:bg-gray-700 font-semibold' : ''
    }`;

  const sectionHeaderClass = `flex items-center justify-between px-4 py-2 cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition`;

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden p-2 m-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
        onClick={toggleMobile}
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 w-60 shadow-md transition-transform
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          bg-gray-200 dark:bg-gray-800
        `}
      >
        <div className="border-b border-gray-300 dark:border-gray-700 my-2"></div>

        <nav className="flex flex-col space-y-1 mt-2">

          {/* Dashboard */}
          <Link to="/dashboard" className={menuItemClass('/dashboard')}>
            <Dashboard className="mr-3 text-blue-600" />
            {t('menu.dashboard')}
          </Link>

          {/* School Section */}
          <div>
            <div onClick={toggleSchool} className={sectionHeaderClass}>
              <div className="flex items-center">
                <School className="mr-3 text-blue-600" />
                {t('menu.school')}
              </div>
              {schoolOpen ? <ExpandLess /> : <ExpandMore />}
            </div>

            <div
              className={`pl-6 transition-all duration-300 overflow-hidden ${
                schoolOpen ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <input
                type="text"
                placeholder={t('placeholders.search_schools')}
                value={schoolSearch}
                onChange={(e) => setSchoolSearch(e.target.value)}
                className="bg-gray-100 dark:bg-gray-800 text-sm rounded px-3 py-2 w-full mt-2 mb-2 text-gray-700 dark:text-gray-300 placeholder-gray-400"
              />

              <Link to="/add-school" className={menuItemClass('/add-school')}>
                <Add className="mr-3 text-green-600" />
                {t('menu.add_school')}
              </Link>

              <Link to="/schools" className={menuItemClass('/schools')}>
                <School className="mr-3 text-green-600" />
                {t('menu.school_list')}
              </Link>
            </div>
          </div>

          {/* Volunteer Section */}
          <div>
            <div onClick={toggleVolunteer} className={sectionHeaderClass}>
              <div className="flex items-center">
                <PersonAdd className="mr-3 text-blue-600" />
                {t('menu.volunteer')}
              </div>
              {volunteerOpen ? <ExpandLess /> : <ExpandMore />}
            </div>

            <div
              className={`pl-6 transition-all duration-300 overflow-hidden ${
                volunteerOpen ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <input
                type="text"
                placeholder={t('placeholders.search_volunteers')}
                value={volunteerSearch}
                onChange={(e) => setVolunteerSearch(e.target.value)}
                className="bg-gray-100 dark:bg-gray-800 text-sm rounded px-3 py-2 w-full mt-2 mb-2 text-gray-700 dark:text-gray-300 placeholder-gray-400"
              />

              <Link to="/add-volunteer" className={menuItemClass('/add-volunteer')}>
                <Add className="mr-3 text-green-600" />
                {t('menu.add_volunteer')}
              </Link>

              <Link to="/list-volunteers" className={menuItemClass('/volunteers')}>
                <PersonAdd className="mr-3 text-green-600" />
                {t('menu.volunteer_list')}
              </Link>
            </div>
          </div>

          {/* Other Menu Items */}
          {menuItems.map((item) => (
            <Link key={item.key} to={item.path} className={menuItemClass(item.path)}>
              <span className="mr-3 text-blue-600">{item.icon}</span>
              {t(item.key)}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default DashboardSidebar;
