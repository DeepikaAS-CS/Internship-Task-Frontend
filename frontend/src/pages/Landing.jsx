import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Target, Clock, Laptop } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import dashboard from "../assets/Dashboard.png";

export default function Landing() {
  const { theme } = useTheme();

  const features = [
    {
      icon: <Target className="w-8 h-8 text-indigo-500" />,
      title: "Learning Goals",
      desc: "Set clear coding goals and track your progress with real-time visual feedback.",
    },
    {
      icon: <Laptop className="w-8 h-8 text-indigo-500" />,
      title: "Resource Manager",
      desc: "Save, organize, and access learning resources and tutorials in one place.",
    },
    {
      icon: <Clock className="w-8 h-8 text-indigo-500" />,
      title: "Pomodoro Focus Timer",
      desc: "Stay productive with a built-in timer that helps you focus and balance breaks.",
    },
    {
      icon: <BrainCircuit className="w-8 h-8 text-indigo-500" />,
      title: "Smart Analytics",
      desc: "Visualize your learning journey with charts, insights, and weekly progress stats.",
    },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col items-center text-center scroll-smooth transition-all duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-b from-slate-900 to-slate-800 text-white"
          : "bg-gradient-to-b from-indigo-50 to-white text-slate-900"
      }`}
    >
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-24 pb-16 px-6 max-w-4xl"
      >
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          Developer Dashboard for Smarter Learning
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg mb-8">
          Track goals, manage resources, stay focused, and analyze your productivity — all in one intuitive dashboard built for coders and students.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/login"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:bg-indigo-700 transition-all"
          >
            Get Started
          </Link>
          <Link
            to="/register"
            className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            Create Account <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 px-6 max-w-5xl"
      >
        <h2 className="text-3xl font-bold mb-10">Features</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-2xl shadow-lg backdrop-blur-md ${
                theme === "dark"
                  ? "bg-slate-800/60 hover:bg-slate-700/70"
                  : "bg-white hover:bg-indigo-50"
              } transition-all`}
            >
              <div className="flex justify-center mb-4">{f.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{f.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Preview Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 w-full max-w-6xl px-6"
      >
        <h2 className="text-3xl font-bold mb-6">Live Dashboard Preview</h2>
        <div
          className={`rounded-2xl overflow-hidden shadow-2xl ${
            theme === "dark" ? "bg-slate-800" : "bg-white"
          }`}
        >
          <img
            src={dashboard}
            alt="Dashboard Preview"
            className="w-full h-[400px] object-cover"
          />
        </div>
      </motion.section>

      {/* Tech Stack Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-20 px-6 w-full max-w-4xl"
      >
        <h2 className="text-3xl font-bold mb-10">Tech Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            "React",
            "TailwindCSS",
            "Node.js",
            "MongoDB",
            "Framer Motion",
            "Recharts",
            "Express",
            "Lucide Icons",
          ].map((tech, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className={`p-4 rounded-xl shadow-md ${
                theme === "dark" ? "bg-slate-800" : "bg-white"
              }`}
            >
              <p className="font-medium">{tech}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer Section */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-10 text-sm text-slate-500 dark:text-slate-400"
      >
        © {new Date().getFullYear()} Prasad’s Developer Dashboard. Built with ❤️ using React + Tailwind.
      </motion.footer>
    </div>
  );
}
