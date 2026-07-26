import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";

import { registerUser } from "../api/authApi";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const profilePicRegister = register("profilePic", {
    required: "Profile picture is required",
  });

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImagePreview = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setPreview("");
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("profilePic", data.profilePic[0]);

      const response = await registerUser(formData);

      toast.success(response.data?.message || "Registration successful!");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-bold">Create Account</h1>

        <p className="mb-8 text-center text-gray-500">
          Register to start managing your tasks.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}

          <div>
            <label className="mb-2 block font-medium">Username</label>

            <input
              type="text"
              placeholder="Enter username"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
            />

            {errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}

          <div>
            <label className="mb-2 block font-medium">Email</label>

            <input
              type="email"
              placeholder="Enter email"
              className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter a valid email address",
                },
              })}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}

          <div>
            <label className="mb-2 block font-medium">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full rounded-lg border border-gray-300 p-3 pr-12 outline-none transition focus:border-blue-500"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Profile Picture */}

          <div>
            <label className="mb-2 block font-medium">Profile Picture</label>

            <input
              type="file"
              id="profilePic"
              accept="image/*"
              className="hidden"
              {...profilePicRegister}
              onChange={(e) => {
                profilePicRegister.onChange(e);
                handleImagePreview(e);
              }}
            />

            <label
              htmlFor="profilePic"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-4 transition hover:bg-gray-100"
            >
              <FiUpload size={20} />
              Choose Profile Picture
            </label>

            {errors.profilePic && (
              <p className="mt-1 text-sm text-red-500">
                {errors.profilePic.message}
              </p>
            )}

            {preview && (
              <img
                src={preview}
                alt="Profile Preview"
                className="mt-4 h-44 w-full rounded-lg border object-cover"
              />
            )}
          </div>

          {/* Submit Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
