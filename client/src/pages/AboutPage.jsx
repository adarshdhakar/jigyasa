import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-center text-amber-700 dark:text-amber-300 mb-4">
            {t("about_title", "About Vidyodaya")}
          </h1>
          <p className="text-center max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            {t(
              "about_intro",
              "Vidyodaya is a nonprofit platform that connects volunteers, donors, and schools to empower rural education and unlock every child's potential."
            )}
          </p>
        </motion.div>

        {/* Our Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-400">
            {t("our_mission", "Our Mission")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {t(
              "about_mission",
              "To build an inclusive platform that organizes volunteer efforts, sponsors schools, and tracks student progress—bridging rural education gaps."
            )}
          </p>
        </motion.div>

        {/* What We Offer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-400">
            {t("our_services", "What We Offer")}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>{t("anonymous_support", "Project-based volunteer matching")}</li>
            <li>{t("multilingual_assistance", "Content and tools in multiple regional languages")}</li>
            <li>{t("volunteer_programs", "Training and mentorship programs for volunteers")}</li>
            <li>{t("resources_and_guides", "Open-source lesson plans and teaching materials")}</li>
            <li>{t("partnerships", "Collaborations with educational NGOs and institutions")}</li>
          </ul>
        </motion.div>

        {/* Our Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-amber-600 dark:text-amber-400">
            {t("our_team", "Who We Are")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            {t(
              "about_team",
              "A dedicated team of educators, technologists, and volunteers passionate about making quality education accessible in rural communities."
            )}
          </p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-amber-50 dark:bg-gray-800 p-6 rounded-lg text-center"
        >
          <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-300 mb-2">
            {t("join_us", "Join the Movement")}
          </h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            {t(
              "about_cta",
              "Whether you want to volunteer, sponsor a school, or spread the word—every effort helps shape a brighter future." 
            )}
          </p>
          <Link 
            to="/becomevolunteer"
            className="inline-block px-6 py-2 rounded bg-amber-600 text-white hover:bg-amber-700 transition"
          >
            {t("become_volunteer", "Become a Volunteer")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
