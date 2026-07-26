import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiLogOut, FiCheckSquare } from "react-icons/fi";
import toast from "react-hot-toast";

import { logoutUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();

      setUser(null);

      toast.success("Logged out successfully");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 transition hover:opacity-90"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
            <FiCheckSquare size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-800">Tasky</h1>
            <p className="-mt-1 text-xs text-slate-500">Task Management</p>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-4 md:flex">
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
            👋 {user?.username || "User"}
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-lg"
          >
            <FiLogOut />
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-xl p-2 transition hover:bg-slate-100 md:hidden"
        >
          {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="space-y-4 p-5">
            <div className="rounded-xl bg-slate-100 p-4 text-center">
              <p className="text-sm text-slate-500">Logged in as</p>

              <h2 className="mt-1 text-lg font-semibold text-slate-800">
                {user?.username || "User"}
              </h2>
            </div>

            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-medium text-white transition hover:bg-red-600"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
