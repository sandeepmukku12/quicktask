import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { AuthContextProvider, AuthContext } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function Navigation() {
  const { user, logoutUser } = useContext(AuthContext);

  if (!user) return null;

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-4 flex justify-between items-center sticky top-0 z-40 w-full box-border">
      <div className="flex gap-6 items-center min-w-0">
        <div className="flex flex-col leading-tight shrink-0">
          <h1 className="font-bold text-indigo-600 text-lg">QuickTask</h1>
          <a
            href="https://github.com/sandeepmukku12"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-gray-400 font-medium hover:text-indigo-500 transition-colors"
          >
            by Sandeep Mukku
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-4 border-l pl-4 border-gray-100">
          <Link
            to="/tasks"
            className="text-gray-600 hover:text-indigo-600 font-medium text-sm transition-colors"
          >
            Tasks
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-600 hover:text-indigo-600 font-medium text-sm transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>

      <button
        onClick={logoutUser}
        className="text-xs font-bold text-rose-500 bg-rose-200 px-3 py-2 rounded-xl shrink-0 transition-all hover:bg-red-600 hover:text-white"
      >
        Logout
      </button>
    </nav>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full max-w-full overflow-x-hidden">
      <Navigation />
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TasksPage />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route path="*" element={<Navigate to="/tasks" />} />
        </Routes>
      </main>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthContextProvider>
  );
}
