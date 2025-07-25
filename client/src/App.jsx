// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import "./App.css";

// MUI Admin Components
import Dashboard from './components/dashboard';
import DashboardSidebar from './components/DashboardSidebar';
import AdminAddVolunteer from './components/AdminAddVolunteer';
import AdminAddSchool from './components/AdminAddSchool';
import AdminVolunteerList from './components/AdminVolunteerList';
import ScheduleClass from './components/ScheduleClass';
import AdminSchoolList from './components/AdminSchoolList';
import VolunteerApplicationForm from './components/VolunteerApplicationForm';
import Uploader from './components/Uploader';
import EvaluationVolunteer from "./components/EvaluationVolunteer";

// Public Layout and Pages
import MainLayout from "./layouts/MainLayout.jsx"; 
import LandingPage from "./pages/LandingPage.jsx";
import Donate from "./pages/Donate.jsx";
import FindReliefCenters from "./pages/FindReliefCenters.jsx";
import Volunteer from "./pages/Volunteer.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import FAQ from "./pages/FAQ.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import LoginSignup from "./pages/LoginSignup.jsx";
import Profile from "./pages/Profile.jsx";
import NotificationPage from "./pages/Notifications.jsx";
import Schools from "./pages/Schools.jsx";
import VolunteerLandingPage from "./pages/VolunteerLandingPage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import Competition from "./pages/Competition.jsx";
import Grade6Chapters from "./pages/Grade6Chapters.jsx";
import ChapterPage from "./pages/ChapterPage.jsx";
import VolunteerDashboard from "./pages/VolunteerDashboard.jsx";
import Videos from "./pages/Videos.jsx";

const adminTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public/Main layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/relief-centers" element={<FindReliefCenters />} />
          <Route path="/becomevolunteer" element={<Volunteer />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/register" element={<LoginSignup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/volunteer/notification" element={<NotificationPage />} />
          <Route path="/volunteer/schools" element={<Schools />} />
          <Route path="/volunteer" element={<VolunteerLandingPage />} />
          <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
          <Route path="/volunteer/competition" element={<Competition />} />
          <Route path="/volunteer/gradechapters" element={<Grade6Chapters />} />
          <Route path="/volunteer/chapterpage/:chapterId" element={<ChapterPage />} />
          <Route path="/volunteer/quizpage/:chapterId" element={<QuizPage />} />
          <Route path="/volunteer/gradechapters/videos" element={<Videos />} />
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-school" element={<AdminAddSchool />} />
            <Route path="/add-volunteer" element={<AdminAddVolunteer />} />
            <Route path="/list-volunteers" element={<AdminVolunteerList />} />
            <Route path="/schedule" element={<ScheduleClass />} />
            <Route path="/schools" element={<AdminSchoolList />} />
            <Route path="/apply-volunteer" element={<VolunteerApplicationForm />} />
            <Route path="/upload" element={<Uploader />} />
            <Route path="/evaluate-volunteer" element={<EvaluationVolunteer />} />
          </Route>
        </Route>

        {/* Admin layout */}
        

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
