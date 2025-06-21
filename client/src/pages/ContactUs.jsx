import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function ContactPage() {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Sahyog Contact Form from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=support@sahyog.org&su=${subject}&body=${body}`;
    window.open(mailtoLink, "_blank"); // Opens Gmail in new tab
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4 text-center">{t("contact_title", "Contact Us")}</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
        {t("contact_subtitle", "We’re here to support you. Reach out anytime.")}
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Mail className="text-indigo-600 dark:text-indigo-400 mt-1" />
            <div>
              <p className="font-semibold">{t("email", "Email")}</p>
              <p>support@sahyog.org</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="text-indigo-600 dark:text-indigo-400 mt-1" />
            <div>
              <p className="font-semibold">{t("address", "Address")}</p>
              <p>{t("contact_address", "IIT Bhubaneswar, Odisha, India")}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="text-indigo-600 dark:text-indigo-400 mt-1" />
            <div>
              <p className="font-semibold">{t("phone", "Phone")}</p>
              <p>+91-XXXXXXXXXX</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium">{t("name", "Your Name")}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("enter_name", "Enter your name")}
              className="w-full border px-4 py-2 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">{t("email", "Your Email")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("enter_email", "Enter your email")}
              className="w-full border px-4 py-2 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">{t("message", "Your Message")}</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("enter_message", "Type your message here...")}
              className="w-full border px-4 py-2 rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              rows="5"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded"
          >
            {t("send_message", "Send Message")}
          </button>
        </form>
      </div>
    </section>
  );
}
