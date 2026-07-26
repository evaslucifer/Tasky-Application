import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/layout/AuthLayout";

function Login() {
  const navigate = useNavigate();
  const { fetchCurrentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        password: data.password,
      };

      // If the user typed an email, send email.
      // Otherwise, send username.
      if (data.identifier.includes("@")) {
        payload.email = data.identifier;
      } else {
        payload.username = data.identifier;
      }

      const response = await api.post("/user/login", payload);

      // Fetch the logged-in user from the backend
      await fetchCurrentUser();

      toast.success(response.data.message);

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back 👋">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}

        <div>
          <input
            type="text"
            placeholder="Enter your email or username"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500"
            {...register("identifier", {
              required: "Email or Username is required",
            })}
          />

          {errors.identifier && (
            <p className="mt-1 text-sm text-red-500">
              {errors.identifier.message}
            </p>
          )}
        </div>

        {/* Password */}

        <div>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500"
            {...register("password", {
              required: "Password is required",
            })}
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Button */}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          {loading ? "Logging In..." : "Login"}
        </button>

        {/* Register */}

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Login;
