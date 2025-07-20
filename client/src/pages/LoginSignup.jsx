import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { auth, googleProvider, facebookProvider } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";
import Toast from "../components/Toast";
import BASE_URL from "../config.js";

const LoginSignup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);
  const { t } = useTranslation();

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  useEffect(() => {
    setIsLogin(location.pathname === "/login");
  }, [location]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4 transition-colors">
      <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md transition-all">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900 dark:text-white">
          {isLogin ? t('title_login') : t('title_signup')}
        </h2>

        <form className="space-y-5">
          <input
            type="email"
            className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
            placeholder={t('email_placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
            placeholder={t('password_placeholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            onClick={() => {
              if (email === "adarshdhakar@gmail.com" && password === "adarsh") {
                navigate("/volunteer/dashboard");
              } else if (email && password) {
                navigate("/dashboard");
              }
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLogin ? t('submit_login') : t('submit_signup')}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
          <span className="px-3 text-sm text-gray-500 dark:text-gray-400">OR</span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            onClick={() => handleSocialLogin(googleProvider)}
            className="flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-3 rounded-lg shadow-sm hover:shadow-md transition-all text-gray-700 dark:text-gray-200"
          >
            <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" />
            {t('google')}
          </button>

          <button
            onClick={() => handleSocialLogin(facebookProvider)}
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md transition-all"
          >
            <img
              src="https://img.icons8.com/ios-filled/24/ffffff/facebook--v1.png"
              alt="Facebook"
            />
            {t('facebook')}
          </button>
        </div>

        <p className="text-sm text-center mt-8 text-gray-600 dark:text-gray-400">
          {isLogin ? t('toggle_to_signup') : t('toggle_to_login')}{" "}
          <button
            onClick={() => {
              navigate(isLogin ? '/register' : '/login');
            }}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            {isLogin ? t('toggle_signup') : t('toggle_login')}
          </button>
        </p>
      </div>

      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default LoginSignup;
