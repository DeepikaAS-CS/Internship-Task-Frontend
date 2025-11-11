import { useState } from "react";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  BookOpen,
  BarChart3,
  Clock4,
  Sun,
  Moon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const { theme, toggleTheme } = useTheme(); // ✅ Correct placement — inside component
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard />, path: "/dashboard" },
    { name: "Resources", icon: <BookOpen />, path: "/resources" },
    { name: "Analytics", icon: <BarChart3 />, path: "/charts" },
    { name: "Pomodoro", icon: <Clock4 />, path: "/pomodoro" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <motion.div
      animate={{ width: open ? 220 : 70 }}
      transition={{ duration: 0.3 }}
      className="h-screen bg-white/80 dark:bg-slate-900 backdrop-blur-lg border-r border-slate-200 dark:border-slate-800 flex flex-col items-center py-6 shadow-lg fixed"
    >
      {/* Sidebar Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="mb-8 bg-primary text-white p-2 rounded-lg hover:bg-indigo-600 transition"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Navigation Items */}
      <div className="flex flex-col gap-6 flex-1 w-full px-2">
        {navItems.map((item, i) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={i}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 w-full p-2 rounded-lg transition ${
                isActive
                  ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {open && <span className="font-medium">{item.name}</span>}
            </button>
          );
        })}
      </div>

      {/* Theme Toggle */}
      <div className="mb-4 flex justify-center">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
        >
          {theme === "light" ? (
            <Moon className="text-slate-600" />
          ) : (
            <Sun className="text-yellow-400" />
          )}
        </button>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 text-red-500 hover:text-red-600 transition mb-4"
      >
        <LogOut />
        {open && <span className="font-medium">Logout</span>}
      </button>
    </motion.div>
  );
}
