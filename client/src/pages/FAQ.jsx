import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqsList = [
  {
    key: "faq_q1",
    answerKey: "faq_a1",
  },
  {
    key: "faq_q2",
    answerKey: "faq_a2",
  },
  {
    key: "faq_q3",
    answerKey: "faq_a3",
  },
  {
    key: "faq_q4",
    answerKey: "faq_a4",
  },
  {
    key: "faq_q5",
    answerKey: "faq_a5",
  },
];

export default function FAQPage() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 px-6 py-12 text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center text-indigo-700 dark:text-indigo-300 mb-4">
            {t("faq_title", "Frequently Asked Questions")}
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400">
            {t("faq_subtitle", "Here are some answers to common questions about Sahyog.")}
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqsList.map((faq, index) => (
            <div
              key={faq.key}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center text-left focus:outline-none"
              >
                <span className="text-lg font-medium">{t(faq.key)}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 text-sm text-gray-600 dark:text-gray-300"
                  >
                    {t(faq.answerKey)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
