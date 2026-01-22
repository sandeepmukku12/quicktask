import { useState, useContext } from "react";
import { register } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setLoading(true);
    try {
      const response = await register({ email, password });
      loginUser({ ...response.data });
      toast.success("Account created successfully!");
      navigate("/tasks");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-10 border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Join QuickTask</h2>
          <p className="text-gray-400 mt-2 font-medium">
            Start organizing your day better
          </p>
          <a
            href="https://github.com/sandeepmukku12"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1 hover:text-indigo-500 transition-colors"
          >
            MADE WITH ❤️ BY{" "}
            <span className="text-gray-600 font-bold uppercase">
              SANDEEP MUKKU
            </span>
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1.5 text-xs font-bold text-gray-400 uppercase ml-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label className="block mb-1.5 text-xs font-bold text-gray-400 uppercase ml-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block mb-1.5 text-xs font-bold text-gray-400 uppercase ml-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 font-medium">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-800 font-bold transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
