import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ResourceCard from "../components/ResourceCard";
import ResourceModal from "../components/ResourceModal";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Toaster, toast } from "sonner";

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editResource, setEditResource] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("resources");
    if (saved) {
      setResources(JSON.parse(saved));
    } else {
      const defaults = [
        {
          id: 1,
          title: "React Docs",
          link: "https://react.dev",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        },
        {
          id: 2,
          title: "FreeCodeCamp",
          link: "https://www.freecodecamp.org",
          image:
            "https://www.freecodecamp.org/news/content/images/size/w2000/2022/07/fcc_primary_large_1.png",
        },
      ];
      setResources(defaults);
      localStorage.setItem("resources", JSON.stringify(defaults));
    }
  }, []);

  // Persist changes
  useEffect(() => {
    if (resources.length >= 0) {
      localStorage.setItem("resources", JSON.stringify(resources));
    }
  }, [resources]);

  const openAddModal = () => {
    setEditResource(null);
    setShowModal(true);
  };

  const openEditModal = (resource) => {
    setEditResource(resource);
    setShowModal(true);
  };

  const handleSave = (data) => {
    if (editResource) {
      setResources((prev) =>
        prev.map((r) => (r.id === editResource.id ? { ...data, id: r.id } : r))
      );
      toast.success("Resource updated successfully!");
    } else {
      setResources((prev) => [...prev, { ...data, id: Date.now() }]);
      toast.success("Resource added successfully!");
    }
  };

  const handleDelete = (id) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    toast.success("Resource deleted!");
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Toaster position="top-center" />
      <Sidebar />

      <main className="flex-1 ml-[70px] md:ml-[220px] p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl font-semibold text-slate-800 dark:text-white">
            📚 Resources
          </h1>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-md transition"
          >
            <Plus className="w-4 h-4" /> Add Resource
          </button>
        </div>

        {/* Resource Grid */}
        <motion.div
          layout
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence>
            {resources.map((r) => (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <ResourceCard resource={r} />

                {/* Edit/Delete Buttons */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => openEditModal(r)}
                    className="p-2 bg-white/80 dark:bg-slate-800 rounded-lg hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="p-2 bg-white/80 dark:bg-slate-800 rounded-lg text-red-500 hover:text-red-600 dark:hover:text-red-400 shadow-sm"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {showModal && (
        <ResourceModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          resource={editResource}
        />
      )}
    </div>
  );
}
