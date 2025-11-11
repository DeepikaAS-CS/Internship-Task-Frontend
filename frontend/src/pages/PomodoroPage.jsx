import Sidebar from "../components/Sidebar";
import Pomodoro from "../components/Pomodoro";
import { motion } from "framer-motion";

export default function PomodoroPage() {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 ml-[70px] md:ml-[220px] p-6 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-md dark:shadow-slate-800/40 p-6 sm:p-8 text-center"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-6">
            ⏱ Pomodoro Timer
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8 text-base sm:text-lg">
            Boost your focus with the Pomodoro technique – stay sharp and balanced.
          </p>

          {/* Timer Component */}
          <Pomodoro />
        </motion.div>

        {/* Footer / Info */}
        <p className="mt-8 text-sm text-slate-500 dark:text-slate-400 text-center">
          Focus smarter. Work better. Take breaks. 🚀
        </p>
      </main>
    </div>
  );
}
