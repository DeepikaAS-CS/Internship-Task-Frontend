import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DateSelector from "./DateSelector";

export default function ProgressModal({ onClose, onSave, progress }) {
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState("");

  // Prefill when editing
  useEffect(() => {
    if (progress) {
      setDate(progress.date ? new Date(progress.date) : new Date());
      setValue(progress.progress || "");
    } else {
      setDate(new Date());
      setValue("");
    }
  }, [progress]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value || isNaN(value) || value < 0 || value > 100) return;
    onSave({ date, progress: parseInt(value, 10) });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8 relative"
      >
        <h2 className="text-2xl font-semibold mb-5 text-center text-slate-800 dark:text-white">
          {progress?.progress ? "Edit Progress" : "Add Progress"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Date Selector */}
          <div>
            <label className="block mb-2 text-slate-700 dark:text-slate-300 font-medium">
              Select Date
            </label>
            <div className="rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
              <DateSelector selectedDate={date} onSelect={setDate} />
            </div>
          </div>

          {/* Progress Input */}
          <div>
            <label className="block mb-2 text-slate-700 dark:text-slate-300 font-medium">
              Progress Achieved (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter your progress (0 - 100)"
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 
                         bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100
                         placeholder-slate-400 dark:placeholder-slate-500
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg bg-slate-200 dark:bg-slate-700 
                         text-slate-800 dark:text-slate-100 font-medium
                         hover:bg-slate-300 dark:hover:bg-slate-600 transition shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium
                         hover:bg-indigo-700 shadow-md transition"
            >
              {progress?.progress ? "Save Changes" : "Add Progress"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
