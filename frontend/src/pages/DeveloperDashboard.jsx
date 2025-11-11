import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ResourceCard from "../components/ResourceCard";
import Pomodoro from "../components/Pomodoro";
import ProgressChart from "../components/ProgressChart";
import { motion } from "framer-motion";
import { Toaster } from "sonner";
import { getWeeklyData } from "../utils/dateUtils";
import { loadData, subscribeToStorage } from "../utils/localStorageUtils";

export default function DeveloperDashboard() {
  const [goals, setGoals] = useState([]);
  const [resources, setResources] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({
    goals: 0,
    resources: 0,
    sessions: 0,
    weekly: 0,
  });

  // ✅ Sync all data from storage
  const syncFromStorage = () => {
    const storedGoals = loadData("goals", [
      { id: 1, title: "Learn React Hooks", progress: 70 },
      { id: 2, title: "Revise DSA concepts", progress: 40 },
    ]);
    const storedResources = loadData("resources", [
      {
        id: 1,
        title: "React Docs",
        link: "https://react.dev",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      },
    ]);
    const storedEntries = loadData("progressEntries", []);
    setGoals(storedGoals);
    setResources(storedResources);
    setChartData(getWeeklyData(storedEntries, new Date()));
  };

  useEffect(() => {
    syncFromStorage();
    const unsub = subscribeToStorage(syncFromStorage);
    return unsub;
  }, []);

  // ✅ Update stats dynamically
  useEffect(() => {
    const weeklyAvg =
      chartData.length > 0
        ? Math.round(chartData.reduce((a, b) => a + b.progress, 0) / chartData.length)
        : 0;

    setStats({
      resources: resources.length,
      sessions: 3,
      weekly: weeklyAvg,
    });
  }, [resources, chartData]);

  return (
    <div className="flex min-h-screen dark:bg-slate-900">
      <Toaster position="top-center" />
      <Sidebar />

      <main className="flex-1 ml-[70px] md:ml-[220px] p-6">
        <Header userName="Prasad" stats={stats} />

        {/* 📚 Resources Overview */}
        <h2 className="text-xl dark:text-white font-semibold mb-3">📚 Resources</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
          {resources.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>

        {/* 📈 Progress Overview */}
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl dark:text-white font-semibold mb-4">
              📈 Weekly Progress Overview
            </h2>
            <ProgressChart data={chartData} />
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Live synced from the <strong>Analytics</strong> page.
            </p>
          </motion.div>

          <Pomodoro />
        </div>
      </main>
    </div>
  );
}
