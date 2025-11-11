import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function Pomodoro() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("Focus"); // or "Break"
  const timerRef = useRef(null);

  const totalTime = mode === "Focus" ? 25 * 60 : 5 * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setMode((prev) => (prev === "Focus" ? "Break" : "Focus"));
      setTimeLeft(mode === "Focus" ? 5 * 60 : 25 * 60);
    }
    return () => clearTimeout(timerRef.current);
  }, [isRunning, timeLeft, mode]);

  const toggleTimer = () => setIsRunning((prev) => !prev);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === "Focus" ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Circular Timer */}
      <motion.div
        className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-700 shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Outer ring progress */}
        <svg className="absolute w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="10"
            fill="none"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="#22c55e"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * progress) / 100}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </svg>

        {/* Timer Text */}
        <div className="text-center text-white">
          <AnimatePresence mode="wait">
            <motion.h2
              key={mode}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-xl font-semibold tracking-wide mb-1"
            >
              {mode} Mode
            </motion.h2>
          </AnimatePresence>

          <motion.div
            key={timeLeft}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="text-4xl sm:text-5xl font-bold tabular-nums"
          >
            {minutes}:{seconds.toString().padStart(2, "0")}
          </motion.div>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={toggleTimer}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium px-5 py-2.5 rounded-xl shadow transition"
        >
          {isRunning ? <Pause size={18} /> : <Play size={18} />}
          {isRunning ? "Pause" : "Start"}
        </button>

        <button
          onClick={resetTimer}
          className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-medium px-5 py-2.5 rounded-xl shadow transition"
        >
          <RotateCcw size={18} /> Reset
        </button>
      </div>
    </div>
  );
}
