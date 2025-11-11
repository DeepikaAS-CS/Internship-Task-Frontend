import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { Toaster, toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      toast.success("Registration successful!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-200 via-white to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <Toaster position="top-center" />

      {/* 🔙 Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 dark:bg-slate-700/70 backdrop-blur-md border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-medium hover:bg-white/80 dark:hover:bg-slate-600 transition-all shadow-sm"
      >
        <ArrowLeft size={18} />
        Back to Home
      </button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="backdrop-blur-md bg-white/80 dark:bg-slate-800/90 p-8 rounded-2xl shadow-2xl w-[90%] max-w-md border border-slate-200 dark:border-slate-700"
      >
        <h2 className="text-3xl font-semibold text-center mb-6 text-slate-800 dark:text-white">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-md"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-700 dark:text-slate-400 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
