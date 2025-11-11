import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import DeveloperDashboard from "./pages/DeveloperDashboard";
import ResourcesPage from "./pages/ResourcesPage";
import ChartsPage from "./pages/ChartsPage";
import PomodoroPage from "./pages/PomodoroPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";

export default function App() {
  return (
    <ThemeProvider>
      {/* ✅ BrowserRouter must wrap ALL routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DeveloperDashboard />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/charts" element={<ChartsPage />} />
          <Route path="/pomodoro" element={<PomodoroPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
