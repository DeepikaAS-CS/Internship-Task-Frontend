import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ProgressChart from "../components/ProgressChart";
import ProgressModal from "../components/ProgressModal";
import DateSelector from "../components/DateSelector";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "sonner";
import { format, startOfWeek, isSameDay, isBefore } from "date-fns";
import { getWeeklyData } from "../utils/dateUtils";
import { loadData, saveData, subscribeToStorage } from "../utils/localStorageUtils";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function ChartsPage() {
  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chartData, setChartData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const today = new Date();

  // ✅ Sync data from storage
  const syncFromStorage = () => {
    const saved = loadData("progressEntries", [
      { date: "2025-11-03", progress: 50 },
      { date: "2025-11-05", progress: 80 },
      { date: "2025-11-06", progress: 60 },
    ]);
    setEntries(saved);
    setChartData(getWeeklyData(saved, selectedDate));
  };

  // ✅ Load initial data + auto-sync
  useEffect(() => {
    syncFromStorage();
    const unsub = subscribeToStorage(syncFromStorage);
    return unsub;
  }, [selectedDate]);

  const openAddModal = () => {
    setEditEntry({ date: selectedDate, progress: "" });
    setShowModal(true);
  };

  const openEditModal = (dayName) => {
    const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
    const selectedWeekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const selectedDayIndex = days.indexOf(dayName);
    const todayIndex = days.indexOf(format(today, "EEE"));

    if (isSameDay(selectedWeekStart, currentWeekStart) && selectedDayIndex < todayIndex) {
      toast.error("You can't modify progress for past days this week.");
      return;
    }

    const targetEntry = entries.find(
      (e) =>
        format(new Date(e.date), "EEE") === dayName &&
        startOfWeek(new Date(e.date), { weekStartsOn: 1 }).getTime() ===
          selectedWeekStart.getTime()
    );

    setEditEntry(targetEntry ? targetEntry : { date: new Date(selectedDate), progress: "" });
    setShowModal(true);
  };

  const handleSave = (data) => {
    const dateStr = format(new Date(data.date), "yyyy-MM-dd");
    const existing = entries.find((e) => e.date === dateStr);

    let updated;
    if (existing) {
      updated = entries.map((e) =>
        e.date === dateStr ? { ...e, progress: data.progress } : e
      );
      toast.success("Progress updated!");
    } else {
      updated = [...entries, { date: dateStr, progress: data.progress }];
      toast.success("Progress added!");
    }

    setEntries(updated);
    saveData("progressEntries", updated);
  };

  const handleDelete = (date) => {
    const updated = entries.filter((e) => e.date !== date);
    setEntries(updated);
    saveData("progressEntries", updated);
    toast.success("Progress deleted!");
  };

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const currentWeek = format(weekStart, "dd MMM yyyy");

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Toaster position="top-center" />
      <Sidebar />

      <main className="flex-1 ml-[70px] md:ml-[220px] p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800 dark:text-white">📊 Analytics</h1>
            <p className="text-slate-600 dark:text-slate-400">
              Week starting from {currentWeek}
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-md"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Progress
          </button>
        </div>

        {/* Calendar + Chart */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md flex-1 border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
              📅 Select Date
            </h2>
            <DateSelector selectedDate={selectedDate} onSelect={setSelectedDate} />
          </motion.div>

          <div className="flex-1">
            <ProgressChart data={chartData} />
          </div>
        </div>

        {/* Weekly Entries */}
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
          This Week’s Entries
        </h2>

        <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {chartData.map((item) => {
              const dayName = item.day;
              const dayIndex = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(dayName);
              const targetDate = new Date(startOfWeek(selectedDate, { weekStartsOn: 1 }));
              targetDate.setDate(targetDate.getDate() + dayIndex);

              const isPastDay =
                isBefore(targetDate, today.setHours(0, 0, 0, 0)) &&
                isSameDay(startOfWeek(selectedDate, { weekStartsOn: 1 }), startOfWeek(today, { weekStartsOn: 1 }));

              return (
                <motion.div
                  key={item.day}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`relative p-4 rounded-xl shadow hover:shadow-lg transition group ${
                    isPastDay
                      ? "opacity-60 pointer-events-none bg-slate-100 dark:bg-slate-700"
                      : "bg-white dark:bg-slate-800"
                  }`}
                >
                  <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">
                    {item.day}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {item.progress}% completed
                  </p>

                  {!isPastDay && (
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => openEditModal(item.day)}
                        className="p-2 bg-white/80 dark:bg-slate-700 rounded-lg hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(format(selectedDate, 'yyyy-MM-dd'))}
                        className="p-2 bg-white/80 dark:bg-slate-700 rounded-lg text-red-500 hover:text-red-600 dark:hover:text-red-400 shadow-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </main>

      {showModal && (
        <ProgressModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          progress={editEntry}
        />
      )}
    </div>
  );
}
