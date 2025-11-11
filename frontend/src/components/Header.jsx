import { motion } from "framer-motion";

export default function Header({ userName, stats }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 text-white shadow-lg mb-6 flex justify-between items-center"
    >
      <div>
        <h1 className="text-2xl font-semibold">Welcome back, {userName} 👋</h1>
        <p className="text-sm opacity-90">Keep learning and building every day!</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex gap-6 text-sm">
          <div className="text-center">
            <p className="font-semibold">{stats.resources}</p>
            <p className="opacity-75">Resources</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{stats.sessions}</p>
            <p className="opacity-75">Pomodoro Sessions</p>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
