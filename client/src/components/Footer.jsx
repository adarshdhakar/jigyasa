import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer({t, i18n, changeLanguage}) {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm pt-10 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">

        {/* Branding */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Jigyasa</h2>
          <p>{t("footer_description", "Your support network in times of crisis.")}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{t("quick_links", "Quick Links")}</h3>
          <ul className="space-y-1">
            {/* <li><Link to="/" className="hover:underline">{t("home", "Home")}</Link></li> */}
            <li><Link to="/about" className="hover:underline">{t("about", "About")}</Link></li>
            <li><Link to="/faq" className="hover:underline">{t("faq", "FAQ")}</Link></li>
            <li><Link to="/contact" className="hover:underline">{t("contact", "Contact")}</Link></li>
            <li><Link to="/becomevolunteer" className="hover:underline">{t("volunteer", "Volunteer")}</Link></li>
            <li><Link to="/donate" className="hover:underline">{t("donate", "Donate")}</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{t("contact_us", "Contact Us")}</h3>
          <ul className="space-y-1">
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@jigyasa.org</li>
            {/* <li>{t("address", "IIT Bhubaneswar, Odisha, India")}</li> */}
          </ul>
        </div>

        {/* Language & Socials */}
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{t("language", "Language")}</h3>
          <select
            onChange={changeLanguage}
            value={i18n.language}
            className="w-full px-2 py-1 rounded border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            {/* <option value="ja">日本語</option> */}
            <option value="mr">मराठी</option>
          </select>

          <div className="flex gap-4 mt-4 text-gray-600 dark:text-gray-400">
            <a href="#" aria-label="Facebook" className="hover:text-blue-600"><Facebook size={18} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-sky-500"><Twitter size={18} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500"><Instagram size={18} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Jigyasa. {t("all_rights_reserved", "All rights reserved.")}.
      </div>
    </footer>
  );
}
