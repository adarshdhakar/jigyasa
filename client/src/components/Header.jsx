// src/components/Header.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Menu, X, Sun, Moon, Bell, User } from 'lucide-react';

export default function Header({ t, i18n, mobileOpen, setMobileOpen, darkMode, setDarkMode, changeLanguage }) {
  const navigate = useNavigate();
  const location = useLocation();

  const nonVolunteerPaths = [
    '/',
    '/relief-centers',
    '/becomevolunteer',
    '/about',
    '/faq',
    '/contact',
    '/donate',
    '/login',
    '/register'
  ];

  const isVolunteerPage = !nonVolunteerPaths.includes(location.pathname);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="bg-violet-200 dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="px-4 py-4 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="text-2xl font-bold">{t("Jigyasa")}</button>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-gray-800 dark:text-white">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <div className="hidden md:flex items-center gap-4">
          <select onChange={changeLanguage} value={i18n.language} className="bg-transparent border rounded border-blue-800 dark:border-gray-500 px-2 py-1">
            <option value="en" className="dark:bg-gray-800">English</option>
            <option value="hi" className="dark:bg-gray-800">हिंदी</option>
            {/* <option value="ja" className="dark:bg-gray-800">日本語</option> */}
            <option value="mr" className="dark:bg-gray-800">मराठी</option>
          </select>
          <button onClick={() => setDarkMode(!darkMode)}>{darkMode ? <Sun /> : <Moon />}</button>
          {isVolunteerPage ? (
            <>
              {location.pathname.startsWith("/volunteer") && (
                <Link to="/volunteer/notification">
                  <Bell className="w-6 h-6 text-gray-800 dark:text-white" />
                </Link>
              )}
              {/* <Link to="/profile">
                <User className="w-6 h-6 text-gray-800 dark:text-white" />
              </Link> */}
              {isVolunteerPage && (
                <Button onClick={handleLogout} variant="outline">{t("logout")}</Button>
              )}
            </>
          ) : (
            <>
              <Link to="/login"><Button variant="outline">{t("login")}</Button></Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}