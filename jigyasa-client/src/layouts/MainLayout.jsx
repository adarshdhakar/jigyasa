import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";

export default function MainLayout() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Get initial theme from localStorage OR default to dark
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme === "dark";
    localStorage.setItem("theme", "dark"); // Set default if not present
    return true;
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(getInitialTheme());

  const changeLanguage = (e) => {
    localStorage.setItem("language", e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors">
      <Header 
        t={t}
        i18n={i18n}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        changeLanguage={changeLanguage}
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer 
        t={t}
        i18n={i18n}
        changeLanguage={changeLanguage}
      />
    </div>
  );
}
