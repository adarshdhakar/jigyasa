import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import BASE_URL from "../config";

export default function NotificationPage() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

 const mockNotifications = [
    {
      notificationId: 1,
      message: "You have been invited to teach Science Class for 6th Grade Students ",
      date: "2025-06-10T10:00:00Z",
      type: "schedule_invite",
      status: "pending",
      grade: 6
    },
    {
      notificationId: 2,
      message: "You have been invited to teach Science Class for 7th Grade Students ",
      date: "2025-06-11T14:30:00Z",
      type: "schedule_invite",
      status: "pending",
      grade: 7
    },
    {
      notificationId: 3,
      message: "You have been invited to teach Science Class for 8th Grade Students ",
      date: "2025-06-12T09:00:00Z",
      type: "schedule_invite",
      status: "pending",
      grade: 8
    },
    {
      notificationId: 4,
      message: "Science Lab assistance needed for 6th Grade ",
      date: "2025-06-13T11:00:00Z",
      type: "lab_assistance",
      status: "pending",
      grade: 6
    }
  ];

  useEffect(() => {
    // Simulate API call with setTimeout
    const fetchNotifications = async () => {
      try {
        setTimeout(() => {
          setNotifications(mockNotifications);
          setLoading(false);
        }, 1000); // Simulate 1 second loading time
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleResponse = async (id, action) => {
    try {
      // Simulate API call
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.notificationId !== Number(id)));
      }, 500);
    } catch (error) {
      console.error("Failed to update notification:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">{t('loading_profile')}</p>
      </div>
    );
  }

  return (
    <section className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center text-amber-700 dark:text-amber-300">
        {t('notifications_heading', 'Your Schedule Invites')}
      </h2>
      {notifications.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          {t('no_notifications', 'No new schedule invites.')}
        </p>
      ) : (
        <div className="space-y-4 max-w-3xl mx-auto">
          {notifications.map((invite) => (
            <motion.div
              key={invite.notificationId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col md:flex-row md:items-center justify-between"
            >
              <div className="mb-4 md:mb-0">
                <p className="font-semibold text-gray-900 dark:text-gray-100">{invite.message}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(invite.date).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleResponse(invite.notificationId, "accepted")}
                  className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition"
                >
                  {t("accept", "Accept")}
                </button>
                <button
                  onClick={() => handleResponse(invite.notificationId, "rejected")}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  {t("reject", "Reject")}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <div className="text-center mt-6">
        <Link to="/volunteer/dashboard" className="text-amber-600 hover:underline">
          {t('back_to_dashboard', 'Back to Dashboard')}
        </Link>
      </div>
    </section>
  );
}
