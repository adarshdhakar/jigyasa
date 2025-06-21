import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function DonationPage() {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    setLoading(true);
    try {
      const orderRes = await axios.post("http://localhost:5000/api/payment/create-order", {
        amount: Number(amount),
      });

      const { id: order_id, amount: orderAmount, currency } = orderRes.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderAmount.toString(),
        currency,
        name: "Sahyog Donation",
        description: "Donation towards disaster relief",
        order_id,
        handler: function (response) {
          alert(`Thank you for your support!\nPayment ID: ${response.razorpay_payment_id}`);
          setAmount("");
          setName("");
          setEmail("");
        },
        prefill: {
          name,
          email,
        },
        theme: {
          color: "#4F46E5",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto mt-20 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center text-indigo-600 dark:text-white mb-4">
          Support Sahyog 🙏
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Your donation helps us bring timely aid during disasters.
        </p>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="John Doe"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Donation Amount (INR)</label>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. 500"
          />
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading ? "Processing..." : "Donate Now"}
        </button>
      </motion.div>
      <br />
      <br />
    </>
  );
}
