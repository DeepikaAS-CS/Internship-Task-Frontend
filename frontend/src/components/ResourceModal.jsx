import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ResourceModal({ onClose, onSave, resource }) {
  const [form, setForm] = useState({ title: "", link: "", image: "" });

  useEffect(() => {
    if (resource) setForm(resource);
  }, [resource]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.link.trim()) return;
    onSave(form);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-white dark:bg-slate-800 rounded-xl p-6 w-96 shadow-xl"
      >
        <h2 className="text-xl dark:text-white font-semibold mb-4 text-center">
          {resource ? "Edit Resource" : "Add New Resource"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Link"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
