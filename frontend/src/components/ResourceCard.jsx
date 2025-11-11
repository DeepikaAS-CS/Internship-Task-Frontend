import { motion } from "framer-motion";
import { Bookmark, ExternalLink } from "lucide-react";

export default function ResourceCard({ resource }) {
  return (
    <motion.a
      href={resource.link}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      className="group relative flex items-center gap-4 p-4 sm:p-5 bg-white/90 dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg hover:border-indigo-500/50 transition-all duration-300 overflow-hidden"
    >
      {/* Gradient Accent */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl"></div>

      {/* Thumbnail */}
      <motion.img
        src={resource.image}
        alt={resource.title}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shadow-sm z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Info */}
      <div className="z-10 text-left flex-1">
        <h3 className="font-semibold text-base sm:text-lg text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
          {resource.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-0.5">
          Open Resource <ExternalLink size={14} />
        </p>
      </div>

      {/* Bookmark icon */}
      <button
        onClick={(e) => e.preventDefault()}
        title="Save Resource"
        className="absolute right-3 sm:right-4 p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-slate-100/70 dark:hover:bg-slate-700/70 transition z-10"
      >
        <Bookmark size={18} />
      </button>
    </motion.a>
  );
}
