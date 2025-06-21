import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("authUser"));
    setUser(userData);
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 dark:text-gray-300">
        {t("loading_profile")}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            // src={user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name || user.email}`}
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name || user.email}`}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-violet-400"
          />  
          <div>
            <h1 className="text-2xl font-bold">{user.displayName || "Anonymous"}</h1>
            <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {t("member_since")}: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md mt-6 p-6">
          <h2 className="text-xl font-semibold mb-4">{t("personal_info")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">{t("full_name")}</label>
              <input
                className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                value={user.displayName || ""}
                disabled
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">{t("email")}</label>
              <input
                className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                value={user.email}
                disabled
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">{t("user_id")}</label>
              <input
                className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                value={user.uid}
                disabled
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">{t("auth_provider")}</label>
              <input
                className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                value="Google"
                disabled
              />
            </div>
          </div>
        </div>

        {/* User Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md mt-6 p-6">
          <h2 className="text-xl font-semibold mb-4">{t("your_stats")}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">1523</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t("logins")}</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">317</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t("feedbacks")}</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">₹24,000</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t("donations")}</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">89</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t("active_sessions")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
