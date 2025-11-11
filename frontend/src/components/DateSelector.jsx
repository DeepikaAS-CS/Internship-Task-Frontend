import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, X } from "lucide-react";
import { format, addMonths, subMonths, setMonth, setYear } from "date-fns";

export default function DateSelector({ selectedDate, onSelect }) {
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const [view, setView] = useState("calendar"); // "calendar" | "month" | "year"

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monthName = format(currentDate, "MMMM");
  const year = format(currentDate, "yyyy");

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const startDay = (startOfMonth.getDay() + 6) % 7;
  const daysInMonth = endOfMonth.getDate();

  const days = Array.from({ length: startDay + daysInMonth }, (_, i) => {
    const day = i - startDay + 1;
    return day > 0 ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) : null;
  });

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleSelectDate = (date) => {
    onSelect(date);
    setCurrentDate(date);
  };

  const handleYearSelect = (yearVal) => {
    setCurrentDate(setYear(currentDate, yearVal));
    setView("calendar");
  };

  const handleMonthSelect = (monthVal) => {
    setCurrentDate(setMonth(currentDate, monthVal));
    setView("calendar");
  };

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const years = Array.from({ length: 12 }, (_, i) => new Date().getFullYear() - 6 + i);

  return (
    <div className="w-full max-w-md mx-auto bg-slate-50 dark:bg-slate-800 rounded-xl shadow-md p-4 sm:p-5 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>

        <div className="text-center">
          <h2
            onClick={() => setView("month")}
            className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-100 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            {monthName}
          </h2>
          <p
            onClick={() => setView("year")}
            className="text-sm sm:text-base text-slate-500 dark:text-slate-400 cursor-pointer hover:text-indigo-500 dark:hover:text-indigo-300 transition"
          >
            {year}
          </p>
        </div>

        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition"
        >
          <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>
      </div>

      {/* Calendar View */}
      <AnimatePresence mode="wait">
        {view === "calendar" && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-7 gap-2 text-center text-sm sm:text-base"
          >
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="font-medium text-slate-500 dark:text-slate-400 uppercase"
              >
                {day}
              </div>
            ))}

            {days.map((date, i) =>
              date ? (
                <button
                  key={i}
                  onClick={() => handleSelectDate(date)}
                  className={`p-2 sm:p-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200
                    ${
                      format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-slate-800 dark:text-slate-200 hover:bg-indigo-100 dark:hover:bg-indigo-700/50"
                    }`}
                >
                  {date.getDate()}
                </button>
              ) : (
                <div key={i} />
              )
            )}
          </motion.div>
        )}

        {/* Month Selector */}
        {view === "month" && (
          <motion.div
            key="month"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-3 sm:grid-cols-4 gap-3 text-center mt-2"
          >
            {months.map((m, idx) => (
              <button
                key={m}
                onClick={() => handleMonthSelect(idx)}
                className="p-3 sm:p-4 bg-white dark:bg-slate-700 hover:bg-indigo-100 dark:hover:bg-indigo-600 rounded-lg shadow text-slate-700 dark:text-slate-100 font-medium transition"
              >
                {m}
              </button>
            ))}
          </motion.div>
        )}

        {/* Year Selector */}
        {view === "year" && (
          <motion.div
            key="year"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-3 sm:grid-cols-4 gap-3 text-center mt-2"
          >
            {years.map((y) => (
              <button
                key={y}
                onClick={() => handleYearSelect(y)}
                className={`p-3 sm:p-4 rounded-lg shadow font-medium transition
                  ${
                    y === currentDate.getFullYear()
                      ? "bg-indigo-600 text-white"
                      : "bg-white dark:bg-slate-700 hover:bg-indigo-100 dark:hover:bg-indigo-600 text-slate-700 dark:text-slate-100"
                  }`}
              >
                {y}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Controls */}
      <div className="flex justify-center mt-5">
        <button
          onClick={() => setView("calendar")}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-md"
        >
          <Calendar size={18} /> Today
        </button>
        {view !== "calendar" && (
          <button
            onClick={() => setView("calendar")}
            className="ml-3 p-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg transition"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
