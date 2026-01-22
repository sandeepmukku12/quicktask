import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserStats, getProductivityTrends } from "../api/analytics";
import { toast } from "react-toastify";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function DashboardPage() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

  useEffect(() => {
    const userId = user?.user?.id;

    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [statsRes, trendsRes] = await Promise.all([
          getUserStats(userId),
          getProductivityTrends(userId, 7),
        ]);

        setStats(statsRes.data);
        setTrends(
          trendsRes.data.map((t) => ({
            date: t._id,
            completed: t.count,
          })),
        );
      } catch (err) {
        console.error("Dashboard Fetch error:", err);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  // Loading & Error States
  if (!user)
    return (
      <p className="text-center mt-10">Please log in to view the dashboard.</p>
    );
  if (loading) return <p className="text-center mt-10">Loading analytics...</p>;
  if (!stats)
    return <p className="text-center mt-10">No data found for this user.</p>;

  const {
    totalTasks,
    completedTasks,
    pendingTasks,
    completionRate,
    priorityDistribution,
    recentTasks,
  } = stats;

  const pieData = Object.entries(priorityDistribution).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Analytics Overview
          </h1>
          <p className="text-gray-500">Welcome back, {user.user.email}</p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Tasks", value: totalTasks, color: "text-blue-600" },
            {
              label: "Completed",
              value: completedTasks,
              color: "text-green-600",
            },
            { label: "Pending", value: pendingTasks, color: "text-orange-600" },
            {
              label: "Success Rate",
              value: `${completionRate}%`,
              color: "text-purple-600",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center"
            >
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                {card.label}
              </p>
              <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Priority Breakdown (Pie) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Priority Distribution
            </h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="99%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Productivity Trend (Line) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Tasks Completed (7 Days)
            </h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="99%" height="100%">
                <LineChart data={trends}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#9ca3af" }}
                  />
                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ r: 5, fill: "#6366f1" }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Tasks Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700">
              Recent Activity
            </h2>
          </div>
          <div className="overflow-x-auto">
            <ul className="divide-y divide-gray-50">
              {recentTasks.map((task) => (
                <li
                  key={task._id}
                  className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col min-w-0 mr-4">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {task.title}
                    </span>
                    <span className="text-xs text-gray-400">
                      ID: {task._id.slice(-6)}
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded-full whitespace-nowrap">
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "No Deadline"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
